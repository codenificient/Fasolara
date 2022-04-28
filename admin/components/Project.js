import styles from '../styles/Projects.module.css'

export default function Project({number }) {
	return (
		<span className={styles.project_container}>
			<div className={styles.title}>Project {number}</div>
		</span>
	)
}
