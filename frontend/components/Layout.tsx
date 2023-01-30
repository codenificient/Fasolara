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
		<div className="w-full h-full max-w-screen-3xl justify-center items-start m-0 dark:bg-dark-default">
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
