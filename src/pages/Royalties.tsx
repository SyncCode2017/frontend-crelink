import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

const Royalties: React.FC = () => {
    const [ipAddress, setIpAddress] = useState('');
    const [ipId, setIpId] = useState('');
    const [fractionTokenAddress, setFractionTokenAddress] = useState('');
    const [royaltyAmount, setRoyaltyAmount] = useState(0);
    const [recentRoyalties, setRecentRoyalties] = useState<{ ipId: string; amount: number; timestamp: Date }[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Mock recent royalties data
        const mockRoyalties = [
            { ipId: 'IP001', amount: 0.5, timestamp: new Date() },
            { ipId: 'IP002', amount: 1.0, timestamp: new Date() },
        ];
        setRecentRoyalties(mockRoyalties);
    }, []);

    const handleSendRoyalties = async () => {
        if (!ipAddress || !ipId || royaltyAmount <= 0) {
            setError('Please enter valid IP address, ID, and amount.');
            return;
        }
        // TODO: Implement the logic to send royalties to the IP owner
        console.log(`Sending ${royaltyAmount} ETH to ${ipAddress} for IP ID ${ipId}`);
        setError(null);
        // Reset fields after sending
        setIpAddress('');
        setIpId('');
        setRoyaltyAmount(0);
    };

    const handleClaimRoyalties = async () => {
        if (!fractionTokenAddress) {
            setError('Please enter a valid IP fraction token address.');
            return;
        }
        // TODO: Implement the logic to claim royalties for the fractionalized IP
        console.log(`Claiming royalties for token address ${fractionTokenAddress}`);
        setError(null);
        // Reset field after claiming
        setFractionTokenAddress('');
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
            <Navbar />
            <div className="pt-16">
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-4xl font-bold mb-8 text-center">Royalties Management</h1>

                    {/* Send Royalties Section */}
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
                        <h2 className="text-2xl font-semibold mb-4">Send Royalties</h2>
                        <input
                            type="text"
                            placeholder="IP Address"
                            value={ipAddress}
                            onChange={(e) => setIpAddress(e.target.value)}
                            className="w-full bg-gray-700 rounded-lg p-2 mb-4"
                        />
                        <input
                            type="text"
                            placeholder="IP ID"
                            value={ipId}
                            onChange={(e) => setIpId(e.target.value)}
                            className="w-full bg-gray-700 rounded-lg p-2 mb-4"
                        />
                        <input
                            type="number"
                            placeholder="Amount (ETH)"
                            value={royaltyAmount}
                            onChange={(e) => setRoyaltyAmount(Number(e.target.value))}
                            className="w-full bg-gray-700 rounded-lg p-2 mb-4"
                        />
                        <button
                            onClick={handleSendRoyalties}
                            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg w-full"
                        >
                            Send Royalties
                        </button>
                    </div>

                    {/* Claim Royalties Section */}
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
                        <h2 className="text-2xl font-semibold mb-4">Claim Royalties</h2>
                        <input
                            type="text"
                            placeholder="Fraction Token Address"
                            value={fractionTokenAddress}
                            onChange={(e) => setFractionTokenAddress(e.target.value)}
                            className="w-full bg-gray-700 rounded-lg p-2 mb-4"
                        />
                        <button
                            onClick={handleClaimRoyalties}
                            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg w-full"
                        >
                            Claim Royalties
                        </button>
                    </div>

                    {/* Error Message */}
                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                    {/* Recent Royalties Section */}
                    <h2 className="text-2xl font-semibold mb-4">Recent Royalties Paid</h2>
                    <ul className="space-y-2">
                        {recentRoyalties.map((royalty, index) => (
                            <li key={index} className="bg-gray-700 p-4 rounded-lg">
                                <p className="text-white">IP ID: {royalty.ipId}</p>
                                <p className="text-white">Amount: {royalty.amount} ETH</p>
                                <p className="text-gray-400">Timestamp: {royalty.timestamp.toLocaleString()}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Royalties; 