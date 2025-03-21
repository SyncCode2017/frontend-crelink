import React, { useState, useEffect } from 'react';
import { Contract, formatEther, id, parseEther } from 'ethers';
import {blockTimestampToDate} from '../utils/dateUtils'
import Navbar from '../components/Navbar';
import AuctionIPCard from '../components/AuctionIPCard';
import ApprovalTokenCard from '../components/ApprovalTokenCard';
import ApprovalTokenDetailsModal from '../components/ApprovalTokenDetailsModal';
import ListNewIPModal from '../components/ListNewIPModal';
import FractionalizeIPModal from '../components/FractionalizeIPModal';
import RestoreFractionalizedIPModal from '../components/RestoreFractionalizedIPModal';
import ListFractionalizedIPModal from '../components/ListFractionalizedIPModal';
import { IPItem, WorkCategory, NFTLiveAuction, contractAddressesInterface } from '../types';
import { client, activeAuctionsQuery } from '../../utils/subgraph-queries'
import { gql } from '@apollo/client'
import {nftAuctionAbi, nftAuctionAddresses, intellectualPropertyAbi} from '../../constants/'
import WalletService from '../services/wallet';
import { useNavigate } from 'react-router-dom';

const CATEGORIES: WorkCategory[] = ['MUSIC', 'LYRICS', 'POEM', 'BEATS'];

