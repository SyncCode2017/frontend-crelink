export type WorkCategory = 'MUSIC' | 'LYRICS' | 'POEM' | 'BEATS';

export interface Auction {
    id: string;
    title: string;
    creator: string;
    currentBid: number;
    imageUrl: string;
    endTime: Date;
}

export interface Work {
    tokenId: string;
    title: string;
    creator: string;
    imageUrl: string;
    category: string;
    publishedAt: Date;
}

interface ParentIP {
    tokenId: string;
    address: string;
}

export interface IPItem {
    listingId?: string;
    title: string;
    category: WorkCategory;
    imageUrl: string;
    tokenId: string;
    isFractionalized: boolean;
    ownershipPercentage: number;
    approvalTokens?: number;
    createdAt: Date;
    uri: string;
    owner: string;
    price?: number;
    ipAddress?: string;
    parentIPs?: ParentIP[];
    currentBid?: string;
    currentBidder?: string;
    endTime?: Date;
    expectedBuyerAddress?: string;
}

export interface IPAction {
    type: 'SELL_APPROVAL' | 'AUCTION' | 'FRACTIONALIZE';
    ipId: string;
} 

export interface NFTLiveAuction {
    id: string,
    seller: string,
    nftAddress: string,
    tokenId: string,
    startingPrice: string,
    currentPrice: string,
    endAt: string,
    highestBidder: string,
    buyer: string,
    blockTimestamp: string
}

export interface contractAddressesInterface {
    [key: string]: { [key: string]: string[] };
  }