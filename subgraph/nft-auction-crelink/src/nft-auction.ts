import {
  AuctionCancelled as AuctionCancelledEvent,
  AuctionCompleted as AuctionCompletedEvent,
  AuctionCreated as AuctionCreatedEvent,
  BidCreated as BidCreatedEvent
} from "../generated/NFTAuction/NFTAuction"
import {
  AuctionCancelled,
  AuctionCompleted,
  AuctionCreated,
  ActiveAuction, BidCreated
} from "../generated/schema"

export function handleAuctionCreated(event: AuctionCreatedEvent): void {
  let entity: AuctionCreated | null = AuctionCreated.load(event.params.listingId.toString())
  let activeAuction: ActiveAuction | null = ActiveAuction.load(event.params.listingId.toString())
  if (!entity) {
    entity = new AuctionCreated(event.params.listingId.toString())
  }
  if (!activeAuction) {
    activeAuction = new ActiveAuction(event.params.listingId.toString())
  }

  entity.startingPrice = event.params.startPrice
  activeAuction.startingPrice = event.params.startPrice

  entity.tokenId = event.params.tokenId
  activeAuction.tokenId = event.params.tokenId

  entity.id = event.params.listingId.toString()
  activeAuction.id = event.params.listingId.toString()

  entity.seller = (event.params.seller).toHexString()
  activeAuction.seller = event.params.seller.toHexString()

  entity.nftAddress = (event.params.nftAddress).toHexString()
  activeAuction.nftAddress = event.params.nftAddress.toHexString()

  entity.endAt = event.params.endAt
  activeAuction.endAt = event.params.endAt

  activeAuction.currentPrice = event.params.startPrice

  activeAuction.highestBidder = "noBidder"

  activeAuction.buyer = "noBuyer"

  entity.blockTimestamp = event.block.timestamp
  activeAuction.blockTimestamp = event.block.timestamp

  entity.save()
  activeAuction.save()

}



export function handleAuctionCancelled(event: AuctionCancelledEvent): void {
  let entity: AuctionCancelled | null = new AuctionCancelled(
    event.params._listingId.toString()
  )
  let activeAuction: ActiveAuction | null = ActiveAuction.load(event.params._listingId.toString())
  if (!activeAuction) {
    activeAuction = new ActiveAuction(event.params._listingId.toString())
  }
  entity!.id = event.params._listingId.toString()

  activeAuction.buyer = "cancelled"

  entity!.blockTimestamp = event.block.timestamp

  entity!.save()
  activeAuction.save()
}

export function handleAuctionCompleted(event: AuctionCompletedEvent): void {
  let entity: AuctionCompleted | null = AuctionCompleted.load(event.params.listingId.toString())
  let activeAuction: ActiveAuction | null = ActiveAuction.load(event.params.listingId.toString())
  if (!entity) {
    entity = new AuctionCompleted(
      event.params.listingId.toString()
    )
  }
  entity.id = event.params.listingId.toString()
  activeAuction!.id = (event.params.listingId).toString()

  entity.seller = (event.params.seller).toHexString()

  entity.nftAddress = (event.params.nftAddress).toHexString()

  entity.tokenId = event.params.tokenId

  activeAuction!.currentPrice = event.params.bidPrice
  entity.currentPrice = event.params.bidPrice

  entity.bidder = event.params.bidder.toString()
  activeAuction!.highestBidder = event.params.bidder.toString()

  activeAuction!.buyer = event.params.bidder.toString()

  entity.blockTimestamp = event.block.timestamp
  activeAuction!.blockTimestamp = event.block.timestamp

  entity.save()
  activeAuction!.save()
}



export function handleBidCreated(event: BidCreatedEvent): void {
  let entity: BidCreated | null = BidCreated.load(event.params.listingId.toString())
  let activeAuction: ActiveAuction | null = ActiveAuction.load(event.params.listingId.toString())
  if (!activeAuction) {
    activeAuction = new ActiveAuction(event.params.listingId.toString())
  }
  if (!entity) {
    entity = new BidCreated(
      event.params.listingId.toString()
    )
  }
  entity.id = event.params.listingId.toString()

  entity.currentPrice = event.params.bid
  activeAuction.currentPrice = event.params.bid

  activeAuction.highestBidder = event.params.bidder.toHexString()
  entity.bidder = event.params.bidder.toHexString()

  entity.blockTimestamp = event.block.timestamp
  activeAuction.blockTimestamp = event.block.timestamp

  entity.save()
  activeAuction.save()
}
