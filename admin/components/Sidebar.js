import Link from 'next/link'
import styles from '../styles/Sidebar.module.css'
import Navigation from './Navigation'

export default function Sidebar() {
	return (
		<div className={styles.sidebar_container}>
			<div className={styles.title}>
				<img className={styles.logo} src='laraOne.png' alt='fasolara logo' />
			</div>
			<Navigation />
			<Link key="13-931-2871" href="/logout" className={styles.Logout}>
				<a className={styles.Line}>
					<i className="fas fa-sign-out-alt Icon" style={{ color: '#f24e1e', fontSize: '25px' }} />
					<span className={styles.Name}>Logout</span>
				</a>
			</Link>
		</div>
	)
}
