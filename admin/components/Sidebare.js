import Activities from './Activities'
import Agenda from './Agenda'
import ProfileMenu from './ProfileMenu'
import styles from '../styles/components/Sidebare.module.scss'

export default function Sidebar() {
	return (
		<div className={styles.sidebare_container}>
            <ProfileMenu />
            <Activities />
            <Agenda />
		</div>
	)
}
