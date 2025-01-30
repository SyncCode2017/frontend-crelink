import React from 'react';
import { IPItem } from '../types';

interface ApprovalTokenCardProps {
    token: IPItem;
    onBuy: () => void; // Prop for buying approval tokens
}

const ApprovalTokenCard: React.FC<ApprovalTokenCardProps> = ({ token, onBuy }) => {
    return (
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <img src={token.imageUrl} alt={token.title} className="w-full h-48 object-cover rounded-md mb-4" />
            <h3 className="text-lg font-semibold">{token.title}</h3>
            <p className="text-gray-400">IP Address: {token.ipAddress}</p>
            <p className="text-gray-400">IP ID: {token.id}</p>
            <p className="text-gray-400">Category: {token.category}</p>
            <p className="text-gray-400">Buyer: {token.expectedBuyerAddress}</p>
            <p className="text-white">Price: {token.price} ETH</p>
            <button
                onClick={onBuy}
                className="mt-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg w-full"
            >
                Buy
            </button>
        </div>
    );
};

export default ApprovalTokenCard; 