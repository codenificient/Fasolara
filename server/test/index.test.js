const { ApolloServer } = require("apollo-server")
const { assertAbstractType } = require("graphql")
const { describe, it } = require("mocha")
const resolvers = require("../graphql/resolvers")
const typeDefs = require("../graphql/typeDefs")

describe("Test the server using Apollo", () => {
  it("returns valid response", async () => {
    const testServer = new ApolloServer({
      typeDefs,
      resolvers,
    })
    const resp = await testServer.executeOperation({
      query: `
      {
        accounts {
          id
          debtAmount
        }
      }
    `,
    })
    expect(resp.body.singleResult.errors).toBeUndefined()
  })
})
