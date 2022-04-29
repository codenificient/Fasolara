import styles from '../styles/Sidebar.module.css'
import Navigation from './Navigation'
import Link from 'next/link'

export default function Sidebar() {
	return (
		<div className={styles.sidebar_container}>
			<div className={styles.title}>Lara</div>
			<Navigation />
			<Link key="13-931-2871" href="/logout" className={styles.Logout}>
				<span className={styles.Line}>
					<i className="fas fa-sign-out-alt" style={{ color: '#f24e1e', fontSize: '20px' }} />
					<span className={styles.Name}>Logout</span>
				</span>
			</Link>
		</div>
	)
}
