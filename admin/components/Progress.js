import React from 'react'
import styles from '../styles/Progress.module.css'


function Progress({ progress }) {
	return (
		<div className={styles.progress_container}>
			<div className={styles.outer_circle}>
				<div className={styles.inner_circle}>
					<h3 className={styles.progress_percent}>{progress}%</h3>
				</div>
			</div>
			<div className={styles.ellipse} id="circle">
          
            </div>
		</div>
	)
}

export default Progress
