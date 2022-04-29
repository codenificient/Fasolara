import Activities from './Activities'
import Agenda from './Agenda'
import ProfileMenu from './ProfileMenu'
import styles from '../styles/Sidebare.module.css'

export default function Sidebar() {
	return (
		<div className={styles.sidebare_container}>
            <ProfileMenu />
			<div className={styles.title}>Sidebare</div>
            <Activities />
            <Agenda />
		</div>
	)
}
