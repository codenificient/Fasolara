"use client"
import Projects from '@proj/Projects'
import CreateProject from '@ui/CreateProject'
import styles from '@cs/projects.module.scss'


export default function ProjectDashboard() {
	return (
			<div className={styles.projects_container}>
				<div className={styles.grid}>
					{/* <CreateProject /> */}
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
