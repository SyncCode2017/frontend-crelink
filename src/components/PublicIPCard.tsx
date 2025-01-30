import React, { useState } from 'react';
import { IPItem } from '../types';
import PublicIPDetailsModal from './PublicIPDetailsModal';

interface PublicIPCardProps {
    ip: IPItem;
}

const PublicIPCard: React.FC<PublicIPCardProps> = ({ ip }) => {
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    return (
        <>
            <div
                className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform duration-200 cursor-pointer"
                onClick={() => setShowDetailsModal(true)}
            >
                <img
                    src={ip.imageUrl}
                    alt={ip.title}
                    className="w-full h-48 object-cover"
                />
                <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{ip.title}</h3>
                    <div className="space-y-2 mb-4">
                        <p className="text-sm text-gray-400">Category: {ip.category}</p>
                        <p className="text-sm text-gray-400">
                            Owner: {ip.owner.slice(0, 6)}...{ip.owner.slice(-4)}
                        </p>
                        <p className="text-sm text-gray-400">
                            Status: {ip.isFractionalized ? 'Fractionalized' : 'Whole IP'}
                        </p>
                    </div>
                </div>
            </div>

            <PublicIPDetailsModal
                isOpen={showDetailsModal}
                onClose={() => setShowDetailsModal(false)}
                ip={ip}
            />
        </>
    );
};

export default PublicIPCard; 