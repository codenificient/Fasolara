"use client"
import LeftSidebar from '@c/Sidebar'
import Sidebare from '@c/Sidebare'
import { ChakraProvider } from '@chakra-ui/react'
import '@s/globals.scss'
import { Suspense } from 'react'

export default function RootLayout( {
	children,
}: {
	children: React.ReactNode
} )
{
	return (
		<html lang="en" >
			<body >
				<div className="ext_wrapper">
					<Suspense fallback={<h2>Loading...</h2>}>
						<ChakraProvider>
							<LeftSidebar />
							<main>
								{children}
							</main>
							<Sidebare />
						</ChakraProvider>
					</Suspense>
				</div>
			</body>
		</html>
	)
}
