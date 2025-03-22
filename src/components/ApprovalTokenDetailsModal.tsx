import React from 'react';
import { IPItem } from '../types';

interface ApprovalTokenDetailsModalProps {
    token: IPItem;
    onClose: () => void;
}

const ApprovalTokenDetailsModal: React.FC<ApprovalTokenDetailsModalProps> = ({ token, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-lg p-6 w-11/12 md:w-1/3">
                <h2 className="text-2xl font-bold mb-4">{token.title}</h2>
                <p className="text-gray-400">Category: {token.category}</p>
                <p className="text-white">Owner: {token.owner}</p>
                <p className="text-white">Price: {token.price} ETH</p>
                <p className="text-gray-400">IP Address: {token.ipAddress}</p>
                <p className="text-gray-400">IP ID: {token.tokenId}</p>
                <p className="text-gray-400">Expected Buyer Address: {token.expectedBuyerAddress}</p>
                <p className="text-gray-400">Created At: {token.createdAt.toLocaleDateString()}</p>
                <button
                    onClick={onClose}
                    className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default ApprovalTokenDetailsModal; 