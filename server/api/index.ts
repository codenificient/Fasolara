import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { makeExecutableSchema } from '@graphql-tools/schema'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import { useServer } from 'graphql-ws/lib/use/ws'
import { createServer } from 'http'
import mongoose from 'mongoose'
import { WebSocketServer } from 'ws'
import { resolvers, typeDefs } from '../graphql/index.js'

dotenv.config()

mongoose.set( 'strictQuery', true )

import { verifyUser } from '../helpers/context.js'

const PORT = process.env.PORT || 4000


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
	introspection: true,
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
}, )

await server.start()

app.use( '/api', cors<cors.CorsRequest>(), bodyParser.json(), expressMiddleware( server, {
	context: async ( { req, res } ) =>
	{
		await verifyUser( req, res )
		return {
			email: req.email,
			userId: req.userId,
			addressId: req.addressId,
			teamId: req.teamId,
			role: req.role
		}
	},
} ) )

// Connect to the database
mongoose
	.connect( process.env.MONGO_URI )
	.then( () =>
	{
		console.log( "MongoDB is connected" )
		return httpServer.listen( PORT, () =>
		{
			console.log( `🚀 Query endpoint ready at http://localhost:${PORT}/api` )
			console.log( `🚀 Subscription endpoint ready at ws://localhost:${PORT}/api` )
		} )
	} )
	.then( ( res ) =>
	{
		console.log( `Server running at http://localhost:${PORT}/api` )
	} )
	.catch( ( error ) => console.log( error ) )

export default server
