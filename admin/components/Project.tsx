import Image from 'next/image'
import styles from '@css/Projects.module.scss'
import Icon from './Icon'
import Member from './Member'
import NewProgress from './NewProgress'

export default function Project({ number, members, image, progress }) {
	return (
		<div className={styles.project_container}>
			<div className={styles.title}>
				<span className={styles.between}>
					<h4 className={styles.heading}>Project {number}</h4>
					<Icon classes={'fa-solid fa-pen-to-square'} colors="#FCA320" size={'23px'} />
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
					{/* <Progress progress={progress} /> */}
					<NewProgress percentage={progress} sqSize="125" strokeWidth="11" />
				</div>
			</div>
		</div>
	)
}
