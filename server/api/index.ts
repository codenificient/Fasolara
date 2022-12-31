const { ApolloServer } = require( '@apollo/server' )
const { startStandaloneServer } = require( '@apollo/server/standalone' )

require( "dotenv" ).config()

const typeDefs = require( "../graphql/typeDefs" )
const resolvers = require( "../graphql/resolvers" )
const { verifyUser } = require( "../helpers/context" )

const server = new ApolloServer( {
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: "bounded",
  introspection: true,
} )

const { url } = await startStandaloneServer( server, {
  listen: { port: +process.env.PORT }
} )

console.log( `🚀  Server ready at: ${url}` )

// mongoose
//   .connect( process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   } )
//   .then( () =>
//   {
//     console.log( "MongoDB is connected" )
//     return server.listen( { port: process.env.PORT } )
//   } )
//   .then( ( res ) =>
//   {
//     console.log( `Server running at ${res.url}` )
//   } )
//   .catch( ( error ) => console.log( error ) )

// console.log(process.env.MONGO_URI)

module.exports = { server: server }

