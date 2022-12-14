"use client"
import { useTheme } from 'next-themes'
import React from 'react'

const ThemeChanger = () =>
{
	const { theme, setTheme } = useTheme()

	return (
		<div>
			The current theme is: {theme}
			<br />
			<button onClick={() => setTheme( 'light' )}>Light Mode</button>
			<button onClick={() => setTheme( 'dark' )}>Dark Mode</button>
		</div>
	)
}

export default ThemeChanger