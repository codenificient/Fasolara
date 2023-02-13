import styles from '@css/Projects.module.scss'
import { members } from '@data/members'
import { projects } from '@data/projectlist'
import Project from './Project'

export default function Projects()
{
	// console.log({ projects })
	return (
		<div className={styles.projects_container}>
			<div className={styles.grid}>
				{projects &&
					projects.map( ( proj ) => (
						<Project
							key={proj.id}
							number={proj.id}
							members={members}
							progress={proj.progress}
							image={proj.imageUrl}
						/>
					) )}
			</div>
		</div>
	)
}
