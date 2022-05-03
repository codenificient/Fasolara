import styles from '../styles/Projects.module.css'
import Member from './Member'
import Progress from './Progress'

export default function Project({ number, members, image, progress }) {
	
	return (
		<div className={styles.project_container}>
			<div className={styles.title}>
				<h3 className={styles.heading}>Project {number}</h3>
				<img className={styles.project_img} src={image} alt={image} />
			</div>
			<div>
				<h3 className={styles.heading}>Team Members:</h3>
				<div className={styles.grid}>{members.map((mbr) => <Member key={mbr.name} name={mbr.name} jobTitle={mbr.jobTitle} imageUrl={mbr.imageUrl} />)}</div>
			</div>
			<div>
				<h3 className={styles.heading}>Progress:</h3>
				<div>
					<Progress progress={progress} />
					{/* <NewProgress /> */}
				</div>
			</div>
		</div>
	)
}
