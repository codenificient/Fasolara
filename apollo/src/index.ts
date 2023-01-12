import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import dotenv from 'dotenv'
dotenv.config()


// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
import resolvers from "./graphql/resolvers/index.js"
import typeDefs from "./graphql/typeDefs/index.js"


interface MyContext
{
	token?: String
}

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer<MyContext>( { typeDefs, resolvers } )
const { url } = await startStandaloneServer( server, {
	context: async ( { req } ) => ( { token: req.headers.token } ),
	listen: { port: 4000 },
} )
console.log( `🚀  Server ready at ${url}` )

export { }
