import React, { useState } from 'react';
import { IPItem } from '../types';
import { formatDate } from '../utils/dateUtils';
import WalletService from '../services/wallet';

interface PublicIPDetailsModalProps {
    ip: IPItem;
    isOpen: boolean;
    onClose: () => void;
}

const PublicIPDetailsModal: React.FC<PublicIPDetailsModalProps> = ({ ip, isOpen, onClose }) => {
    const [message, setMessage] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;

        setIsSending(true);
        setError(null);

        try {
            // TODO: Implement message sending functionality
            await new Promise(resolve => setTimeout(resolve, 1000)); // Mock API call
            setMessage('');
            // Show success toast or feedback
        } catch (err) {
            setError('Failed to send message. Please try again.');
        } finally {
            setIsSending(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-lg w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-white">{ip.title}</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-white"
                            aria-label="Close modal"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Content */}
                    <div className="space-y-6">
                        {/* Image */}
                        <img
                            src={ip.imageUrl}
                            alt={ip.title}
                            className="w-full h-64 object-cover rounded-lg"
                        />

                        {/* Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-purple-400">Category</h3>
                                    <p className="text-white">{ip.category}</p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-purple-400">Owner</h3>
                                    <p className="text-white font-mono">
                                        {ip.owner.slice(0, 6)}...{ip.owner.slice(-4)}
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-purple-400">Created</h3>
                                    <p className="text-white">{formatDate(ip.createdAt)}</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-purple-400">Status</h3>
                                    <p className="text-white">
                                        {ip.isFractionalized ? 'Fractionalized' : 'Whole IP'}
                                    </p>
                                </div>
                                {ip.isFractionalized && (
                                    <div>
                                        <h3 className="text-lg font-semibold text-purple-400">Ownership</h3>
                                        <p className="text-white">{ip.ownershipPercentage}%</p>
                                    </div>
                                )}
                                <div>
                                    <h3 className="text-lg font-semibold text-purple-400">IPFS URI</h3>
                                    <p className="text-white font-mono text-sm break-all">
                                        {ip.uri}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Parent IPs */}
                        {ip.parentIPs && ip.parentIPs.length > 0 && (
                            <div>
                                <h3 className="text-lg font-semibold text-purple-400 mb-2">Parent Works</h3>
                                <div className="space-y-2">
                                    {ip.parentIPs.map((parentIP) => (
                                        <div
                                            key={parentIP.tokenId}
                                            className="bg-gray-700 p-3 rounded-lg"
                                        >
                                            <p className="text-sm text-gray-300">ID: {parentIP.tokenId}</p>
                                            <p className="text-sm font-mono text-gray-300 break-all">
                                                {parentIP.address}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Message Form */}
                        <div className="border-t border-gray-700 pt-6">
                            <h3 className="text-lg font-semibold text-purple-400 mb-4">Message Owner</h3>
                            {WalletService.connection ? (
                                <form onSubmit={handleSendMessage} className="space-y-4">
                                    <div>
                                        <textarea
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            placeholder="Write your message to the owner..."
                                            className="w-full bg-gray-700 rounded-lg p-3 min-h-[100px] text-white placeholder-gray-400"
                                            maxLength={500}
                                            aria-label="Message to owner"
                                        />
                                        <p className="text-right text-gray-400 text-sm mt-1">
                                            {message.length}/500
                                        </p>
                                    </div>

                                    {error && (
                                        <p className="text-red-500 text-sm" role="alert">
                                            {error}
                                        </p>
                                    )}

                                    <div className="flex justify-end">
                                        <button
                                            type="submit"
                                            disabled={isSending || !message.trim()}
                                            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg disabled:opacity-50 transition-colors duration-200"
                                        >
                                            {isSending ? 'Sending...' : 'Send Message'}
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <div className="bg-gray-700 rounded-lg p-4 text-center">
                                    <p className="text-gray-300 mb-3">
                                        Connect your wallet to message the owner
                                    </p>
                                    <button
                                        onClick={() => WalletService.connectMetamask()}
                                        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors duration-200"
                                    >
                                        Connect Wallet
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PublicIPDetailsModal; 