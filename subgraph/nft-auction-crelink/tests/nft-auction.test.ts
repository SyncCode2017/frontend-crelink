import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address } from "@graphprotocol/graph-ts"
import { AuctionCancelled } from "../generated/schema"
import { AuctionCancelled as AuctionCancelledEvent } from "../generated/NFTAuction/NFTAuction"
import { handleAuctionCancelled } from "../src/nft-auction"
import { createAuctionCancelledEvent } from "./nft-auction-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let _listingId = BigInt.fromI32(234)
    let newAuctionCancelledEvent = createAuctionCancelledEvent(_listingId)
    handleAuctionCancelled(newAuctionCancelledEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("AuctionCancelled created and stored", () => {
    assert.entityCount("AuctionCancelled", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "AuctionCancelled",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_listingId",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
