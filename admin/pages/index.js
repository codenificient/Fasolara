import Link from 'next/link'
import { useState } from 'react'
import ActiveProjects from '../components/ActiveProjects'
import Charts from '../components/Charts'
import Icon from '../components/Icon'
import Layout from '../components/Layout'
import Projects from '../components/Projects'
import Input from '../components/UI/Input'
import styles from '../styles/pages/Home.module.scss'

export default function Home() {
	const [ notify, setNotify ] = useState(true)
	return (
		<Layout>
			<div className="inn_wrapper">
				<span className={styles.InlineRow}>
					<span className={styles.search}>
						<Input
							type="text"
							placeholder="réchercher les comptes, projets, investisseurs..."
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
			</div>
		</Layout>
	)
}
