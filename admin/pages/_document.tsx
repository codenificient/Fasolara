import { ColorModeScript } from '@chakra-ui/react'
import Document, { Head, Html, Main, NextScript } from 'next/document'
import theme from '../lib/theme'

class MyDocument extends Document
{
	static async getInitialProps( ctx )
	{
		const initialProps = await Document.getInitialProps( ctx )
		return { ...initialProps }
	}

	render()
	{
		return (
			<Html>
				<Head>
					<link
						rel="stylesheet"
						href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
						integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g=="
						crossOrigin="anonymous"
					/>
					<script src="https://unpkg.com/react/umd/react.production.min.js"></script>
					<script src="https://unpkg.com/ionicons@4.5.10-0/dist/ionicons.js"></script>
					<link href="https://unpkg.com/ionicons@4.5.10-0/dist/css/ionicons.min.css" rel="stylesheet" />
				</Head>
				<body>
					<ColorModeScript initialColorMode={theme.config.initialColorMode} />
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

export default MyDocument
