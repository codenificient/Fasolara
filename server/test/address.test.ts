// // TODO fetch all addresses test
// // TODO create new address mutation test
// // TODO fetch single address by ID test
// // TODO get an address with loggedIn user (context obj)

// const chai = require("chai")
// const EasyGraphQLTester = require("easygraphql-tester")
// const { describe, it } = require("mocha")
// const resolvers = require("../graphql/resolvers")
// const typeDefs = require("../graphql/typeDefs")

// chai.should()

// describe("Test Queries and Mutations on Address", () => {
//   let tester

//   beforeEach(() => {
//     tester = new EasyGraphQLTester(typeDefs, resolvers)
//   })

//   it("schema pass if the query is valid ", () => {
//     const addressQ = `
//       {
//         addresses {
//           id
//           mobileNumber
//           address
//         }
//       }
//     `
//     tester.test(true, addressQ)
//   })

//   it("Returns data if the query is valid ", () => {
//     const addresses = `
//       {
//         addresses {
//           id
//           mobileNumber
//           address
//         }
//       }
//     `
//     tester
//       .graphql(addresses, undefined, undefined, undefined)
//       .then((addresses) => {
//         console.log(addresses)
//         expect(addresses.length).to.be.eq(1)
//       })
//   })

//   it("Should fail if the query is invalid", () => {
//     const invalidQuery = `
//   {
//     addresses {
//       publicationDate
//     }
//   }
//   `
//     tester.test(false, invalidQuery)
//   })
// })
