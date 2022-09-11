import Layout from '../components/Layout'
import Projects from '../components/Projects'
import CreateProject from '../components/UI/CreateProject'
import styles from '../styles/components/Projects.module.scss'


export default function ProjectsList() {
	return (
		<Layout>
			<div className={styles.projects_container}>
				<div className={styles.grid}>
					<CreateProject />
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
