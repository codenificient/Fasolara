import React from 'react'
import styles from '../styles/components/Sidebare.module.css'


function Icon({classes, colors, size}) {
	return (
		<span className={styles.icon_wrapper}>
			<i className={classes} style={{ color: colors, fontSize: size}} />
		</span>
	)
}

export default Icon
