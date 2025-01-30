import React from 'react';

const BackgroundImage: React.FC = () => {
    return (
        <div className="fixed top-0 left-0 w-full h-full -z-10">
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>
            <img
                src="/images/collaboration-bg.jpg"
                alt="Collaboration Background"
                className="w-full h-full object-cover"
            />
        </div>
    );
};

export default BackgroundImage; 