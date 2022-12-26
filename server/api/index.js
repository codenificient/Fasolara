const { ApolloServer } = require("apollo-server")
const { ApolloServerPluginLandingPageGraphQLPlayground } = require( "apollo-server-core")
const mongoose = require("mongoose")

require("dotenv").config()

const typeDefs = require("../graphql/typeDefs")
const resolvers = require("../graphql/resolvers")
const { verifyUser } = require("../helpers/context")

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: "bounded",
  introspection: true,
  playground: true,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  context: async ({ req }) => {
    await verifyUser(req)
    return {
      email: req.email,
      userId: req.userId,
    }
  },
})

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB is connected")
    return server.listen({ port: process.env.PORT })
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`)
  })
  .catch((error) => console.log(error))

// console.log(process.env.MONGO_URI)

module.exports = server
