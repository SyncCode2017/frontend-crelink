import React, { Dispatch, SetStateAction, useState } from 'react';

interface ListFractionalizedIPModalProps {
    onClose: () => void;
    onList: (erc20NftAddress: string, ipId: string, startingPrice: number | undefined, erc20Amount: number | undefined, durationInDays: number | undefined) => void;
}

const ListFractionalizedIPModal: React.FC<ListFractionalizedIPModalProps> = ({ onClose, onList }) => {
    const [erc20NftAddress, setErc20NftAddress] = useState('');
    const [ipId, setIpId] = useState('');
    const [startingPrice, setStartingPrice]: [number | undefined, Dispatch<SetStateAction<number | undefined>>]= useState();
    const [erc20Amount, setErc20Amount]: [number | undefined, Dispatch<SetStateAction<number | undefined>>]= useState();
    const [durationInDays, setDurationInDays]: [number | undefined, Dispatch<SetStateAction<number | undefined>>]= useState();

    const handleSubmit = () => {
        onList(erc20NftAddress, ipId, startingPrice, erc20Amount, durationInDays);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-lg p-6 w-11/12 md:w-1/3">
                <h2 className="text-2xl font-bold mb-4">List ERC20 Fractionalized IP/NFT for Auction</h2>
                <input
                    type="text"
                    placeholder="ERC20 Address"
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
                <input
                    type="number"
                    placeholder="Starting Price (ETH)"
                    value={startingPrice}
                    onChange={(e) => setStartingPrice(Number(e.target.value))}
                    className="w-full bg-gray-700 rounded-lg p-2 mb-4"
                />
                <input
                    type="number"
                    placeholder="Amount to Sell (ETH)"
                    value={erc20Amount}
                    onChange={(e) => setErc20Amount(Number(e.target.value))}
                    className="w-full bg-gray-700 rounded-lg p-2 mb-4"
                />
                <input
                    type="number"
                    placeholder="Auction Duration (Days)"
                    value={durationInDays}
                    onChange={(e) => setDurationInDays(Number(e.target.value))}
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

export default ListFractionalizedIPModal; 