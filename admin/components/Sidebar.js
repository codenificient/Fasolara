import Link from 'next/link'
import styles from '../styles/Sidebar.module.css'
import Navigation from './Navigation'
import Image from 'next/image'

export default function Sidebar() {
	return (
		<div className={styles.sidebar_container}>
			<div className={styles.title}>
				<Image className={styles.logo} src="/laraOne.png" alt="fasolara logo" width={500} height={180} />
			</div>
			<Navigation />
			<Link key="13-931-2871" href="/logout" className={styles.Logout} passHref>
				<a className={styles.Line}>
					<i className="fas fa-sign-out-alt Icon" style={{ color: '#f24e1e', fontSize: '25px' }} />
					<span className={styles.Name}>Logout</span>
				</a>
			</Link>
		</div>
	)
}
