import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import RootLayout from '../components/Layout'
import "../styles/globals.scss"

function MyApp( { Component, pageProps }: AppProps )
{
  return (
    <ThemeProvider attribute="class" enableSystem={false}>
      <RootLayout >
        <Component {...pageProps} />
      </RootLayout>
    </ThemeProvider>
  )
}

export default MyApp
