import React from 'react'
import styles from '../styles/Sidebare.module.css'

function Avatar({ image }) {
	return (
		<span className={styles.avatar_container}>
			<img className={styles.avatar} src={image} alt={`image of ${image}`} />
		</span>
	)
}

export default Avatar
