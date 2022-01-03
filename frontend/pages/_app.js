import { ApolloProvider } from 'react-apollo'
import '../styles/globals.css'
import ApolloClient from 'apollo-boost'

// Apollo client setup
const client = new ApolloClient({
	uri: 'http://localhost:3000/graphql'
})

function MyApp({ Component, pageProps }) {
	return (
		<ApolloProvider client={client}>
			<Component {...pageProps} />
		</ApolloProvider>
	)
}

export default MyApp
