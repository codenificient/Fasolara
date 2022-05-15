import React from 'react'
import styles from '../styles/components/design.module.css'

export default function Icon({ classes, colors, size }) {
	return (
		<span className={styles.icon_wrapper}>
			<i
				className={classes}
				style={{ color: colors, fontSize: size }}
				onmouseover="this.style.color='red'"
				onmouseout="this.style.color='blue'"
			/>
		</span>
	)
}
