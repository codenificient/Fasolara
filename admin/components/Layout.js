import Head from 'next/head'
import React from 'react'
import Sidebar from './Sidebar'
import Sidebare from './Sidebare'

function Layout({ user, loading = false, children }) {
	return (
		<div className="ext_wrapper">
			<Head>
				<title>FasoLara Admin</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="laraOne.png" />
			</Head>

			<Sidebar />

			<main>
				<div>{children}</div>
			</main>

			<Sidebare />
		</div>
	)
}

export default Layout
