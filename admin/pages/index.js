import ActiveProjects from '../components/ActiveProjects'
import Charts from '../components/Charts'
import Layout from '../components/layout'
import Projects from '../components/Projects'
import styles from '../styles/Home.module.css'

function Home() {
	return (
		<Layout>
			<h1 className={styles.title}>FasoLara admin Dashboard - April 2022</h1>
			<div >
				<Projects />
        <Charts />
        <ActiveProjects />
			</div>
		</Layout>
	)
}

export default Home
