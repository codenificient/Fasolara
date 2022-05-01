import styles from '../styles/Projects.module.css'

export default function Project({number }) {
	return (
		<span className={styles.project_container}>
			<div className={styles.title}>Project {number}</div>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo 
		</span>
	)
}
