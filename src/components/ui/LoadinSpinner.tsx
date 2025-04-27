interface LoadingSpinnerProps {
    size?: 'small' | 'medium' | 'large';
    message?: string;
    fullScreen?: boolean;
}

export default function LoadingSpinner({
    size = 'medium',
    message = 'Loading...',
    fullScreen = false
}: LoadingSpinnerProps) {
    // Determine spinner size
    const spinnerSizes = {
        small: 'w-6 h-6',
        medium: 'w-10 h-10',
        large: 'w-16 h-16'
    };

    const spinnerSize = spinnerSizes[size];

    // Create container classes based on whether it's fullscreen or not
    const containerClasses = fullScreen
        ? 'fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50'
        : 'flex flex-col items-center justify-center p-6';

    return (
        <div className={containerClasses}>
            <div className="flex flex-col items-center">
                <div className={`${spinnerSize} text-primary-600`}>
                    <svg
                        className="animate-spin -ml-1 mr-3 w-full h-full"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                    </svg>
                </div>
                {message && (
                    <p className="mt-3 text-secondary-700 font-medium">{message}</p>
                )}
            </div>
        </div>
    );
}