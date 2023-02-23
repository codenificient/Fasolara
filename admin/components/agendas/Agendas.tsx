import styles from '@css/Sidebare.module.scss'
import Agenda from './Agenda'

export default function AgendaPage() {
	return (
		<div className={styles.agenda_container}>
			<div className={styles.title}>Agenda du jour</div>
			<Agenda />
		</div>
	)
}
