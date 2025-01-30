import React from 'react';

interface AuctionCardProps {
    auction: {
        id: string;
        title: string;
        creator: string;
        currentBid: number;
        imageUrl: string;
        endTime: Date;
    };
}

export const AuctionCard: React.FC<AuctionCardProps> = ({ auction }) => {
    const timeLeft = React.useMemo(() => {
        const diff = auction.endTime.getTime() - Date.now();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        return `${hours}h ${minutes}m`;
    }, [auction.endTime]);

    return (
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
            <img
                src={auction.imageUrl}
                alt={auction.title}
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{auction.title}</h3>
                <p className="text-gray-400">by {auction.creator}</p>
                <div className="mt-4 flex justify-between items-center">
                    <div>
                        <p className="text-sm text-gray-400">Current Bid</p>
                        <p className="text-lg font-bold">{auction.currentBid} ETH</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-400">Ends in</p>
                        <p className="text-lg font-bold">{timeLeft}</p>
                    </div>
                </div>
                <button className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                    Place Bid
                </button>
            </div>
        </div>
    );
}; 