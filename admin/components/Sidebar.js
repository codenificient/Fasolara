import styles from '../styles/Sidebar.module.css'
import Navigation from './Navigation'

export default function Sidebar() {
	return (
		<div className={styles.sidebar_container}>
			<div className={styles.title}>Lara</div>
			<Navigation />
		</div>
	)
}
