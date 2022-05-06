import Link from 'next/link'
import React from 'react'
import styles from '../styles/components/Navigation.module.css'


export default function NavMenu({ icons }) {
	return (
		<span className={styles.Center}>
			{icons.map((icon) => (
				<Link key={icon.id} href={icon.to} className={styles.MenuItem} passHref>
					<p className={styles.Inline}>
						<i className={`Icon ${icon.icon}`} style={{  fontSize: '22px' }} />
						<span className={styles.Name}>{icon.name}</span>
					</p>
				</Link>
			))}
		</span>
	)
}
