import {
  AuctionCancelled as AuctionCancelledEvent,
  AuctionCompleted as AuctionCompletedEvent,
  AuctionCreated as AuctionCreatedEvent,
  BidCreated as BidCreatedEvent,
  FundsSent as FundsSentEvent
} from "../generated/NFTAuction/NFTAuction"
import {
  AuctionCancelled,
  AuctionCompleted,
  AuctionCreated,
  BidCreated,
  FundsSent
} from "../generated/schema"

export function handleAuctionCancelled(event: AuctionCancelledEvent): void {
  let entity = new AuctionCancelled(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._listingId = event.params._listingId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleAuctionCompleted(event: AuctionCompletedEvent): void {
  let entity = new AuctionCompleted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.listingId = event.params.listingId
  entity.seller = event.params.seller
  entity.nftAddress = event.params.nftAddress
  entity.tokenId = event.params.tokenId
  entity.bidder = event.params.bidder
  entity.bidPrice = event.params.bidPrice

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleAuctionCreated(event: AuctionCreatedEvent): void {
  let entity = new AuctionCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.listingId = event.params.listingId
  entity.seller = event.params.seller
  entity.startPrice = event.params.startPrice
  entity.tokenId = event.params.tokenId
  entity.endAt = event.params.endAt

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleBidCreated(event: BidCreatedEvent): void {
  let entity = new BidCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.listingId = event.params.listingId
  entity.bidder = event.params.bidder
  entity.bid = event.params.bid

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleFundsSent(event: FundsSentEvent): void {
  let entity = new FundsSent(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._to = event.params._to
  entity._amount = event.params._amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
