// TODO create new account mutation test
// TODO fetch single account by ID test
// TODO get an account with loggedIn user (context obj)

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

  it("Returns data if the query is valid ", () => {
    const validQ = `
      {
        accounts {
          id
          debtAmount
        }
      }
    `
    tester.graphql(validQ, undefined, undefined, undefined).then((accounts) => {
      expect(accounts.length).to.be.eq(2)
    })
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
