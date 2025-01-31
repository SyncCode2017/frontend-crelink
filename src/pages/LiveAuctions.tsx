// import React, { useState, useEffect } from 'react';
// import Navbar from '../components/Navbar';
// import AuctionIPCard from '../components/AuctionIPCard';
// import { IPItem } from '../types';
// import WalletService from '../services/wallet';
// import { useNavigate } from 'react-router-dom';

// const LiveAuctionsPage: React.FC = () => {
//     const [auctions, setAuctions] = useState<IPItem[]>([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const navigate = useNavigate();

//     useEffect(() => {
//         fetchAuctions();
//     }, []);

//     const fetchAuctions = async () => {
//         setIsLoading(true);
//         try {
//             const mockAuctions: IPItem[] = [
//                 {
//                     id: 'IP006',
//                     title: 'Cosmic Harmony',
//                     category: 'MUSIC',
//                     imageUrl: 'https://picsum.photos/400/300?random=4',
//                     isFractionalized: true,
//                     ownershipPercentage: 50,
//                     createdAt: new Date('2024-02-15'),
//                     uri: 'ipfs://QmAuctionHash1',
//                     owner: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
//                     parentIPs: [
//                         {
//                             id: 'IP003',
//                             address: 'ipfs://QmParent7Hash'
//                         }
//                     ],
//                     currentBid: 2.5,
//                     endTime: new Date(Date.now() + 86400000)
//                 },
//                 {
//                     id: 'IP007',
//                     title: 'Digital Dreams V2',
//                     category: 'BEATS',
//                     imageUrl: 'https://picsum.photos/400/300?random=5',
//                     isFractionalized: false,
//                     ownershipPercentage: 100,
//                     createdAt: new Date('2024-02-18'),
//                     uri: 'ipfs://QmAuctionHash2',
//                     owner: '0xEcE425Bc97E85A208949B9449252C40C9AA356C1',
//                     currentBid: 1.8,
//                     endTime: new Date(Date.now() + 172800000)
//                 }
//             ];
//             setAuctions(mockAuctions);
//         } catch (error) {
//             console.error('Error fetching auctions:', error);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const handlePlaceBid = async (ipId: string, amount: number) => {
//         if (!WalletService.connection) {
//             navigate('/?redirect=auctions');
//             return;
//         }

//         // TODO: Implement actual blockchain interaction
//         // Mock successful bid
//         setAuctions(auctions.map(auction =>
//             auction.id === ipId
//                 ? { ...auction, currentBid: amount }
//                 : auction
//         ));
//     };

//     const handleAcceptBid = async (ipId: string) => {
//         // TODO: Implement actual blockchain interaction
//         // Mock successful acceptance
//         setAuctions(auctions.filter(auction => auction.id !== ipId));
//     };

//     return (
//         <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
//             <Navbar />
//             <div className="pt-16">
//                 <div className="container mx-auto px-4 py-8">
//                     <h1 className="text-3xl font-bold mb-8">Live Auctions</h1>

//                     {isLoading ? (
//                         <div className="flex items-center justify-center h-64">
//                             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
//                         </div>
//                     ) : (
//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                             {auctions.map((auction) => (
//                                 <AuctionIPCard
//                                     key={auction.id}
//                                     ip={auction}
//                                     onPlaceBid={handlePlaceBid}
//                                     onAcceptBid={handleAcceptBid}
//                                 />
//                             ))}
//                         </div>
//                     )}

//                     {!isLoading && auctions.length === 0 && (
//                         <div className="text-center py-12">
//                             <p className="text-gray-400">
//                                 No active auctions at the moment.
//                             </p>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default LiveAuctionsPage; 