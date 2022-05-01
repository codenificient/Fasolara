import styles from '../styles/Sidebare.module.css'
import Avatar from './Avatar'
import Icon from './Icon'

export default function ProfileMenu() {
	return (
		<div className={styles.profilemenu_container}>
			<Icon classes={'fa-solid fa-bell'} colors="#8d8d8d" size="30px" />
			<div className="icon_indicator" />

			<div className={styles.profile}>
				<Avatar image={'/assets/admin.png'} />
			<span className={styles.namerole}>
					<h4 className={styles.Name}>Christian Tioye</h4>
				<span className={styles.role}>
					admin
				</span>
			</span>
			</div>
			<Icon classes={'fa-solid fa-circle-chevron-down'} colors="#f28821" size="30px" />
		</div>
	)
}
