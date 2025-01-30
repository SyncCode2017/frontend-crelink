import React from 'react';
import { AuctionCard } from './AuctionCard';

interface Auction {
    id: string;
    title: string;
    creator: string;
    currentBid: number;
    imageUrl: string;
    endTime: Date;
}

const LiveAuctions: React.FC = () => {
    const [auctions, setAuctions] = React.useState<Auction[]>([]);

    React.useEffect(() => {
        // TODO: Replace with actual API call
        const mockAuctions: Auction[] = [
            {
                id: '1',
                title: 'Digital Dreamscape',
                creator: 'Artist One',
                currentBid: 2.5,
                imageUrl: '/mock/artwork1.jpg',
                endTime: new Date(Date.now() + 86400000), // 24 hours from now
            },
            // Add more mock auctions as needed
        ];

        setAuctions(mockAuctions);
    }, []);

    return (
        <section className="my-12">
            <h2 className="text-3xl font-bold mb-6">Live Auctions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {auctions.map((auction) => (
                    <AuctionCard key={auction.id} auction={auction} />
                ))}
            </div>
        </section>
    );
};

export default LiveAuctions; 