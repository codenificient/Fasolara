import styles from '../styles/components/Sidebare.module.scss'
import Avatar from './Avatar'
import Icon from './Icon'

export default function ProfileMenu() {
	return (
		<div className={styles.profilemenu_container}>
		

			<div className={styles.profile}>
				<Avatar image={'/assets/admin.png'} wSize="90" iSize="70" />
				<span className={styles.namerole}>
					<h4 className={styles.Name}>Christian Tioye</h4>
					<span className={styles.role}>admin</span>
				</span>
			</div>
			<Icon classes={'fa-solid fa-circle-chevron-down'} colors="#f28821" size="30px" />
		</div>
	)
}
