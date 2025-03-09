// import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import { ApolloClient, InMemoryCache } from '@apollo/client'

const APIURL = 'https://api.studio.thegraph.com/query/38552/nft-auction-crelink/version/latest'//'https://gateway.thegraph.com/api/<API_KEY>/subgraphs/id/<SUBGRAPH_ID>'

export const activeAuctionsQuery = `
query {
activeAuctions(first: 10, where: { buyer: "noBuyer"}) {
    id
    seller
    nftAddress
    tokenId
    startingPrice
    currentPrice
    endAt
    highestBidder
    buyer
    blockTimestamp
  }
}`

export const client = new ApolloClient({
    uri: APIURL,
    cache: new InMemoryCache(),
})

// client
//     .query({
//         query: gql(activeAuctionsQuery),
//     })
//     .then((data) => console.log('Subgraph data: ', data))
//     .catch((err) => {
//         console.log('Error fetching data: ', err)
//     })


// export const regRequestQuery = `query {ActiveAuction(first: 10, where: { buyer: "noBuyer"}) {
//     id
//     seller
//     nftAddress
//     tokenId
//     startingPrice
//     currentPrice
//     endAt
//     highestBidder
//     buyer
//     blockTimestamp
//   }}`

// // export const requestForRightQuery = `query {activeRequestForRights(first: 10, where: { status: 2}) {
// //   id
// //   sender
// //   citizenId
// //   status
// //   blockTimestamp
// // }}`

// // export const landRegRequestQuery = `query {activeLandRegistrationRequests(first: 10, where: {landId: "open"}) {
// //   id
// //   landId
// //   citizenId
// //   landLocation
// //   ownership_proof
// //   blockTimestamp
// // }}`

// // export const activeListingQuery = `query { activeListings(first: 10, where: {buyer_id: "open"}) {
// //   id
// //   landId
// //   buyer_id
// //   price
// //   blockTimestamp
// // }}`

// export async function getOpenRequests(
//     requestQuery: GraphQLOperation<any, any>
// ): Promise<ExecutionResult<any, ObjMap<unknown>> | null> {

//     /** The API is developed with The Graph. The subgraph created for this project
//      * has been deployed to The Graph hosted service. Here is the link to the indexer
//      * https://thegraph.com/hosted-service/subgraph/synccode2017/las-subgraph
//      */

//     try {
//         const result = await execute(requestQuery, {})
//         return result.data
//     } catch (error) {
//         console.error(error)
//     }
//     return null
// }

// export async function getOpenLandListings(
//     listingsQuery: GraphQLOperation<any, any>
// ): Promise<ExecutionResult<any, ObjMap<unknown>> | null> {
//     const openListings = getOpenRequests(listingsQuery)
//     return openListings
// }
