import Document, { Head, Html, Main, NextScript } from 'next/document'

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

				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

export default MyDocument
