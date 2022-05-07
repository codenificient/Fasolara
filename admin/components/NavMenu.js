import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import styles from '../styles/components/Navigation.module.css'

export default function NavMenu({ icons }) {
	const router = useRouter()
	return (
		<span className={styles.Center}>
			{icons.map((icon) => (
				<Link key={icon.id} href={icon.to} className={styles.MenuItem} passHref>
					<p className={styles.Inline}>
						<i className={`Icon ${icon.icon}`} style={{ fontSize: '22px' }} />
						<span
							className={styles.Name}
							style={{ color: router.pathname === icon.to ? '#fca320' : '#8d8d8d' }}
						>
							{icon.name}
						</span>
					</p>
				</Link>
			))}
		</span>
	)
}
