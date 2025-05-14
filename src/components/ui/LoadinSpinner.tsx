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
    const gifSizes = {
        small: 'w-14 h-12',
        medium: 'w-24 h-20',
        large: 'w-32 h-28',
    };

    const gifSize = gifSizes[size];

    const containerClasses = fullScreen
        ? 'fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50'
        : 'flex flex-col items-center justify-center p-6';

    return (
        <div className={containerClasses}>
            <div className="flex flex-col items-center">
                <img
                    src="/loading.gif"
                    alt="Loading..."
                    className={gifSize}
                />
                {message && (
                    <p className="text-secondary-700 font-medium">{message}</p>
                )}
            </div>
        </div>
    );
}
