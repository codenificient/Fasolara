// // TODO create new account mutation test
// // TODO fetch single account by ID test
// // TODO get an account with loggedIn user (context obj)
// import chai from "chai";
// import EasyGraphQLTester from "easygraphql-tester";
// import { resolvers, typeDefs } from "../graphql/index.js";
// // const { describe, it } = require("mocha")

// chai.should();

// describe("Test Queries and Mutations on Account", () => {
//   let tester;

//   beforeEach(() => {
//     tester = new EasyGraphQLTester(typeDefs, resolvers);
//   });

//   it("schema pass if the query is valid ", () => {
//     const validQ = `
//       {
//         accounts {
//           id
//           debtAmount
//         }
//       }
//     `;
//     tester.test(true, validQ);
//   });

//   it("Returns data if the query is valid ", () => {
//     const validQ = `
//       {
//         accounts {
//           id
//           debtAmount
//         }
//       }
//     `;
//     tester.graphql(validQ, undefined, undefined, undefined).then((accounts) => {
//       console.log(accounts);
//       expect(accounts.length).to.be.eq(2);
//     });
//   });

//   it("Should fail if the query is invalid", () => {
//     const invalidQuery = `
//   {
//     accounts {
//       publicationDate
//     }
//   }
//   `;
//     tester.test(false, invalidQuery);
//   });
// });
