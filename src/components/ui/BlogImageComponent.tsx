import { useState } from 'react';
import { ImageData } from '../../types';

interface ImageComponentProps {
    imageData: ImageData;
}

export default function ImageComponent({ imageData }: ImageComponentProps) {
    const { src, alt, caption, position = 'center' } = imageData;
    const [isOpen, setIsOpen] = useState(false);

    const positionClasses = {
        'left': 'mr-auto',
        'center': 'mx-auto',
        'right': 'ml-auto'
    };

    const handleImageClick = () => {
        setIsOpen(true);
    };

    return (
        <>
            <figure className={`my-8 ${positionClasses[position]}`}>
                <img
                    src={src}
                    alt={alt}
                    className="max-w-full h-auto rounded-lg cursor-zoom-in"
                    onClick={handleImageClick}
                    loading="lazy"
                />
                {caption && (
                    <figcaption className="text-sm text-gray-500 text-center mt-2">
                        {caption}
                    </figcaption>
                )}
            </figure>

            {/* Image modal/lightbox */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-4"
                    onClick={() => setIsOpen(false)}
                >
                    <div
                        className="relative max-w-4xl max-h-[90vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute top-0 right-0 -mt-10 -mr-10 text-white text-3xl"
                            onClick={() => setIsOpen(false)}
                        >
                            &times;
                        </button>
                        <img
                            src={src}
                            alt={alt}
                            className="max-w-full max-h-[85vh] object-contain"
                        />
                        {caption && (
                            <p className="text-white text-center mt-4">{caption}</p>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}