import React from 'react'
import styles from '../styles/Avatar.module.css'

function Avatar({ image, wSize, iSize }) {
	return (
		<span className={styles.avatar_container} style={{ width: wSize + 'px', height: wSize + 'px' }}>
			<img
				className={styles.avatar}
				src={image}
				alt={`image of ${image}`}
				style={{ width: iSize + 'px', height: iSize + 'px' }}
			/>
		</span>
	)
}

export default Avatar
