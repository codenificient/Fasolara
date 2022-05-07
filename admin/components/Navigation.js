import React from 'react'
import styles from '../styles/components/Navigation.module.css'
import { icons } from './data/navlinks'
import NavMenu from './NavMenu'

export default function Navigation() {
	return (
		<div className={styles.navigation_container}>
			<NavMenu icons={icons} />
		</div>
	)
}
