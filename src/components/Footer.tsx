import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer: React.FC = () => {
    const navigate = useNavigate();

    return (
        <footer className="bg-gray-900 text-gray-300 py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-2xl font-bold mb-4">
                            <span className="text-purple-500">Cre</span>
                            <span className="text-white">link</span>
                        </h3>
                        <p className="text-gray-400">
                            Empowering creators through decentralized collaboration
                        </p>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>
                                <button
                                    onClick={() => navigate('/explore')}
                                    className="hover:text-white"
                                >
                                    Explore
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => navigate('/dashboard')}
                                    className="hover:text-white"
                                >
                                    Create
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => navigate('/marketplace')}
                                    className="hover:text-white"
                                >
                                    Marketplace
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => navigate('/royalties')}
                                    className="hover:text-white"
                                >
                                    Royalties
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Resources</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-white">Help Center</a></li>
                            <li><a href="#" className="hover:text-white">Documentation</a></li>
                            <li><a href="#" className="hover:text-white">Blog</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Newsletter</h4>
                        <p className="text-sm mb-4">Stay updated with our latest features and releases.</p>
                        <div className="flex">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-gray-800 text-white px-4 py-2 rounded-l-lg flex-grow"
                            />
                            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-r-lg">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-8 pt-8 text-center">
                    <p>&copy; {new Date().getFullYear()} Crelink. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 