"use client"
import { MemoizedSidebar } from '@c/Sidebar'
import { MemoizedSidebare } from '@c/Sidebare'
import { ChakraProvider } from '@chakra-ui/react'
import '@s/globals.scss'
import Providers from 'lib/client'
import { SessionProvider } from 'next-auth/react'
import { ReactNode, Suspense } from 'react'

export default function RootLayout( {
	children,
}: {
	children: ReactNode,
} )
{
	return (
		<html lang="en" >
			<SessionProvider >
				<body >
					<div className="ext_wrapper">
						<Suspense fallback={<h2>Loading...</h2>}>
							<ChakraProvider>
								<MemoizedSidebar />
								<main>
									<Providers>
										{children}
									</Providers>
								</main>
								<MemoizedSidebare />
							</ChakraProvider>
						</Suspense>
					</div>
					<script defer src="https://unpkg.com/ionicons@latest/dist/ionicons.js"></script>
				</body>
			</SessionProvider>
		</html>
	)
}
