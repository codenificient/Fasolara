import Head from 'next/head'
import LeftSidebar from './Sidebar'
import Sidebare from './Sidebare'

function Layout( { user = undefined, loading = false, children } )
{
	return (
		<div className="ext_wrapper">
			<Head>
				<title>FasoLara Admin</title>
				<meta name="description" content="Admin dashboard for the FasoLara platform" />
				<link rel="icon" href="/laraOne.png" />
			</Head>

			<LeftSidebar />

			<main>
				<div>{children}</div>
			</main>

			<Sidebare />
		</div>
	)
}

export default Layout
