import React from 'react';
import { useNavigate } from 'react-router-dom';

const Hero: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="container mx-auto px-4">
            <div className="text-center py-20">
                <h1 className="text-5xl md:text-6xl font-bold mb-6">
                    Welcome to{' '}
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                        Crelink
                    </span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
                    Collaborate, Create, Show-case and be Duly Rewarded in the AI-powered Web3 Creative Space
                </p>
                <div className="space-x-4">
                    <button
                        onClick={() => navigate('/explore')}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full text-lg font-semibold"
                    >
                        Start Exploring
                    </button>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="bg-transparent hover:bg-white/10 text-white px-8 py-3 rounded-full text-lg font-semibold border-2 border-white"
                    >
                        Create Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Hero; 