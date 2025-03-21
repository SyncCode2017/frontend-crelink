import React, { useState } from 'react';
import { IPItem } from '../types';
import AuctionIPDetailsModal from './AuctionIPDetailsModal';

interface AuctionIPCardProps {
    ip: IPItem;
    onPlaceBid: (listingId: string, amount: number) => Promise<void>;
    onAcceptBid: (auction: IPItem) => Promise<void>;
    onCancelAuction?: (listingId: string) => Promise<void>;
}

const AuctionIPCard: React.FC<AuctionIPCardProps> = ({ ip, onPlaceBid, onAcceptBid, onCancelAuction }) => {
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
                    <div className="space-y-2">
                        <p className="text-sm text-gray-400">Current Bid: {ip.currentBid} ETH</p>
                        <p className="text-sm text-gray-400">
                            Owner: {ip.owner.slice(0, 6)}...{ip.owner.slice(-4)}
                        </p>
                        {ip.endTime && (
                            <p className="text-sm text-gray-400">
                                Ends: {new Date(ip.endTime).toLocaleString()}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <AuctionIPDetailsModal
                ip={ip}
                isOpen={showDetailsModal}
                onClose={() => setShowDetailsModal(false)}
                onPlaceBid={onPlaceBid}
                onAcceptBid={onAcceptBid}
                onCancelAuction={onCancelAuction}
            />
        </>
    );
};

export default AuctionIPCard; 