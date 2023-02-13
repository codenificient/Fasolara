import styles from '@css/ActiveProjects.module.scss'
import ActiveProject from './ActiceProject'

const projects = [
	{
		id: 1,
		imageUrl: '/assets/astronergy.png',
		progress: 100
	},
	{
		id: 2,
		imageUrl: '/assets/CanadianSolar.png',
		progress: 100
	},
	{
		id: 3,
		imageUrl: '/assets/JASolar.png',
		progress: 96
	},
	{
		id: 4,
		imageUrl: '/assets/powergo.png',
		progress:   79
	},
	{
		id: 5,
		imageUrl: '/assets/renesola.png',
		progress: 58
	},
	{
		id: 6,
		imageUrl: '/assets/Vikram.png',
		progress: 32
	}
]

export default function ActiveProjects() {
	return (
		<div className={styles.activeprojects_container}>
			<div className={styles.project_list}>
                <ActiveProject img="Projets Recents" date="Lancement" leader="Leader" due="Délais" status="Status" featured />
                <ActiveProject img="/assets/astronergy.png"  date="25 Mai 2020" leader="Alimata Traore" due="10 Jul 2020" status="En Progrès" />
                <ActiveProject   img="/assets/CanadianSolar.png" date="09 Mar 2021" leader="Bibata Sanogo" due="27 Avr 2021" status="En Progrès" />
                <ActiveProject   img="/assets/JASolar.png" date="18 Nov 2020" leader="Cader Ilboudo" due="12 Fev 2021" status="En Progrès" />
                <ActiveProject   img="/assets/powergo.png" date="25 Jul 2020" leader="Daouda Momo" due="23 Oct 2021" status="En Progrès" />
                <ActiveProject img="/assets/renesola.png"  date="07 Jan 2023" leader="Malika Ouedraogo" due="01 Aou 2025" status="En Progrès" />
                <ActiveProject img="/assets/Vikram.png"  date="23 Sep 2023" leader="Fabrice Tiendrebeogo" due="14 Mar 2026" status="En Progrès" />
			</div>
		</div>
	)
}
