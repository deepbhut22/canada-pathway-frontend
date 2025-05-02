import React from 'react';
import { Dialog } from './Dialog';
import Button from './Button';
import { motion } from 'framer-motion';
import { CheckCircle, AlertTriangle, Info, X } from 'lucide-react';

// Define the types of messages we can show
export type MessageType = 'success' | 'warning' | 'info' | 'error';

// Benefits can be passed as an array of strings
interface Benefit {
    text: string;
    icon?: React.ReactNode; // Optional custom icon for each benefit
}

interface MessagePopupProps {
    isOpen: boolean;
    onClose: () => void;
    onAction?: () => void;
    title: string;
    message: string;
    type?: MessageType;
    actionText?: string;
    cancelText?: string;
    benefits?: Benefit[];
    illustration?: React.ReactNode; // Optional illustration to show on the right side
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

export function MessagePopup({
    isOpen,
    onClose,
    onAction,
    title,
    message,
    type = 'info',
    actionText = 'Continue',
    cancelText,
    benefits = [],
    illustration,
    maxWidth = 'xl'
}: MessagePopupProps) {
    // Icon based on type
    const getIcon = () => {
        switch (type) {
            case 'success':
                return <CheckCircle className="h-8 w-8 text-green-500" />;
            case 'warning':
                return <AlertTriangle className="h-8 w-8 text-yellow-500" />;
            case 'error':
                return <X className="h-8 w-8 text-red-500" />;
            case 'info':
            default:
                return <Info className="h-8 w-8 text-blue-500" />;
        }
    };

    // Color based on type
    const getColor = () => {
        switch (type) {
            case 'success':
                return 'bg-green-50 text-green-700';
            case 'warning':
                return 'bg-yellow-50 text-yellow-700';
            case 'error':
                return 'bg-red-50 text-red-700';
            case 'info':
            default:
                return 'bg-blue-50 text-blue-700';
        }
    };

    return (
        <Dialog
            isOpen={isOpen}
            onClose={onClose}
            maxWidth={maxWidth}
            className="overflow-hidden"
        >
            <div className="flex flex-col md:flex-row">
                {/* Left content */}
                <div className="flex-1 p-6">
                    {/* Header with icon */}
                    <div className="flex items-start mb-4">
                        <div className={`p-2 rounded-full ${getColor()} mr-4`}>
                            {getIcon()}
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-secondary-900">{title}</h2>
                            <p className="mt-2 text-secondary-600">{message}</p>
                        </div>
                    </div>

                    {/* Benefits section if provided */}
                    {benefits.length > 0 && (
                        <div className="mt-6">
                            <h3 className="text-sm font-medium text-secondary-700 mb-3">Benefits:</h3>
                            <div className="space-y-3">
                                {benefits.map((benefit, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 * index }}
                                        className="flex items-start"
                                    >
                                        <div className="mr-3 text-primary-500">
                                            {benefit.icon || <CheckCircle className="h-5 w-5" />}
                                        </div>
                                        <p className="text-secondary-600">{benefit.text}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Right side illustration if provided */}
                    {illustration && (
                        <div className="w-full bg-secondary-50">
                            <div className="h-full flex items-center justify-center p-6">
                                {illustration}
                            </div>
                        </div>
                    )}

                    {/* Action buttons */}
                    <div className="mt-8 flex flex-col sm:flex-row gap-3">
                        {onAction && (
                            <Button
                                onClick={onAction}
                                variant="outline"
                                className="w-full sm:w-auto border border-secondary-300 bg-secondary-950 text-white hover:bg-secondary-50 hover:text-secondary-900"
                            >
                                {actionText}
                            </Button>
                        )}
                        {cancelText && (
                            <Button
                                onClick={onClose}
                                variant="outline"
                                className="w-full sm:w-auto border border-secondary-300 bg-white text-secondary-900 hover:bg-secondary-50"
                            >
                                {cancelText}
                            </Button>
                        )}
                    </div>
                
                </div>

            </div>
        </Dialog>
    );
}

// Example of how to use this component for profile completion
export function ProfileCompletionPopup({
    isOpen,
    onClose,
    onRedirectToProfile
}: {
    isOpen: boolean;
    onClose: () => void;
    onRedirectToProfile: () => void;
}) {
    const benefits = [
        {
            text: "Personalized immigration pathways tailored to your qualifications",
            icon: <CheckCircle className="h-5 w-5" />
        },
        {
            text: "Detailed eligibility assessment for all Canadian immigration programs",
            icon: <CheckCircle className="h-5 w-5" />
        },
        {
            text: "Step-by-step guidance on document requirements and application process",
            icon: <CheckCircle className="h-5 w-5" />
        },
        {
            text: "Real-time updates when your eligibility changes for any program",
            icon: <CheckCircle className="h-5 w-5" />
        }
    ];

    // Example illustration - replace with your own SVG or image component
    const illustration = (
        <div className="text-center">
            <svg
                className="w-full max-w-[200px] mx-auto text-primary-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
            >
                <path
                    d="M12 15v3m0 0v3m0-3h3m-3 0H9m1-13a3 3 0 100 6 3 3 0 000-6z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <circle cx="12" cy="7" r="4" fill="currentColor" fillOpacity="0.2" />
            </svg>
            <p className="mt-4 text-secondary-600 font-medium">Complete your profile to unlock your personalized report</p>
        </div>
    );

    return (
        <MessagePopup
            isOpen={isOpen}
            onClose={onClose}
            onAction={onRedirectToProfile}
            title="Complete Your Profile"
            message="To generate your personalized immigration report, we need additional information about your qualifications and background."
            type="info"
            actionText="Complete My Profile"
            cancelText="Not Now"
            benefits={benefits}
            illustration={illustration}
            maxWidth="xl"
        />
    );
}