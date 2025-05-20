import React, { useState, useEffect, useRef, KeyboardEvent, ChangeEvent } from 'react';
import { X, Send, Loader2, MessageCircle, User } from 'lucide-react';
import api from '../../utils/axios';
import useAuthStore from '../../store/authStore';
import ReactMarkdown from 'react-markdown';

// Define types for our component and data
interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
}

interface ChatBoxProps {
    isOpen: boolean;
    onClose: () => void;
}

const ChatBox: React.FC<ChatBoxProps> = ({ isOpen, onClose }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputMessage, setInputMessage] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const chatContainerRef = useRef<HTMLDivElement | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    // Default fallback ID if user is not authenticated
    const userId = useAuthStore((state) => state.user?._id) || "6816970bd2c7f39134b23fbb";

    useEffect(() => {
        if (isOpen) {
            fetchChatHistory();
            // Auto-focus the textarea when chat opens
            setTimeout(() => {
                textareaRef.current?.focus();
            }, 300);
        }
    }, [isOpen]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const fetchChatHistory = async (): Promise<void> => {
        try {
            setIsLoading(true);
            const response = await api.get(`/chat/${userId}`);
            if (response.data && response.data.messages) {
                setMessages(response.data.messages);
            }
        } catch (error) {
            console.error('Error fetching chat history:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const sendMessage = async (): Promise<void> => {
        if (!inputMessage.trim()) return;

        const userMessage: ChatMessage = {
            role: 'user',
            content: inputMessage,
            timestamp: new Date().toISOString()
        };

        setMessages([...messages, userMessage]);
        setInputMessage('');
        setIsLoading(true);

        try {
            const response = await api.post(`/chat/${userId}`, {
                role: 'user',
                content: inputMessage,
            });

            if (response.data) {
                setMessages(prev => [...prev, response.data]);
            }
        } catch (error) {
            console.error('Error sending message:', error);
            // Add error message to chat
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: 'Sorry, I encountered an error. Please try again later.',
                timestamp: new Date().toISOString()
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>): void => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const scrollToBottom = (): void => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    // Handle textarea auto-resize
    const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
        setInputMessage(e.target.value);

        // Auto-resize textarea based on content
        const textarea = e.target;
        textarea.style.height = 'auto';
        textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`; // Max height 120px
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-y-0 right-0 w-full sm:w-1/3 bg-white z-50 flex flex-col border-2 border-gray-700/20 rounded-xl shadow-xl animate-slide-in-right mt-20">
            {/* Header */}
            <div className="p-4 border-b border-gray-700/10 bg-secondary-950 text-white flex justify-between items-center rounded-t-xl">
                <div className="flex items-center">
                    <MessageCircle className="h-5 w-5 text-white mr-2 opacity-80" />
                    <h3 className="font-semibold">Immigration AI Assistant</h3>
                </div>
                <button
                    onClick={onClose}
                    className="text-gray-300 hover:text-white focus:outline-none transition duration-200"
                    aria-label="Close chat"
                >
                    <X className="h-5 w-5" />
                </button>
            </div>

            {/* Chat Messages */}
            <div
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
            >
                {messages.length === 0 && !isLoading ? (
                    <div className="flex flex-col items-center justify-center h-full text-gray-500 py-8">
                        <div className="bg-gray-900/5 rounded-full p-3 mb-4">
                            <MessageCircle className="h-10 w-10 text-gray-700" />
                        </div>
                        <p className="text-gray-700 font-medium mb-1">Welcome to Immigration Assistant</p>
                        <p className="text-sm text-gray-500 text-center max-w-xs">
                            Ask me anything about Canadian immigration pathways and I'll help guide you through the process.
                        </p>
                    </div>
                ) : (
                    messages.map((msg, idx) => (
                        <div
                            key={idx}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} mb-3`}
                        >
                            {msg.role === 'assistant' && (
                                <div className="h-8 w-8 rounded-full bg-gray-800 flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                                    <MessageCircle className="h-4 w-4 text-white" />
                                </div>
                            )}

                            <div
                                className={`rounded-2xl px-4 py-3 max-w-[85%] ${msg.role === 'user'
                                        ? 'bg-gray-800 text-white shadow-xl'
                                        : 'bg-white border border-gray-200 text-gray-800 shadow-xl'
                                    } shadow-sm`}
                            >
                                <div className="prose prose-sm max-w-none">
                                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                                </div>
                                <p className={`text-xs mt-1 ${msg.role === 'user' ? 'text-gray-300' : 'text-gray-400'
                                    }`}>
                                    {new Date(msg.timestamp).toLocaleTimeString([], {
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </p>
                            </div>

                            {msg.role === 'user' && (
                                <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center ml-2 mt-1 flex-shrink-0">
                                    <User className="h-4 w-4 text-white" />
                                </div>
                            )}
                        </div>
                    ))
                )}

                {isLoading && (
                    <div className="flex justify-start items-start">
                        <div className="h-8 w-8 rounded-full bg-gray-800 flex items-center justify-center mr-2 flex-shrink-0">
                            <MessageCircle className="h-4 w-4 text-white" />
                        </div>
                        <div className="bg-white rounded-2xl p-3 border border-gray-200 shadow-sm">
                            <div className="flex space-x-2">
                                <div className="w-2 h-2 rounded-full bg-gray-800 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                <div className="w-2 h-2 rounded-full bg-gray-800 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                <div className="w-2 h-2 rounded-full bg-gray-800 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-gray-700/10 bg-white">
                <div className="relative flex items-end space-x-2">
                    <textarea
                        ref={textareaRef}
                        value={inputMessage}
                        onChange={handleTextareaChange}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your question here..."
                        className="flex-1 border border-gray-300 bg-gray-50 rounded-xl p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent resize-none min-h-[52px] max-h-[120px] transition-all duration-200 text-gray-800"
                        style={{ lineHeight: '1.5' }}
                        rows={1}
                        disabled={isLoading}
                    />
                    <button
                        onClick={sendMessage}
                        disabled={isLoading || !inputMessage.trim()}
                        className={`flex-shrink-0 p-3 rounded-full flex items-center justify-center transition-all duration-200 ${isLoading || !inputMessage.trim()
                                ? 'bg-gray-600 cursor-not-allowed'
                                : 'bg-gray-900 hover:bg-gray-950 active:bg-gray-800'
                            }`}
                    >
                        {isLoading ? (
                            <Loader2 className="h-5 w-5 animate-spin text-white" />
                        ) : (
                            <Send className="h-5 w-5 text-white" />
                        )}
                    </button>
                </div>
                <p className="text-xs text-gray-400 mt-2 text-center">
                    Press Enter to send, Shift+Enter for new line
                </p>
            </div>
        </div>
    );
};

export default ChatBox;