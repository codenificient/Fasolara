import ApolloClient from "apollo-boost"
import { ApolloProvider } from "react-apollo"
import Layout from "../components/Layout"
import "../styles/globals.scss"

// Apollo client setup
const client = new ApolloClient({
  //   uri: "http://localhost:3000/graphql",
  uri: "https://fasolaraserver.vercel.app/graphql",
})

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </Layout>
  )
}
