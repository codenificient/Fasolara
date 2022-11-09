// TODO fetch all addresses test
// TODO create new address mutation test
// TODO fetch single address by ID test
// TODO get an address with loggedIn user (context obj)

const chai = require("chai")
const EasyGraphQLTester = require("easygraphql-tester")
const { describe, it } = require("mocha")
const resolvers = require("../graphql/resolvers")
const typeDefs = require("../graphql/typeDefs")

chai.should()

describe("Test Queries and Mutations on Address", () => {
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
