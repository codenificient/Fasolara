import styles from '@css/Sidebare.module.scss'
import Activity from './Activity'

export default function Activities() {
	return (
		<div className={styles.activites_container}>
			<div className={styles.title}>Activités des Projets</div>
			<Activity />
		</div>
	)
}
