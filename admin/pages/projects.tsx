import Projects from '@c/Projects'
import CreateProject from '@ui/CreateProject'
import styles from '@cs/projects.module.scss'


export default function ProjectsList() {
	return (
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
	)
}
