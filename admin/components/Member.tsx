import styles from '@css/Projects.module.scss'
import React from 'react'
import Avatar from './UI/Avatar'
import type {NextPage} from "next"

interface Props
{
	name: string
	jobTitle: string
	imageUrl: string
}

const Member: NextPage<Props> = ( { name, jobTitle, imageUrl } ) =>
{
	// console.log({ name })
	return (
		<div className={styles.teammate}>
			<Avatar image={imageUrl} iSize={50} wSize="65" />
			<h5 className={styles.name}>{name}</h5>
			<p className={styles.jobTitle}>{jobTitle}</p>
		</div>
	)
}

export default Member
