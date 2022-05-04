import styles from '../styles/ActiveProjects.module.css'
import ActiveProject from './ActiceProject'

const projects = [
	{
		id: 1,
		imageUrl: 'assets/astronergy.png',
		progress: 100
	},
	{
		id: 2,
		imageUrl: 'assets/CanadianSolar.png',
		progress: 100
	},
	{
		id: 3,
		imageUrl: 'assets/JASolar.png',
		progress: 96
	},
	{
		id: 4,
		imageUrl: 'assets/powergo.png',
		progress:   79
	},
	{
		id: 5,
		imageUrl: 'assets/renesola.png',
		progress: 58
	},
	{
		id: 6,
		imageUrl: 'assets/Vikram.png',
		progress: 32
	}
]

export default function ActiveProjects() {
	return (
		<div className={styles.activeprojects_container}>
			{/* <div className={styles.title}>Active Projects</div> */}
			<div className={styles.project_list}>
                <ActiveProject img="Projets Recents" date="Lancement" leader="Leader" due="Délais" status="Status" featured />
                <ActiveProject img="assets/astronergy.png"  date="25 May 2020" leader="Alimata Traore" due="10 July 2020" status="In Progress" />
                <ActiveProject   img="assets/CanadianSolar.png" date="09 March 2021" leader="Bibata Sanogo" due="27 April 2021" status="In Progress" />
                <ActiveProject   img="assets/JASolar.png" date="18 November 2020" leader="Cader Ilboudo" due="12 February 2021" status="In Progress" />
                <ActiveProject   img="assets/powergo.png" date="25 July 2020" leader="Daouda Momo" due="23 October 2021" status="In Progress" />
                <ActiveProject img="assets/renesola.png"  date="07 January 2023" leader="Malika Ouedraogo" due="01 August 2025" status="In Progress" />
                <ActiveProject img="assets/Vikram.png"  date="23 September 2023" leader="Fabrice Tiendrebeogo" due="14 March 2026" status="In Progress" />
			</div>
		</div>
	)
}
