import Link from 'next/link'
import ActiveProjects from '../components/ActiveProjects'
import Charts from '../components/Charts'
import Layout from '../components/Layout'
import Projects from '../components/Projects'
import Input from '../components/UI/Input'
import styles from '../styles/pages/Home.module.css'

export default function Home() {
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
				</span>
				<Projects />
				<Charts />
				<ActiveProjects />
			</div>
		</Layout>
	)
}
