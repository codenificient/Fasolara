import { ThemeProvider } from 'next-themes'
import RootLayout from '../components/Layout'
import "../styles/globals.scss"
import type { AppProps } from 'next/app'
import React from 'react'

function MyApp( { Component, pageProps }: AppProps )
{
  return (
    <ThemeProvider attribute="class" enableSystem={false}>
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </ThemeProvider>
  )
}

export default MyApp
