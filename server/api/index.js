import { makeExecutableSchema } from "@graphql-tools/schema";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { useServer } from "graphql-ws/lib/use/ws";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import { gql } from "graphql-tag";
import { merge } from "lodash";

import accountTypes from "../../graphql/typeDefs/account";
import addressTypes from "../../graphql/typeDefs/address";
import bankTypes from "../../graphql/typeDefs/bank";
import commentTypes from "../../graphql/typeDefs/comment";
import conversationTypes from "../../graphql/typeDefs/conversation";
import countryTypes from "../../graphql/typeDefs/country";
import employeeTypes from "../../graphql/typeDefs/employee";
import investorTypes from "../../graphql/typeDefs/investor";
import orderTypes from "../../graphql/typeDefs/order";
import panelTypes from "../../graphql/typeDefs/panel";
import projectTypes from "././../graphql/typeDefsproject";
import provinceTypes from "../../graphql/typeDefs/province";
import salaryTypes from "../../graphql/typeDefs/salary";
import supplierTypes from "../../graphql/typeDefs/supplier";
import teamTypes from "../../graphql/typeDefs/team";
import transactionTypes from "../../graphql/typeDefs/transaction";
import userTypes from "../../graphql/typeDefs/user";
import villageTypes from "../../graphql/typeDefs/village";

const typeDefs = gql`
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }

  type Subscription {
    _empty: String
  }
`;

const resolvers = {};

import { DateTimeResolver } from "graphql-scalars"

const customScalarResolver = {
  Date: DateTimeResolver,
};


// Create the schema, which will be used separately by ApolloServer and
// the WebSocket server.
// Create the schema
const schema = makeExecutableSchema( {
	typeDefs: [typeDefs, accountTypes, addressTypes, bankTypes, commentTypes, conversationTypes],
	resolvers: merge( resolvers, accountResolvers, bankResolvers, commentResolvers, customerResolvers)
} )

// Create an Express app and HTTP server; we will attach both the WebSocket
// server and the ApolloServer to this HTTP server.
const app = express();
const httpServer = createServer(app);

// Create our WebSocket server using the HTTP server we just set up.
const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql",
});
// Save the returned server's info so we can shutdown this server later
const serverCleanup = useServer({ schema }, wsServer);

// Set up ApolloServer.
const server = new ApolloServer({
  schema,
  csrfPrevention: true,
  cache: "bounded",
  plugins: [
    // Proper shutdown for the HTTP server.
    ApolloServerPluginDrainHttpServer({ httpServer }),

    // Proper shutdown for the WebSocket server.
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
    ApolloServerPluginLandingPageLocalDefault({ embed: true }),
  ],
});
await server.start();
server.applyMiddleware({ app });

const PORT = 4000;
// Now that our HTTP server is fully set up, we can listen to it.
httpServer.listen(PORT, () => {
  console.log(
    `Server is now running on http://localhost:${PORT}${server.graphqlPath}`
  );
});
