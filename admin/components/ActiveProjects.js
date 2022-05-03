import styles from '../styles/ActiveProjects.module.css'
import ActiveProject from './ActiceProject'

export default function ActiveProjects() {
	return (
		<div className={styles.activeprojects_container}>
			{/* <div className={styles.title}>Active Projects</div> */}
			<div className={styles.project_list}>
                <ActiveProject img="Projets Recents" date="Lancement" leader="Leader" due="Délais" status="Status" featured />
                <ActiveProject  date="25 May 2020" leader="Alimata Traore" due="10 July 2020" status="In Progress" />
                <ActiveProject  date="09 March 2021" leader="Bibata Sanogo" due="27 April 2021" status="In Progress" />
                <ActiveProject  date="18 November 2020" leader="Cader Ilboudo" due="12 February 2021" status="In Progress" />
                <ActiveProject  date="25 July 2020" leader="Daouda Momo" due="23 October 2021" status="In Progress" />
                <ActiveProject  date="07 January 2023" leader="Malika Ouedraogo" due="01 August 2025" status="In Progress" />
			</div>
		</div>
	)
}
