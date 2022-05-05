import Link from 'next/link'
import ActiveProjects from '../components/ActiveProjects'
import Charts from '../components/Charts'
import Layout from '../components/Layout'
import Projects from '../components/Projects'
import Input from '../components/UI/Input'
import styles from '../styles/Home.module.css'

function Home() {
	return (
		<Layout>
			{/* <h1 className={styles.title}>Lara admin Dashboard - April 2022</h1> */}

			<div className="inn_wrapper">
				<span className={styles.InlineRow}>
					<span className={styles.search}>
						<Input type="text" placeholder="réchercher les comptes, projets, investisseurs..." className={styles.searchTerm} />
						<button type="submit" className={styles.searchButton}>
							<i className="fa fa-search Icon"  />
						</button>
					</span>

					<Link href={'/messages'}>
						<a className={styles.Navs}>Messages</a>
					</Link>
					<Link href={'/help'}>
						<a className={styles.Navs1}>Besoin d'assistance?</a>
					</Link>
				</span>
				<Projects />
				<Charts />
				<ActiveProjects />
			</div>
		</Layout>
	)
}

export default Home
