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
					<Input placeholder="réchercher les comptes, projets, investisseurs..." />
					<Link href={'/messages'}>
						<a className={styles.Navs}>Messages</a>
					</Link>
					<Link href={'/help'}>
						<a className={styles.Navs}>Besoin d'assistance?</a>
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
