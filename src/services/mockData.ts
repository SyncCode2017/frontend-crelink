import { Auction, Work } from '../types';

export const getMockAuctions = (): Auction[] => [
    {
        id: '1',
        title: 'Digital Dreamscape',
        creator: 'Artist One',
        currentBid: 2.5,
        imageUrl: 'https://picsum.photos/400/300?random=1',
        endTime: new Date(Date.now() + 86400000),
    },
    {
        id: '2',
        title: 'Neon Nights',
        creator: 'Artist Two',
        currentBid: 1.8,
        imageUrl: 'https://picsum.photos/400/300?random=2',
        endTime: new Date(Date.now() + 172800000),
    },
    {
        id: '3',
        title: 'Cyber Symphony',
        creator: 'Artist Three',
        currentBid: 3.2,
        imageUrl: 'https://picsum.photos/400/300?random=3',
        endTime: new Date(Date.now() + 259200000),
    },
];

export const getMockWorks = (): Work[] => [
    {
        tokenId: '1',
        title: 'Abstract Harmony',
        creator: 'Creator One',
        imageUrl: 'https://picsum.photos/400/300?random=4',
        category: 'Digital Art',
        publishedAt: new Date(),
    },
    {
        tokenId: '2',
        title: 'Urban Pulse',
        creator: 'Creator Two',
        imageUrl: 'https://picsum.photos/400/300?random=5',
        category: 'Photography',
        publishedAt: new Date(),
    },
    {
        tokenId: '3',
        title: 'Cosmic Dreams',
        creator: 'Creator Three',
        imageUrl: 'https://picsum.photos/400/300?random=6',
        category: 'Animation',
        publishedAt: new Date(),
    },
    {
        tokenId: '4',
        title: 'Digital Renaissance',
        creator: 'Creator Four',
        imageUrl: 'https://picsum.photos/400/300?random=7',
        category: 'Illustration',
        publishedAt: new Date(),
    },
]; 