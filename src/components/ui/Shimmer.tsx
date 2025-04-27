import React from 'react';

type ShimmerProps = {
    rounded?: string;
    className?: string;
};

const Shimmer: React.FC<ShimmerProps> = ({
    rounded = 'rounded-md',
    className = '',
}) => {
    return (
        <div
            className={`bg-gray-300 animate-pulse ${rounded} ${className}`}
        />
    );
};

export default Shimmer;
