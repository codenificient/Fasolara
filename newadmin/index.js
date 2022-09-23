const { ApolloServer } = require("apollo-server")
const mongoose = require("mongoose")
const dotenv = require("dotenv")

const typeDefs = require("./graphql/typeDefs")
const resolvers = require("./graphql/resolvers")

dotenv.config()

const server = new ApolloServer({
  typeDefs,
  resolvers,
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
