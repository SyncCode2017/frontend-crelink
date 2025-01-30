import React, { useState, useEffect } from 'react';
import WalletService, { WalletType } from '../services/wallet';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
    const [isConnected, setIsConnected] = useState(false);
    const [walletAddress, setWalletAddress] = useState('');
    const [showWalletOptions, setShowWalletOptions] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Check if already connected
        const connection = WalletService.connection;
        if (connection) {
            setIsConnected(true);
            setWalletAddress(connection.address);
        }
    }, []);

    const handleConnect = async (walletType: WalletType) => {
        try {
            setError(null);
            const connection = walletType === 'metamask'
                ? await WalletService.connectMetamask()
                : await WalletService.connectPhantom();

            setIsConnected(true);
            setWalletAddress(connection.address);
            setShowWalletOptions(false);

            // Check if there's a redirect parameter in the URL
            const params = new URLSearchParams(location.search);
            const redirect = params.get('redirect');
            if (redirect) {
                navigate(`/${redirect}`);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to connect wallet');
        }
    };

    const handleDisconnect = async () => {
        try {
            await WalletService.disconnect();
            setIsConnected(false);
            setWalletAddress('');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to disconnect wallet');
        }
    };

    const handleCreateClick = () => {
        if (!isConnected) {
            setShowWalletOptions(true);
            navigate('/?redirect=dashboard');
            return;
        }
        navigate('/dashboard');
    };

    const formatAddress = (address: string): string => {
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };

    return (
        <nav className="bg-gray-900 fixed w-full z-50">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <a href="/" className="text-2xl font-bold text-white">
                            <span className="text-purple-500">Cre</span>
                            <span className="text-white">link</span>
                        </a>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        <button
                            onClick={() => navigate('/explore')}
                            className={`text-gray-300 hover:text-white ${location.pathname === '/explore' ? 'text-white' : ''
                                }`}
                        >
                            Explore
                        </button>
                        <button
                            onClick={handleCreateClick}
                            className={`text-gray-300 hover:text-white ${location.pathname === '/dashboard' ? 'text-white' : ''}`}
                        >
                            Create
                        </button>
                        <button
                            onClick={() => navigate('/marketplace')}
                            className={`text-gray-300 hover:text-white ${location.pathname === '/marketplace' ? 'text-white' : ''}`}
                        >
                            Marketplace
                        </button>
                        <button
                            onClick={() => navigate('/royalties')}
                            className={`text-gray-300 hover:text-white ${location.pathname === '/royalties' ? 'text-white' : ''}`}
                        >
                            Royalties
                        </button>

                        <div className="relative">
                            {!isConnected ? (
                                <button
                                    onClick={() => setShowWalletOptions(!showWalletOptions)}
                                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full"
                                >
                                    Connect Wallet
                                </button>
                            ) : (
                                <button
                                    onClick={handleDisconnect}
                                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full"
                                >
                                    {formatAddress(walletAddress)}
                                </button>
                            )}

                            {showWalletOptions && !isConnected && (
                                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                    <div className="py-1" role="menu">
                                        <button
                                            onClick={() => handleConnect('metamask')}
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            MetaMask
                                        </button>
                                        <button
                                            onClick={() => handleConnect('phantom')}
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Phantom
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <button className="md:hidden text-gray-300 hover:text-white">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>

            {error && (
                <div className="bg-red-500 text-white text-center py-2">
                    {error}
                </div>
            )}
        </nav>
    );
};

export default Navbar; 