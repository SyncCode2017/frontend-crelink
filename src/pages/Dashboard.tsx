import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import UploadModal from '../components/UploadModal';
import IPCard from '../components/IPCard';
import { useNavigate } from 'react-router-dom';
import WalletService from '../services/wallet';
import { IPItem } from '../types';

const Dashboard: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [myIPs, setMyIPs] = useState<IPItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    let chainId: string
    const navigate = useNavigate();
    const connection = WalletService.connection;
    useEffect(() => {
        checkWalletConnection();
    }, [connection]);

    const checkWalletConnection = async () => {
        setIsLoading(true);


        if (!connection) {
            alert('Please connect your wallet to access the Dashboard.');
            navigate('/'); // Redirect to Landing page
            return;
        }
        chainId = connection!.chainId ? connection!.chainId.toString() : "31337"
        console.log("chainId", chainId);
        if (chainId !== "84532") {
            alert('Please switch the network in your wallet to Base Sepolia and refresh the page!');
            navigate('/'); // Redirect to Landing page
            return;
        }
        try {
            // Mock data with new fields
            setMyIPs([
                {
                    tokenId: 'IP001',
                    title: 'Summer Vibes',
                    category: 'MUSIC',
                    imageUrl: 'https://picsum.photos/400/300?random=1',
                    isFractionalized: false,
                    ownershipPercentage: 100,
                    approvalTokens: 5,
                    createdAt: new Date('2024-01-15'),
                    uri: 'ipfs://QmX7YQrX5Z8Z9Z9Z9Z9Z9Z9Z9Z9Z9Z9Z9Z9Z9Z',
                    owner: connection.address, // Current user's address
                    parentIPs: [
                        {
                            tokenId: 'IP000',
                            address: 'ipfs://QmParent1Hash'
                        }
                    ]
                },
                {
                    tokenId: 'IP002',
                    title: 'Digital Dreams',
                    category: 'BEATS',
                    imageUrl: 'https://picsum.photos/400/300?random=2',
                    isFractionalized: true,
                    ownershipPercentage: 25,
                    createdAt: new Date('2024-02-01'),
                    uri: 'ipfs://QmY8YQrX5Z8Z9Z9Z9Z9Z9Z9Z9Z9Z9Z9Z9Z9Z9Z',
                    owner: connection.address,
                    parentIPs: [
                        {
                            tokenId: 'IP001',
                            address: 'ipfs://QmParent2Hash'
                        },
                        {
                            tokenId: 'IP000',
                            address: 'ipfs://QmParent3Hash'
                        }
                    ]
                },
            ]);
        } catch (error) {
            console.error('Error fetching IPs:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Show loading state while checking connection
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
                <Navbar />
                <div className="pt-16 flex items-center justify-center h-screen">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                        <p>Loading your dashboard...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
            <Navbar />
            <div className="pt-16">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold">Creator Dashboard</h1>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full"
                        >
                            Upload Work
                        </button>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">My Intellectual Property</h2>
                        {myIPs.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {myIPs.map((ip) => (
                                    <IPCard key={ip.tokenId} ip={ip} />
                                ))}
                            </div>
                        ) : (
                            <div className="bg-gray-800 rounded-lg p-8 text-center">
                                <p className="text-gray-400 mb-4">You haven't uploaded any works yet.</p>
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full"
                                >
                                    Upload Your First Work
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <UploadModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
};

export default Dashboard; 