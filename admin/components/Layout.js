import Head from 'next/head'
import React from 'react'
import Sidebar from './Sidebar'
import Sidebare from './Sidebare'

function Layout({ user, loading = false, children }) {
	return (
		<div className="ext_wrapper">
			<Head>
				<title>FasoLara Admin</title>
			</Head>

			<Sidebar />

			<main>
				<div className="inn_wrapper">{children}</div>
			</main>
			<Sidebare />
			<style jsx>{`
				.container {
					width: 100vw;
					margin: auto;
				}
			`}</style>
			<style jsx global>{`
				body {
					margin: 0;
					color: #333;
					font-family: -apple-system, BlinkMacSystemFont, 'Poppins', Roboto, Oxygen, Ubuntu, Cantarell,
						'Open Sans', 'Helvetica Neue', sans-serif;
				}
			`}</style>
		</div>
	)
}

export default Layout
