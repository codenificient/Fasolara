import styles from '../styles/ActiveProjects.module.css'
import ActiveProject from './ActiceProject'

export default function ActiveProjects() {
	return (
		<div className={styles.activeprojects_container}>
			<div className={styles.title}>Charts</div>
			<div className={styles.project_list}>
                <ActiveProject img="Projets Recents" date="Lancement" leader="Leader" due="Délais" status="Status" featured />
                <ActiveProject  date="25 May 2020" leader="Alimata Traore" due="10 July 2020" status="In Progress" />
                <ActiveProject  date="25 May 2020" leader="Alimata Traore" due="10 July 2020" status="In Progress" />
                <ActiveProject  date="25 May 2020" leader="Alimata Traore" due="10 July 2020" status="In Progress" />
                <ActiveProject  date="25 May 2020" leader="Alimata Traore" due="10 July 2020" status="In Progress" />
                <ActiveProject  date="25 May 2020" leader="Alimata Traore" due="10 July 2020" status="In Progress" />
			</div>
		</div>
	)
}
