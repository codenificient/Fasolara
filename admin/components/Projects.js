import styles from '../styles/Projects.module.css'
import Project from './Project'

export default function Projects() {
	return (
		<div className={styles.projects_container}>
			<div className={styles.title}>Projects</div>
            <div className={styles.grid}>
                <Project number={'1'} />
                <Project  number={'2'} />
                <Project  number={'3'} />
                <Project  number={'4'} />
                <Project  number={'5'} />
                <Project  number={'6'} />
            </div>
		</div>
	)
}
