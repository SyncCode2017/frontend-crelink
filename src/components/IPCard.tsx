import React, { useState } from 'react';
import { IPItem } from '../types';
import IPActionModal from './IPActionModal';
import IPDetailsModal from './IPDetailsModal';

interface IPCardProps {
    ip: IPItem;
}

const IPCard: React.FC<IPCardProps> = ({ ip }) => {
    const [showActionModal, setShowActionModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedAction, setSelectedAction] = useState<'SELL_APPROVAL' | 'AUCTION' | 'FRACTIONALIZE' | null>(null);

    const handleAction = (action: 'SELL_APPROVAL' | 'AUCTION' | 'FRACTIONALIZE') => {
        setSelectedAction(action);
        setShowActionModal(true);
    };

    return (
        <>
            <div
                className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer"
                onClick={() => setShowDetailsModal(true)}
            >
                <img
                    src={ip.imageUrl || 'https://via.placeholder.com/300x200'}
                    alt={ip.title}
                    className="w-full h-48 object-cover"
                />
                <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{ip.title}</h3>
                    <div className="space-y-2 mb-4">
                        <p className="text-sm text-gray-400">Category: {ip.category}</p>
                        <p className="text-sm text-gray-400">
                            Ownership: {ip.ownershipPercentage}%
                            {ip.isFractionalized && ' (Fractionalized)'}
                        </p>
                        {ip.approvalTokens !== undefined && (
                            <p className="text-sm text-gray-400">
                                Available Approval Tokens: {ip.approvalTokens}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2" onClick={(e) => e.stopPropagation()}>
                        {!ip.isFractionalized && (
                            <button
                                onClick={() => handleAction('FRACTIONALIZE')}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
                            >
                                Fractionalize IP
                            </button>
                        )}
                        <button
                            onClick={() => handleAction('AUCTION')}
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg"
                        >
                            List for Auction
                        </button>
                        <button
                            onClick={() => handleAction('SELL_APPROVAL')}
                            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
                        >
                            Sell Approval Token
                        </button>
                    </div>
                </div>
            </div>

            {showActionModal && selectedAction && (
                <IPActionModal
                    isOpen={showActionModal}
                    onClose={() => setShowActionModal(false)}
                    action={selectedAction}
                    ip={ip}
                />
            )}

            <IPDetailsModal
                isOpen={showDetailsModal}
                onClose={() => setShowDetailsModal(false)}
                ip={ip}
            />
        </>
    );
};

export default IPCard; 