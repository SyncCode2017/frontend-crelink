import React, { useState } from 'react';

interface ListNewIPModalProps {
    onClose: () => void;
    onList: (ipAddress: string, ipId: string, startingPrice: number) => void;
}

const ListNewIPModal: React.FC<ListNewIPModalProps> = ({ onClose, onList }) => {
    const [ipAddress, setIpAddress] = useState('');
    const [ipId, setIpId] = useState('');
    const [startingPrice, setStartingPrice] = useState(0);

    const handleSubmit = () => {
        onList(ipAddress, ipId, startingPrice);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-lg p-6 w-11/12 md:w-1/3">
                <h2 className="text-2xl font-bold mb-4">List New IP/NFT for Auction</h2>
                <input
                    type="text"
                    placeholder="IP/NFT Address"
                    value={ipAddress}
                    onChange={(e) => setIpAddress(e.target.value)}
                    className="w-full bg-gray-700 rounded-lg p-2 mb-4"
                />
                <input
                    type="text"
                    placeholder="IP/NFT ID"
                    value={ipId}
                    onChange={(e) => setIpId(e.target.value)}
                    className="w-full bg-gray-700 rounded-lg p-2 mb-4"
                />
                <input
                    type="number"
                    placeholder="Starting Price (ETH)"
                    value={startingPrice}
                    onChange={(e) => setStartingPrice(Number(e.target.value))}
                    className="w-full bg-gray-700 rounded-lg p-2 mb-4"
                />
                <button
                    onClick={handleSubmit}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg w-full"
                >
                    List
                </button>
                <button
                    onClick={onClose}
                    className="mt-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg w-full"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default ListNewIPModal; 