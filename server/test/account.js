// const chai = require("chai")
// const chaiGraphQL = require("chai-graphql")

// chai.use(chaiGraphQL)

// const { assert } = chai
// const baseUrl = "http://localhost:3000"
// const request = require("supertest")(baseUrl)
// const expect = chai.expect

// describe("Testing GraphQL Server", () => {
//   it("Should fetch all accounts from database", (done) => {
//     request
//       .post("/")
//       .send({
//         query: "{  accounts {  id  debtAmount  }}",
//       })
//       .set("Accept", "application/json")
//       .expect(200)
//       .end((err, res) => {
//         if (err) return done(err)
//         expect(res.body && typeof res.body === 'object').toBe(true)
//         // expect(res.body.data)
//       })
//   })
// })

// const supertest = require("supertest")
// const app = require("../../index")

// app.server = app.listen(3000)

// describe("Server can Start Normally", () => {
//   afterEach(() => app.server.close())

//   it("Should listen to HTTP requests", (done) => {
//     const userId = "636a433969c78a4ab9af94d7"
//     request(app)
//       .post("/")
//       .send({
//         query: `{  accounts {  id  debtAmount  }}`,
//       })
//       .set("Accept", "application/json")
//       .expect(200)
//       .end((err, res) => {
//         if (err) return done(err)
//         expect(res.body && typeof res.body === "object").toBe(true)
//         expect(res.body).toHaveProperty("data")
//         expect(res.body.data).toHaveProperty("accounts")
//         expect(res.body.data.accounts).toHaveProperty("id")

//         expect(res.body.data.accounts).toHaveProperty("debtAmount")

//         return done()
//       })
//   })
// })
const chai = require("chai")
const EasyGraphQLTester = require("easygraphql-tester")
const { describe, it } = require("mocha")
const resolvers = require("../graphql/resolvers")
const typeDefs = require("../graphql/typeDefs")

chai.should()

describe("Test Queries and Mutations on Account", () => {
  let tester

  before(() => {
    tester = new EasyGraphQLTester(typeDefs, resolvers)
  })

  it("schema pass if the query is valid ", () => {
    const validQ = `
      {
        accounts {
          id
          debtAmount
        }
      }
    `
    tester.test(true, validQ)
  })

  it("Should fail if the query is invalid", () => {
    const invalidQuery = `
  {
    accounts {
      publicationDate
    }
  }
  `
    tester.test(false, invalidQuery)
  })
})
