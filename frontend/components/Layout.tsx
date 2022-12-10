import React from "react"
import styles from "../styles/Layout.module.scss"
import Footer from "./Footer"
import Header from "./Header"
import MainHead from "./MainHead"


function RootLayout( {
	children,
}: {
	children: React.ReactNode
} )
{
	return (
		<div className="w-full justify-center align-middle m-4">
			<MainHead />
			<main>
				<Header />
				<div className={styles.pageContent}>{children}</div>
				<Footer />
			</main>
		</div>
	)
}

export default RootLayout
