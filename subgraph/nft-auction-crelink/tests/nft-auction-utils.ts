import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  AuctionCancelled,
  AuctionCompleted,
  AuctionCreated,
  BidCreated,
  FundsSent
} from "../generated/NFTAuction/NFTAuction"

export function createAuctionCancelledEvent(
  _listingId: BigInt
): AuctionCancelled {
  let auctionCancelledEvent = changetype<AuctionCancelled>(newMockEvent())

  auctionCancelledEvent.parameters = new Array()

  auctionCancelledEvent.parameters.push(
    new ethereum.EventParam(
      "_listingId",
      ethereum.Value.fromUnsignedBigInt(_listingId)
    )
  )

  return auctionCancelledEvent
}

export function createAuctionCompletedEvent(
  listingId: BigInt,
  seller: Address,
  nftAddress: Address,
  tokenId: BigInt,
  bidder: Address,
  bidPrice: BigInt
): AuctionCompleted {
  let auctionCompletedEvent = changetype<AuctionCompleted>(newMockEvent())

  auctionCompletedEvent.parameters = new Array()

  auctionCompletedEvent.parameters.push(
    new ethereum.EventParam(
      "listingId",
      ethereum.Value.fromUnsignedBigInt(listingId)
    )
  )
  auctionCompletedEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )
  auctionCompletedEvent.parameters.push(
    new ethereum.EventParam(
      "nftAddress",
      ethereum.Value.fromAddress(nftAddress)
    )
  )
  auctionCompletedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  auctionCompletedEvent.parameters.push(
    new ethereum.EventParam("bidder", ethereum.Value.fromAddress(bidder))
  )
  auctionCompletedEvent.parameters.push(
    new ethereum.EventParam(
      "bidPrice",
      ethereum.Value.fromUnsignedBigInt(bidPrice)
    )
  )

  return auctionCompletedEvent
}

export function createAuctionCreatedEvent(
  listingId: BigInt,
  seller: Address,
  startPrice: BigInt,
  tokenId: BigInt,
  endAt: BigInt
): AuctionCreated {
  let auctionCreatedEvent = changetype<AuctionCreated>(newMockEvent())

  auctionCreatedEvent.parameters = new Array()

  auctionCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "listingId",
      ethereum.Value.fromUnsignedBigInt(listingId)
    )
  )
  auctionCreatedEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )
  auctionCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "startPrice",
      ethereum.Value.fromUnsignedBigInt(startPrice)
    )
  )
  auctionCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  auctionCreatedEvent.parameters.push(
    new ethereum.EventParam("endAt", ethereum.Value.fromUnsignedBigInt(endAt))
  )

  return auctionCreatedEvent
}

export function createBidCreatedEvent(
  listingId: BigInt,
  bidder: Address,
  bid: BigInt
): BidCreated {
  let bidCreatedEvent = changetype<BidCreated>(newMockEvent())

  bidCreatedEvent.parameters = new Array()

  bidCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "listingId",
      ethereum.Value.fromUnsignedBigInt(listingId)
    )
  )
  bidCreatedEvent.parameters.push(
    new ethereum.EventParam("bidder", ethereum.Value.fromAddress(bidder))
  )
  bidCreatedEvent.parameters.push(
    new ethereum.EventParam("bid", ethereum.Value.fromUnsignedBigInt(bid))
  )

  return bidCreatedEvent
}

export function createFundsSentEvent(_to: Address, _amount: BigInt): FundsSent {
  let fundsSentEvent = changetype<FundsSent>(newMockEvent())

  fundsSentEvent.parameters = new Array()

  fundsSentEvent.parameters.push(
    new ethereum.EventParam("_to", ethereum.Value.fromAddress(_to))
  )
  fundsSentEvent.parameters.push(
    new ethereum.EventParam(
      "_amount",
      ethereum.Value.fromUnsignedBigInt(_amount)
    )
  )

  return fundsSentEvent
}
