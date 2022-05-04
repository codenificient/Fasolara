import ActiveProjects from '../components/ActiveProjects'
import Charts from '../components/Charts'
import Layout from '../components/Layout'
import Projects from '../components/Projects'
import Input from '../components/UI/Input'
import styles from '../styles/Home.module.css'

function Home() {
	return (
		<Layout>
			<h1 className={styles.title}>Lara admin Dashboard - April 2022</h1>

			<div className="inn_wrapper">
				<Input placeholder="réchercher les comptes, projets, investisseurs..." label="Recherches"  />
				<Projects />
				<Charts />
				<ActiveProjects />
			</div>
		</Layout>
	)
}

export default Home
