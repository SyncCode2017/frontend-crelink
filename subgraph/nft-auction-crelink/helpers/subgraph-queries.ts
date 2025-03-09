// import { execute } from '../.graphclient'
// import { GraphQLOperation } from "@graphql-mesh/types"
// import { ExecutionResult } from "graphql"
// import { ObjMap } from "graphql/jsutils/ObjMap"


// export const regRequestQuery = `query {activeRequestForRegistrations(first: 10, where: { status: 2}) {
//     id
//     sender
//     blockTimestamp
// 		status
//   }}`

// export const requestForRightQuery = `query {activeRequestForRights(first: 10, where: { status: 2}) {
//   id
//   sender
//   citizenId
//   status
//   blockTimestamp
// }}`

// export const landRegRequestQuery = `query {activeLandRegistrationRequests(first: 10, where: {landId: "open"}) {
//   id
//   landId
//   citizenId
//   landLocation
//   ownership_proof
//   blockTimestamp
// }}`

// export const activeListingQuery = `query { activeListings(first: 10, where: {buyer_id: "open"}) {
//   id
//   landId
//   buyer_id
//   price
//   blockTimestamp
// }}`

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