const Marketplace: React.FC = () => {
    const navigate = useNavigate();
    const [auctions, setAuctions] = useState<IPItem[]>([]);
    // const [signer, setSigner] = useState(undefined);
    const [approvalTokens, setApprovalTokens] = useState<IPItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<WorkCategory | 'ALL'>('ALL');
    const [view, setView] = useState<'auctions' | 'approvalTokens'>('auctions'); // Track which view to display
    const [selectedToken, setSelectedToken] = useState<IPItem | null>(null); // Track selected approval token for modal
    const [isListNewIPModalOpen, setIsListNewIPModalOpen] = useState(false); // State for listing modal
    const [isFractionalizeIPModalOpen, setIsFractionalizeIPModalOpen] = useState(false); // State for fractionalizing modal
    const [isRestoreFractionalizedIPModalOpen, setIsRestoreFractionalizedIPModalOpen] = useState(false); // State for restoring modal
    const [isListFractionalizedIPModalOpen, setIsListFractionalizedIPModalOpen] = useState(false); // State for listing fractionalized modal

    
    useEffect(() => {
        fetchData();
    }, []);
    let mockAuctions: IPItem[] = []
    const connection = WalletService.connection;
    const addresses: contractAddressesInterface = nftAuctionAddresses;
    const chainId = connection!.chainId ? connection!.chainId.toString() : "31337"
    // console.log("nftAuctionAddresses[connection.chainId!]", addresses[chainId]["NFTAuction"][0])

    console.log("chainId", chainId);
    const nftAuctionAddress =
      chainId in addresses ? addresses[chainId]["NFTAuction"][0] : null;
    const nftAuctionContract = new Contract(nftAuctionAddress!, nftAuctionAbi, connection!.signer);

    if (!connection /**|| connection?.chainId != 84532*/) {
        console.log("Please switch your network to Base Sepolia!")
        // Redirect to home with a return path
        navigate('/?redirect=marketplace');
        return;
    }

    const fetchData = async () => {
        setIsLoading(true);

        try {
            // auctions data
            client
                .query({
                    query: gql(activeAuctionsQuery),
                })
                .then(async(listingData) => {
                    // console.log( listingData.data.activeAuctions[0].nftAddress)
                    // console.log('intellectualPropertyAbi:',intellectualPropertyAbi)
                    for (let auctionIPData of listingData.data.activeAuctions){
                        console.log("auctionIPData",auctionIPData)
                        console.log('signer:', await connection.signer?.getAddress())
                       
                        const nftIPContract = new Contract(auctionIPData.nftAddress, intellectualPropertyAbi, connection.signer);
                        let categorySymbol = (await nftIPContract.symbol()).toString()
                        categorySymbol.toLowerCase() === 'poems' ? categorySymbol = 'poem' : categorySymbol
                        const ipUri = await nftIPContract.tokenURI(auctionIPData.tokenId)
                        // const owner = await nftIPContract.ownerOf(auctionIPData.tokenId)   
                        const parentIPs = await nftIPContract.getParentIPs(auctionIPData.tokenId)
                        // const currentBidder = auctionIPData.
                        // console.log('categorySymbol:', categorySymbol.toUpperCase())
                        // TODO: include tittle in the intellectual property
                        mockAuctions.push({
                            id: auctionIPData.tokenId,
                            title: `IP for ${categorySymbol} with id ${auctionIPData.tokenId}`,
                            category: categorySymbol.toUpperCase(),
                            imageUrl: 'https://picsum.photos/400/300?random=4',
                            isFractionalized: false,
                            ownershipPercentage: 100,
                            createdAt: blockTimestampToDate(auctionIPData.blockTimestamp), //new Date('2024-02-15'),
                            uri: ipUri, //'ipfs://QmAuctionHash1',
                            owner: auctionIPData.seller,
                            ipAddress: auctionIPData.nftAddress,
                            parentIPs: parentIPs,
                            currentBid: formatEther(BigInt(auctionIPData.currentPrice)),
                            currentBidder: (auctionIPData.highestBidder).toString().toLowerCase(),
                            endTime: blockTimestampToDate(auctionIPData.endAt)
                        })

                    }
                    // const quotes = await Promise.all(calls); // returns [[], [], []]
                    // mockAuctionData = listingData.data.activeAuctions.map((x) => (
                        // const signer = connection.signer
                        
                        // {
                        //     address: availableDexes[i].address,
                        //     amountIn: quote[0],
                        //     amountOut: amountOutWEI,
                        //     tokenIn,
                        //     tokenOut,
                        //     tokenInSymbol,
                        //     tokenOutSymbol
                        // }
                    // ));
                    })
                .catch((err) => {
                    console.log('Error fetching auction data: ', err)
                })
            // Mock data for auctions
            // const mockAuctions: IPItem[] = [
            //     {
            //         id: 'IP006',
            //         title: 'Cosmic Harmony',
            //         category: 'MUSIC',
            //         imageUrl: 'https://picsum.photos/400/300?random=4',
            //         isFractionalized: true,
            //         ownershipPercentage: 50,
            //         createdAt: new Date('2024-02-15'),
            //         uri: 'ipfs://QmAuctionHash1',
            //         owner: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
            //         parentIPs: [],
            //         currentBid: 2.5,
            //         endTime: new Date(Date.now() + 86400000)
            //     },
            //     {
            //         id: 'IP007',
            //         title: 'Digital Dreams V2',
            //         category: 'BEATS',
            //         imageUrl: 'https://picsum.photos/400/300?random=5',
            //         isFractionalized: false,
            //         ownershipPercentage: 100,
            //         createdAt: new Date('2024-02-18'),
            //         uri: 'ipfs://QmAuctionHash2',
            //         owner: '0xEcE425Bc97E85A208949B9449252C40C9AA356C1',
            //         currentBid: 1.8,
            //         endTime: new Date(Date.now() + 172800000)
            //     }
            // ];
            setAuctions(mockAuctions);

            // Mock data for approval tokens
            const mockApprovalTokens: IPItem[] = [
                {
                    id: 'IP008',
                    title: 'Usage Approval',
                    category: 'MUSIC',
                    imageUrl: 'https://picsum.photos/400/300?random=6',
                    isFractionalized: false,
                    ownershipPercentage: 100,
                    createdAt: new Date('2024-02-20'),
                    uri: 'ipfs://QmApprovalTokenHash1',
                    owner: '0x123d35Cc6634C0532925a3b844Bc454e4438f789',
                    price: 0.3,
                    ipAddress: 'ipfs://QmIPAddress1',
                    expectedBuyerAddress: '0xABC1234567890DEF',
                },
                {
                    id: 'IP009',
                    title: 'Usage Approval',
                    category: 'MUSIC',
                    imageUrl: 'https://picsum.photos/400/300?random=7',
                    isFractionalized: false,
                    ownershipPercentage: 100,
                    createdAt: new Date('2024-02-22'),
                    uri: 'ipfs://QmApprovalTokenHash2',
                    owner: '0x456d35Cc6634C0532925a3b844Bc454e4438f789',
                    price: 0.5,
                    ipAddress: 'ipfs://QmIPAddress2',
                    expectedBuyerAddress: '0xDEF1234567890ABC',
                }
            ];
            setApprovalTokens(mockApprovalTokens);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const filteredAuctions = auctions.filter(auction => {
        const matchesCategory = selectedCategory === 'ALL' || auction.category === selectedCategory;
        return matchesCategory;
    });

    const filteredApprovalTokens = approvalTokens.filter(token => {
        const matchesCategory = selectedCategory === 'ALL' || token.category === selectedCategory;
        return matchesCategory;
    });
    const handleOnPlaceBid = async(id: string, amount: number) =>{
        console.log("send cancel tx on chain ...");
        const tx = await nftAuctionContract.bid(Number(id), {value: parseEther(amount.toString())});
        await tx.wait();
    }
    const handleOnCancelAuction = async(id: string) =>{
        console.log("send cancel tx on chain ...");

            const tx = await nftAuctionContract.completeAuctionAndAcceptBid(Number(id!));
            await tx.wait();
            console.log("Cancel tx successful!");

    }
    const handleOnAcceptBid = async(auction: IPItem) =>{
        console.log("send cancel tx on chain ...");
        const currentTimestamp: number = Math.floor(Date.now() / 1000);
        const currentTime: Date = blockTimestampToDate(currentTimestamp)

        if (auction.endTime! > currentTime) {
            const tx = await nftAuctionContract.endAuctionEarlyAndAcceptBid(Number(auction.id!));
            await tx.wait();
        } else {
            const tx = await nftAuctionContract.completeAuctionAndAcceptBid(Number(auction.id!));
            await tx.wait();
        }
        console.log("Cancel tx successful!");
    }
    const handleBuyApprovalToken = (token: IPItem) => {
        console.log(`Buying approval token: ${token.title} for ${token.price} ETH`);
    };

    const handleListNewIP = async(ipAddress: string, ipId: string, startingPrice: number | undefined, durationInDays: number | undefined) => {
        console.log(`Listing new IP/NFT: ${ipAddress}, ID: ${ipId}, Starting Price: ${startingPrice} ETH`);
        startingPrice ? startingPrice : startingPrice = 0
        durationInDays ? durationInDays : durationInDays = 0
        const startingPriceWei = parseEther(startingPrice.toString())
        const durationInSec = 24 * 60 * 60 * durationInDays
        try {  
            const listingFee = (await nftAuctionContract.listingFee()).toString()
            console.log("listingFee", listingFee)
            const tx = await nftAuctionContract.listNFTForAuction(startingPriceWei, ipAddress, Number(ipId), durationInSec, {value: BigInt(listingFee)});
            await tx.wait();
            console.log("New IP listed for auction!")
            // Show success feedback
        } catch (err) {
            console.log("listing error", err)
        } finally {
            setIsListNewIPModalOpen(false); // Close the modal after listing
        }
    
        
    };

    const handleFractionalizeIP = (ipAddress: string, ipId: string) => {
        console.log(`Fractionalizing IP/NFT: ${ipAddress}, ID: ${ipId}`);
        setIsFractionalizeIPModalOpen(false); // Close the modal after fractionalizing
    };

    const handleRestoreFractionalizedIP = (ipAddress: string, ipId: string) => {
        console.log(`Restoring fractionalized IP/NFT: ${ipAddress}, ID: ${ipId}`);
        setIsRestoreFractionalizedIPModalOpen(false); // Close the modal after restoring
    };

    const handleListFractionalizedIP = (ipAddress: string, ipId: string, startingPrice: number, fractionAmount: number) => {
        console.log(`Listing fractionalized IP/NFT: ${ipAddress}, ID: ${ipId}, Starting Price: ${startingPrice} ETH, Fraction Amount: ${fractionAmount}`);
        setIsListFractionalizedIPModalOpen(false); // Close the modal after listing
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
            <Navbar />
            <div className="pt-16">
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-4xl font-bold mb-8 text-center">Marketplace</h1>

                    {/* View Toggle */}
                    <div className="flex justify-center mb-8">
                        <button
                            onClick={() => setView('auctions')}
                            className={`px-4 py-2 rounded-full ${view === 'auctions' ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
                        >
                            Auctions
                        </button>
                        <button
                            onClick={() => setView('approvalTokens')}
                            className={`px-4 py-2 rounded-full ${view === 'approvalTokens' ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
                        >
                            Approval Tokens
                        </button>
                    </div>

                    {/* Auction Action Buttons */}
                    <div className="flex justify-between mb-8">
                        <button
                            onClick={() => setIsListNewIPModalOpen(true)}
                            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow-lg transition-transform transform hover:scale-105"
                        >
                            List Whole IP/NFT
                        </button>
                        <button
                            onClick={() => setIsFractionalizeIPModalOpen(true)}
                            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow-lg transition-transform transform hover:scale-105"
                        >
                            Fractionalize IP/NFT
                        </button>
                        <button
                            onClick={() => setIsRestoreFractionalizedIPModalOpen(true)}
                            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow-lg transition-transform transform hover:scale-105"
                        >
                            Restore Fractionalized IP/NFT
                        </button>
                        <button
                            onClick={() => setIsListFractionalizedIPModalOpen(true)}
                            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow-lg transition-transform transform hover:scale-105"
                        >
                            List Fractionalized IP/NFT
                        </button>
                    </div>

                    {/* Category Filter */}
                    <div className="flex flex-wrap gap-4 mb-8">
                        <button
                            onClick={() => setSelectedCategory('ALL')}
                            className={`px-4 py-2 rounded-full ${selectedCategory === 'ALL'
                                ? 'bg-purple-600 text-white'
                                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                }`}
                        >
                            All
                        </button>
                        {CATEGORIES.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-full ${selectedCategory === category
                                    ? 'bg-purple-600 text-white'
                                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                    }`}
                            >
                                {category.charAt(0) + category.slice(1).toLowerCase()}
                            </button>
                        ))}
                    </div>

                    {isLoading ? (
                        <div className="flex items-center justify-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {view === 'auctions' && filteredAuctions.map((auction) => (
                                <AuctionIPCard
                                    key={auction.id}
                                    ip={auction}
                                    onPlaceBid={handleOnPlaceBid}
                                    onAcceptBid={handleOnAcceptBid}
                                    onCancelAuction={() => handleOnCancelAuction(auction.id)}
                                />
                            ))}
                            {view === 'approvalTokens' && filteredApprovalTokens.map((token) => (
                                <ApprovalTokenCard
                                    key={token.id}
                                    token={token}
                                    onBuy={() => handleBuyApprovalToken(token)}
                                />
                            ))}
                        </div>
                    )}

                    {!isLoading && (view === 'auctions' ? filteredAuctions.length === 0 : filteredApprovalTokens.length === 0) && (
                        <div className="text-center py-12">
                            <p className="text-gray-400">
                                No items found in this category.
                            </p>
                        </div>
                    )}

                    {selectedToken && (
                        <ApprovalTokenDetailsModal
                            token={selectedToken}
                            onClose={() => setSelectedToken(null)}
                        />
                    )}

                    {/* Modals */}
                    {isListNewIPModalOpen && (
                        <ListNewIPModal
                            onClose={() => setIsListNewIPModalOpen(false)}
                            onList={handleListNewIP}
                        />
                    )}
                    {isFractionalizeIPModalOpen && (
                        <FractionalizeIPModal
                            onClose={() => setIsFractionalizeIPModalOpen(false)}
                            onFractionalize={handleFractionalizeIP}
                        />
                    )}
                    {isRestoreFractionalizedIPModalOpen && (
                        <RestoreFractionalizedIPModal
                            onClose={() => setIsRestoreFractionalizedIPModalOpen(false)}
                            onRestore={handleRestoreFractionalizedIP}
                        />
                    )}
                    {isListFractionalizedIPModalOpen && (
                        <ListFractionalizedIPModal
                            onClose={() => setIsListFractionalizedIPModalOpen(false)}
                            onList={handleListFractionalizedIP}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Marketplace; 