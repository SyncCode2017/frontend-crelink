import React, { useState } from 'react';
import { IPItem } from '../types';
import { blockTimestampToDate, formatDate } from '../utils/dateUtils';
import WalletService from '../services/wallet';
// import { Contract, formatEther, parseEther } from 'ethers';
// import {nftAuctionAbi, nftAuctionAddresses, intellectualPropertyAbi} from '../../constants/'

interface AuctionIPDetailsModalProps {
    ip: IPItem;
    isOpen: boolean;
    onClose: () => void;
    onPlaceBid?: (listingId: string, amount: number) => Promise<void>;
    onAcceptBid?: (auction: IPItem) => Promise<void>;
    onCancelAuction?: (listingId: string) => Promise<void>;
}

const AuctionIPDetailsModal: React.FC<AuctionIPDetailsModalProps> = ({
    ip,
    isOpen,
    onClose,
    onPlaceBid,
    onAcceptBid, 
    onCancelAuction
}) => {
    const connection = WalletService.connection;
    const [message, setMessage] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [bidAmount, setBidAmount] = useState('');
    const [bidError, setBidError] = useState<string | null>(null);
    const [isProcessingBid, setIsProcessingBid] = useState(false);
    const currentTimestamp: number = Math.floor(Date.now() / 1000);
    const currentTime: Date = blockTimestampToDate(currentTimestamp)

    const isOwner = connection?.address === ip.owner;

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

    const handlePlaceBid = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Hi-1");
        if (!bidAmount || isProcessingBid) return;

        const amount = parseFloat(bidAmount);
        if (isNaN(amount) || amount <= (Number(ip.currentBid) || 0)) {
            setBidError('Bid must be higher than current bid');
            return;
        }

        setIsProcessingBid(true);
        setBidError(null);

        try {
            await onPlaceBid!(ip.id, amount);
            setBidAmount('');
            // Show success feedback
        } catch (err) {
            setBidError('Failed to place bid. Please try again.');
        } finally {
            setIsProcessingBid(false);
        }
    };

    const handleCancelAuction = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Hi-cancel");
        // if (!bidAmount || isProcessingBid) return;

        // const amount = parseFloat(bidAmount);
        // if (isNaN(amount) || amount <= (Number(ip.currentBid) || 0)) {
        //     setBidError('Bid must be higher than current bid');
        //     return;
        // }

        setIsProcessingBid(true);
        setBidError(null);

        try {
            await onCancelAuction!(ip.id);
            // setBidAmount('');
            // Show success feedback
        } catch (err) {
            setBidError('Failed to cancel auction. Please try again.');
        } finally {
            setIsProcessingBid(false);
        }
    };

    const handleAcceptBid = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Hi-accept-bid");
        // if (!bidAmount || isProcessingBid) return;

        // const amount = parseFloat(bidAmount);
        // if (isNaN(amount) || amount <= (Number(ip.currentBid) || 0)) {
        //     setBidError('Bid must be higher than current bid');
        //     return;
        // }

        setIsProcessingBid(true);
        setBidError(null);

        try {
            await onAcceptBid!(ip);
            // setBidAmount('');
            // Show success feedback
        } catch (err) {
            setBidError('Failed to cancel auction. Please try again.');
        } finally {
            setIsProcessingBid(false);
        }
    };
    console.log("isOwner", isOwner)
    console.log("is auction still open?", ip.endTime! >= currentTime)
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

                        {/* Auction Details */}
                        <div className="bg-gray-700 p-4 rounded-lg">
                            <div className="flex justify-between items-center mb-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-purple-400">Current Bid</h3>
                                    <p className="text-2xl font-bold text-white">{ip.currentBid} ETH</p>
                                </div>
                                {ip.endTime && (
                                    <div className="text-right">
                                        <h3 className="text-lg font-semibold text-purple-400">Ends In</h3>
                                        <p className="text-xl font-bold text-white">
                                            {new Date(ip.endTime).toLocaleString()}
                                        </p>
                                    </div>
                                )}
                            </div>

                            {WalletService.connection && !isOwner && ip.endTime! >= currentTime && (
                                <form onSubmit={handlePlaceBid} className="space-y-4">
                                    <div>
                                        <input
                                            type="number"
                                            value={bidAmount}
                                            onChange={(e) => setBidAmount(e.target.value)}
                                            placeholder="Enter bid amount in ETH"
                                            step="0.000001"
                                            min={ip.currentBid ? ip.currentBid + 0.000001 : 0.000001}
                                            className="w-full bg-gray-600 rounded-lg p-3 text-white"
                                        />
                                    </div>
                                    {bidError && (
                                        <p className="text-red-500 text-sm">{bidError}</p>
                                    )}
                                    <button
                                        type="submit"
                                        disabled={isProcessingBid || !bidAmount}
                                        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg disabled:opacity-50"
                                    >
                                        {isProcessingBid ? 'Processing...' : 'Place Bid'}
                                    </button>
                                </form>
                            )}
                            {WalletService.connection && !isOwner && ip.endTime! < currentTime && (
                                <form className="space-y-4">
            
                                    <div
                                        className="w-full pl-40 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg disabled:opacity-50"
                                    >
                                        {'Auction is closed!'}
                                    </div>
                                </form>
                            )}

                            {WalletService.connection && isOwner && (
                                <div>
                                    <div>
                                        <button
                                            onClick={handleAcceptBid}
                                            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg mt-4"
                                        >
                                            Accept Current Bid
                                        </button>
                                    </div>
                                    <div>
                                        <button
                                            onClick={handleCancelAuction}
                                            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg mt-4"
                                        >
                                            Cancel Auction
                                        </button>
                                    </div>
                                </div>
                            )}
                            {/* {isOwner && ip.currentBidder === 'nobidder' && (
                                
                            )}
                            {!isOwner && ip.endTime! < currentTime && (
                                <button
                                    onClick={() => {}}
                                    className="w-full bg-grey-600 hover:bg-grey-700 text-white py-3 rounded-lg mt-4"
                                >
                                    Auction is expired!
                                </button>
                            )} */}
                        </div>

                        {/* IP Details */}
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

                        {/* Parent IPs section */}
                        {ip.parentIPs && ip.parentIPs.length > 0 && (
                            <div>
                                <h3 className="text-lg font-semibold text-purple-400 mb-2">Parent Works</h3>
                                <div className="space-y-2">
                                    {ip.parentIPs.map((parentIP) => (
                                        <div
                                            key={parentIP.id}
                                            className="bg-gray-700 p-3 rounded-lg"
                                        >
                                            <p className="text-sm text-gray-300">ID: {parentIP.id}</p>
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

export default AuctionIPDetailsModal; 