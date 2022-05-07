import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import styles from '../styles/components/Navigation.module.scss'

export default function NavMenu({ icons }) {
	const router = useRouter()
	return (
		<span className={styles.Center}>
			{icons.map((icon) => (
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
