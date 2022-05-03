import styles from '../styles/Projects.module.css'
import Project from './Project'

const members = [
	{
		name: 'Koren Bullivent',
		jobTitle: 'HR Assistant I',
		imageUrl: 'https://randomuser.me/api/portraits/women/84.jpg'
	},
	{
		name: 'Misha Guyer',
		jobTitle: 'Accountant IV',
		imageUrl: 'https://randomuser.me/api/portraits/women/12.jpg'
	},
	{
		name: 'Isabel Pear',
		jobTitle: 'Help Desk',
		imageUrl: 'https://randomuser.me/api/portraits/women/2.jpg'
	}
]
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

export default function Projects() {
	return (
		<div className={styles.projects_container}>
			<div className={styles.grid}>
				{projects.map((proj) => (
					<Project key={proj.id} number={proj.id} members={members} progress={proj.progress} image={proj.imageUrl} />
				))}
			</div>
		</div>
	)
}
