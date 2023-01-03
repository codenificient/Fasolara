import Link from 'next/link'
import { useState } from 'react'

import ActiveProjects from '@proj/ActiveProjects'
import Projects from '@proj/Projects'
import Icon from '@c/UI/Icon'
import Visitor from '@c/Visitor'
import Charts from '@chart/Charts'
import styles from '@cs/Home.module.scss'
import Input from '@ui/Input'

export default function Home()
{
	const [notify, setNotify] = useState( true )
	return (
		<div className="inn_wrapper">
			<span className={styles.InlineRow}>
				<span className={styles.search}>
					<Input
						type="text"
						placeholder="comptes, projets, investisseurs..."
						className={styles.searchTerm}
					/>
					<button type="submit" className={styles.searchButton}>
						<i className="fa fa-search Icon" />
					</button>
				</span>

				<Link href={'/messages'} passHref>
					<a className={styles.Navs}>Messages</a>
				</Link>
				<Link href={'/help'} passHref>
					<a className={styles.Navs1}>Besoin d&apos;assistance?</a>
				</Link>
				<Icon classes={'fa-solid fa-bell'} colors="#8d8d8d" size="30px" />
				<div className={styles.icon_indicator} style={{ display: notify ? 'block' : 'none' }} />
			</span>
			<Projects />
			<Charts />
			<ActiveProjects />
			<Visitor />
		</div>
	)
}
