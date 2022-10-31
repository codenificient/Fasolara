# FasoLara Backend GraphiQL Server

The Express.JS and GraphQL based backend server  for the FasoLara platform

Initial testing of the backend allowed the creation of 1000 sample objects in the remote database and fetching within the GraphiQL user interface.

Missing authentication functionality which is being added on the Apollo version of the backend server

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The GraphiQL explorer uses introspection to show you which queries and Mutations are available

The queries will not work if executed because the connection link for the database is in the .env.local which is not publicly available