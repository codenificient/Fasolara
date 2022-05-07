import Layout from '../components/Layout'
import Projects from '../components/Projects'
import styles from '../styles/components/Projects.module.css'


export default function ProjectsList() {
	return (
		<Layout>
			<div className={styles.projects_container}>
				<div className={styles.grid}>
					<Projects />
					<Projects />
					<Projects />
					<Projects />
					<Projects />
					<Projects />
					<Projects />
					<Projects />
					<Projects />
				</div>
			</div>
		</Layout>
	)
}
