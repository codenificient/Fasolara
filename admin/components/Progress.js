import React from 'react'
import styles from '../styles/Progress.module.css'

function Progress({ progress }) {
	return (
		<div className={styles.progress_container}>
			<div className={styles.ellipse}>
				<div className={styles. outer_circle}>
					<div className={styles.inner_circle}>
						<h5 className={styles.progress_percent}>{progress}%</h5>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Progress
