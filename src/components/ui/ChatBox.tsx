import React, { useState, useEffect, useRef, KeyboardEvent, ChangeEvent } from 'react';
import { X, Send, Loader2, MessageCircle } from 'lucide-react';
import api from '../../utils/axios';
import useAuthStore from '../../store/authStore';

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

    // Default fallback ID if user is not authenticated
    const userId = useAuthStore((state) => state.user?._id) || "6816970bd2c7f39134b23fbb";

    useEffect(() => {
        if (isOpen) {
            fetchChatHistory();
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

    if (!isOpen) return null;

    return (
        <div className="fixed inset-y-0 right-0 w-full sm:w-[36%] bg-white shadow-xl z-50 flex flex-col border-l border-secondary-200 animate-slide-in-right">
            <div className="p-4 border-b border-secondary-200 bg-secondary-100 flex justify-between items-center">
                <div className="flex items-center">
                    <MessageCircle className="h-5 w-5 text-secondary-900 mr-2" />
                    <h3 className="font-semibold text-secondary-900">Immigration AI Assistant</h3>
                </div>
                <button
                    onClick={onClose}
                    className="text-secondary-500 hover:text-secondary-700 focus:outline-none"
                >
                    <X className="h-5 w-5" />
                </button>
            </div>

            <div
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto p-4 space-y-4 bg-secondary-50"
            >
                {messages.length === 0 && !isLoading ? (
                    <div className="text-center text-secondary-500 py-8">
                        <MessageCircle className="h-12 w-12 mx-auto mb-3 text-secondary-300" />
                        <p>Ask me anything about Canadian immigration pathways!</p>
                    </div>
                ) : (
                    messages.map((msg, idx) => (
                        <div
                            key={idx}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`rounded-lg px-4 py-2 max-w-[80%] ${msg.role === 'user'
                                        ? 'bg-secondary-900 text-white'
                                        : 'bg-white border border-secondary-300 text-secondary-900'
                                    }`}
                            >
                                <p className="whitespace-pre-wrap text-sm">{msg.content}</p>
                                <p className={`text-sm mt-1 ${msg.role === 'user' ? 'text-primary-100' : 'text-secondary-400'
                                    }`}>
                                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </div>
                        </div>
                    ))
                )}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="rounded-lg px-4 py-2 bg-white border border-secondary-200">
                            <Loader2 className="h-5 w-5 animate-spin text-secondary-950" />
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-secondary-200 bg-white">
                <div className="flex items-center space-x-2">
                    <textarea
                        value={inputMessage}
                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your question here..."
                        className="flex-1 border border-secondary-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-secondary-950 resize-none"
                        rows={2}
                        disabled={isLoading}
                    />
                    <button
                        onClick={sendMessage}
                        disabled={isLoading || !inputMessage.trim()}
                        className={`flex p-2 rounded-full text-center items-center justify-center ${isLoading || !inputMessage.trim()
                                ? 'bg-secondary-900 text-secondary-400'
                                : 'bg-secondary-900 text-white hover:bg-secondary-950'
                            }`}
                    >
                        {isLoading ? (
                            <Loader2 className="h-5 w-5 animate-spin text-white m-auto" />
                        ) : (
                            <Send className="h-5 w-5 text-white" />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatBox;