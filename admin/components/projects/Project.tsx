import Image from "next/image";

import styles from '@css/Projects.module.scss'
import Member from '../Member'
import NewProgress from '../NewProgress'
import Icon from '@ui/Icon'

export default function Project( { number, members, image, progress } )
{
	return (
        <div className={styles.project_container}>
			<div className={styles.title}>
				<span className={styles.between}>
					<h4 className={styles.heading}>Projet {number}</h4>
					<Icon classes={'fa-solid fa-pen-to-square'} colors="#FCA320" size={'23px'} />
				</span>

				<Image
                    className={styles.project_img}
                    src={image}
                    alt={image}
                    width={200}
                    height={45} />
			</div>
			<div>
				<h4 className={styles.heading}>Membres d'équipe:</h4>
				<div className={styles.grid}>
					{members.map( ( mbr ) => (
						<Member key={mbr.name} name={mbr.name} jobTitle={mbr.jobTitle} imageUrl={mbr.imageUrl} />
					) )}
				</div>
			</div>
			<div>
				<h4 className={styles.heading}>Progrès:</h4>
				<div>
					<NewProgress percentage={progress} sqSize="125" strokeWidth="11" />
				</div>
			</div>
		</div>
    );
}
