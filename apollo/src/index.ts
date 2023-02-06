import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { makeExecutableSchema } from '@graphql-tools/schema'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import { gql } from 'graphql-tag'
import { useServer } from 'graphql-ws/lib/use/ws'
import { createServer } from 'http'
import mongoose from 'mongoose'
import { WebSocketServer } from 'ws'
import { DateTimeResolver } from 'graphql-scalars'

dotenv.config()

import { resolvers as accountResolvers, typeDefs as accountTypes } from './graphql/account/index.js'
import { resolvers as bankResolvers, typeDefs as bankTypes } from './graphql/bank/index.js'

const PORT = process.env.PORT || 4000


// Schema definition
const typeDefs = gql`
scalar Date
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }

  type Subscription {
    _empty: String
  }

  ${accountTypes}
  ${bankTypes} 
`

const resolvers = {
	Date: DateTimeResolver,
	Query: {
		...accountResolvers.Query,
		...bankResolvers.Query,
	},
	Mutation: {
		...accountResolvers.Mutation,
		...bankResolvers.Mutation,
	},
	Subscription: {
		...accountResolvers.Subscription,
		...bankResolvers.Subscription,
	}
}

// Create schema, which will be used separately by ApolloServer and
// the WebSocket server.
// Create the schema
const schema = makeExecutableSchema( { typeDefs, resolvers } )

// Create an Express app and HTTP server; we will attach the WebSocket
// server and the ApolloServer to this HTTP server.
const app = express()
const httpServer = createServer( app )

// Set up WebSocket server.
const wsServer = new WebSocketServer( {
	server: httpServer,
	path: '/graphql',
} )
const serverCleanup = useServer( { schema }, wsServer )

// Set up ApolloServer.
const server = new ApolloServer( {
	schema,
	plugins: [
		// Proper shutdown for the HTTP server.
		ApolloServerPluginDrainHttpServer( { httpServer } ),

		// Proper shutdown for the WebSocket server.
		{
			async serverWillStart()
			{
				return {
					async drainServer()
					{
						await serverCleanup.dispose()
					},
				}
			},
		},
	],
} )

await server.start()

app.use( '/graphql', cors<cors.CorsRequest>(), bodyParser.json(), expressMiddleware( server ) )

// Connect to the database
mongoose
	.connect( process.env.MONGO_URI )
	.then( () =>
	{
		console.log( "MongoDB is connected" )
		return httpServer.listen( PORT, () =>
		{
			console.log( `🚀 Query endpoint ready at http://localhost:${PORT}/graphql` )
			console.log( `🚀 Subscription endpoint ready at ws://localhost:${PORT}/graphql` )
		} )
	} )
	.then( ( res ) =>
	{
		console.log( `Server running at http://localhost:${PORT}/graphql` )
	} )
	.catch( ( error ) => console.log( error ) )
