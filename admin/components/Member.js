import React from 'react'
import styles from '../styles/Projects.module.css'
import Avatar from './Avatar'

function Member({name, jobTitle, imageUrl}) {
	console.log({ name })
	return (
		<div className={styles.teammate}>
			<Avatar className={styles.avatar_img} image={imageUrl} iSize="50" wSize="65" />
			<h4 className={styles.name}>{name}</h4>
			<p className={styles.jobTitle}>{jobTitle}</p>
		</div>
	)
}

export default Member
