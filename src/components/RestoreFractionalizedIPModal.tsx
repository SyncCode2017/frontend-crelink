import React, { useState } from 'react';

interface RestoreFractionalizedIPModalProps {
    onClose: () => void;
    onRestore: (erc20NftAddress: string, ipId: string) => void;
}

const RestoreFractionalizedIPModal: React.FC<RestoreFractionalizedIPModalProps> = ({ onClose, onRestore }) => {
    const [erc20NftAddress, setErc20NftAddress] = useState('');
    const [ipId, setIpId] = useState('');

    const handleSubmit = () => {
        onRestore(erc20NftAddress, ipId);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-lg p-6 w-11/12 md:w-1/3">
                <h2 className="text-2xl font-bold mb-4">Restore Fractionalized IP/NFT</h2>
                <input
                    type="text"
                    placeholder=" ERC20 NFT Fraction Address"
                    value={erc20NftAddress}
                    onChange={(e) => setErc20NftAddress(e.target.value)}
                    className="w-full bg-gray-700 rounded-lg p-2 mb-4"
                />
                <input
                    type="text"
                    placeholder="IP/NFT ID"
                    value={ipId}
                    onChange={(e) => setIpId(e.target.value)}
                    className="w-full bg-gray-700 rounded-lg p-2 mb-4"
                />
                <button
                    onClick={handleSubmit}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg w-full"
                >
                    Restore
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

export default RestoreFractionalizedIPModal; 