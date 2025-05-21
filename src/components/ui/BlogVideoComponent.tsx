import { VideoData } from '../../types';

interface VideoComponentProps {
    videoData: VideoData;
}

export default function VideoComponent({ videoData }: VideoComponentProps) {
    const { url, type, caption } = videoData;

    // Function to get proper embed URL
    const getEmbedUrl = () => {
        if (type === 'youtube') {
            // Convert YouTube watch URL to embed URL if needed
            const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
            const match = url.match(youtubeRegex);
            if (match && match[1]) {
                return `https://www.youtube.com/embed/${match[1]}`;
            }
            return url; // Return original if already an embed URL
        } else if (type === 'vimeo') {
            // Convert Vimeo URL to embed URL if needed
            const vimeoRegex = /(?:vimeo\.com\/)(\d+)/;
            const match = url.match(vimeoRegex);
            if (match && match[1]) {
                return `https://player.vimeo.com/video/${match[1]}`;
            }
            return url;
        }
        // For MP4, return as is
        return url;
    };

    return (
        <div className="my-8">
            {type === 'mp4' ? (
                <video
                    controls
                    className="w-full rounded-lg aspect-video"
                    preload="metadata"
                >
                    <source src={url} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            ) : (
                <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg">
                    <iframe
                        src={getEmbedUrl()}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute top-0 left-0 w-full h-full border-0"
                        title={caption || "Embedded video"}
                    ></iframe>
                </div>
            )}

            {caption && (
                <p className="text-sm text-gray-500 text-center mt-2">{caption}</p>
            )}
        </div>
    );
}