import Image from 'next/image'
import styles from '../styles/components/Projects.module.css'
import Icon from './Icon'
import Member from './Member'
import Progress from './Progress'

export default function Project({ number, members, image, progress }) {
	return (
		<div className={styles.project_container}>
			<div className={styles.title}>
				<span className={styles.between}>
					<h4 className={styles.heading}>Project {number}</h4>
					<Icon classes={'fa-solid fa-pen-to-square'} colors="#FCA320" size={'25px'} />
				</span>

				<Image className={styles.project_img} src={image} alt={image} width={200} height={45} layout="raw" />
			</div>
			<div>
				<h4 className={styles.heading}>Team Members:</h4>
				<div className={styles.grid}>
					{members.map((mbr) => (
						<Member key={mbr.name} name={mbr.name} jobTitle={mbr.jobTitle} imageUrl={mbr.imageUrl} />
					))}
				</div>
			</div>
			<div>
				<h4 className={styles.heading}>Progress:</h4>
				<div>
					<Progress progress={progress} />
				</div>
			</div>
		</div>
	)
}
