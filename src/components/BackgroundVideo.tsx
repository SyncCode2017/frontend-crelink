import React from 'react';

const BackgroundVideo: React.FC = () => {
    // You can switch between different background options
    const videoSource = {
        main: "https://player.vimeo.com/progressive_redirect/playback/748627789/rendition/1080p/file.mp4?loc=external", // Global creators collaborating
        fallback: "https://player.vimeo.com/progressive_redirect/playback/688518471/rendition/1080p/file.mp4?loc=external" // Creative showcase
    };

    // High-quality image showing global creative collaboration
    const posterImage = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1920&h=1080";

    return (
        <div className="fixed top-0 left-0 w-full h-full -z-10">
            {/* Enhanced gradient overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/80"></div>
            <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
                poster={posterImage}
            >
                <source
                    src={videoSource.main}
                    type="video/mp4"
                />
                <source
                    src={videoSource.fallback}
                    type="video/mp4"
                />
                {/* Fallback image */}
                <img
                    src={posterImage}
                    alt="Global Creative Collaboration"
                    className="w-full h-full object-cover"
                />
            </video>
        </div>
    );
};

export default BackgroundVideo; 