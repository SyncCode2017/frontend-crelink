import React from 'react';
import { IPItem } from '../types';
import { formatDate } from '../utils/dateUtils';

interface IPDetailsModalProps {
    ip: IPItem;
    isOpen: boolean;
    onClose: () => void;
}

const IPDetailsModal: React.FC<IPDetailsModalProps> = ({ ip, isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-lg w-full max-w-2xl max-h-[90vh] flex flex-col">
                {/* Header - Fixed */}
                <div className="p-6 border-b border-gray-700">
                    <div className="flex justify-between items-center">
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
                </div>

                {/* Content - Scrollable */}
                <div className="flex-1 overflow-y-auto p-6">
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IPDetailsModal; 