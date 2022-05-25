import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import {menus} from '../data/emailNav'
import styles from '../../styles/components/EmailMenu.module.scss'

function Menu() {
	const router = useRouter()
	return (
		<span className={styles.menu_container}>
			{menus.map((icon) => (
				<Link key={icon.id} href={icon.to} className={styles.MenuItem} passHref>
					<a className={styles.Inline}>
						<i className={`Icon ${icon.icon}`} style={{ fontSize: '22px' }} />
						<span
							className={`${styles.Name} ${router.pathname == icon.to ? styles.Active : styles.inactive}`}
						>
							{icon.name}
						</span>
					</a>
				</Link>
			))}
		</span>
	)
}

export default Menu
