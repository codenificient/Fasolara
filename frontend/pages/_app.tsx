import { ThemeProvider } from 'next-themes'
import { useEffect, useState } from "react"
import RootLayout from '../components/Layout'
import "../styles/globals.css"

function MyApp( { Component, pageProps } )
{
  const [darkMode, setDarkMode] = useState( false )

  useEffect( () =>
  {
    if ( darkMode )
    {
      document.documentElement.classList.add( 'dark' )
    } else
    {
      document.documentElement.classList.remove( 'dark' )
    }
  }, [darkMode] )

  return (
    <ThemeProvider attribute="class" enableSystem={false}>
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </ThemeProvider>
  )
}

export default MyApp
