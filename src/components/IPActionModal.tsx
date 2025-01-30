import React, { useState } from 'react';
import { IPItem } from '../types';

interface IPActionModalProps {
    isOpen: boolean;
    onClose: () => void;
    action: 'SELL_APPROVAL' | 'AUCTION' | 'FRACTIONALIZE';
    ip: IPItem;
}

const IPActionModal: React.FC<IPActionModalProps> = ({ isOpen, onClose, action, ip }) => {
    const [price, setPrice] = useState('');
    const [duration, setDuration] = useState('7');
    const [fractions, setFractions] = useState('100');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement blockchain interaction based on action type
        console.log('Submitting action:', {
            action,
            ip,
            price,
            duration,
            fractions
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-lg p-8 max-w-md w-full mx-4">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">
                        {action === 'SELL_APPROVAL' && 'Sell Approval Token'}
                        {action === 'AUCTION' && 'List for Auction'}
                        {action === 'FRACTIONALIZE' && 'Fractionalize IP'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white"
                    >
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {(action === 'SELL_APPROVAL' || action === 'AUCTION') && (
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Price (ETH)
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="w-full bg-gray-700 rounded-lg p-2"
                                required
                            />
                        </div>
                    )}

                    {action === 'AUCTION' && (
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Duration (days)
                            </label>
                            <select
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                className="w-full bg-gray-700 rounded-lg p-2"
                            >
                                <option value="3">3 days</option>
                                <option value="7">7 days</option>
                                <option value="14">14 days</option>
                                <option value="30">30 days</option>
                            </select>
                        </div>
                    )}

                    {action === 'FRACTIONALIZE' && (
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Number of Fractions
                            </label>
                            <input
                                type="number"
                                value={fractions}
                                onChange={(e) => setFractions(e.target.value)}
                                className="w-full bg-gray-700 rounded-lg p-2"
                                min="2"
                                max="1000"
                                required
                            />
                        </div>
                    )}

                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-400 hover:text-white"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg"
                        >
                            Confirm
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default IPActionModal; 