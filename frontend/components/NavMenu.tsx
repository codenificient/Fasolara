"use client"
import { useTheme } from "next-themes"
import Link from 'next/link'
import { useEffect, useState } from "react"
import { FaMoon, FaSun } from 'react-icons/fa'
import styles from '../styles/components/Navigation.module.scss'
import { navLinks } from "./data/navlinks"
import { useRouter } from "next/router"
import React from 'react'


interface Icon
{
	id: string
	name: string
	to: string
}


const NavMenu = () =>
{
	const { systemTheme, theme, setTheme } = useTheme()
	const router = useRouter()
	const [mounted, setMounted] = useState( false )

	useEffect( () =>
	{
		setMounted( true )
	}, [] )

	const renderThemeChanger = () =>
	{
		if ( !mounted ) return null

		const currentTheme = theme === "system" ? systemTheme : theme

		if ( currentTheme === "dark" )
		{
			return (
				<FaSun className="w-6 h-6 text-yellow-500 " role="button" onClick={() => setTheme( 'light' )} />
			)
		}

		else
		{
			return (
				<FaMoon className="w-6 h-6 text-gray-900 " role="button" onClick={() => setTheme( 'dark' )} />
			)
		}
	}

	if ( !navLinks ) return


	return (
		<div className={styles.navigation_container}>
			<span className={styles.Center}>
				{navLinks.map( ( icon: Icon ) => (
					<Link key={icon.id} href={icon.to} className={styles.MenuItem}>
						<span
							className={`${styles.Name} ${router.asPath.endsWith( icon.to ) ? styles.Active : styles.inactive
              }`}
						>
							{icon.name}
						</span>
					</Link>
				) )}
			</span>
			<span className={styles.Name}>{renderThemeChanger()}</span>
		</div>
	)
}

export default NavMenu