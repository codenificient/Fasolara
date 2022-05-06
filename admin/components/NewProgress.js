import React from 'react'
import styles from '../styles/components/NewProgress.module.css'

export default function NewProgress({ sqSize, strokeWidth, percentage }) {
	// Size of the enclosing square
	// SVG centers the stroke width on the radius, subtract out so circle fits in square
	const radius = (sqSize - strokeWidth) / 2
	// Enclose cicle in a circumscribing square
	const viewBox = `0 0 ${sqSize} ${sqSize}`
	// Arc length at 100% coverage is the circle circumference
	const dashArray = radius * Math.PI * 2
	// Scale 100% coverage overlay with the actual percent
	const dashOffset = dashArray - dashArray * percentage / 100
	return (
		<div className={styles.progress_container}>
			<svg width={sqSize} height={sqSize} viewBox={viewBox} className={styles.svg}>
				<circle
					className={styles.circle_background}
					cx={sqSize / 2}
					cy={sqSize / 2}
					r={radius}
					strokeWidth={`${strokeWidth}px`}
				/>
				<circle
					className={styles.circle_progress}
					cx={sqSize / 2}
					cy={sqSize / 2}
					r={radius}
					strokeWidth={`${strokeWidth}px`}
					transform={`rotate(-90 ${sqSize / 2} ${sqSize / 2})`}
					style={{
						strokeDasharray: dashArray,
						strokeDashoffset: dashOffset
					}}
				/>
				<circle
					className={styles.outer_circle}
					cx={sqSize / 2}
					cy={sqSize / 2}
					r={radius - 20}
					strokeWidth={`${strokeWidth}px`}
				/>
				<circle
					className={styles.inner_circle}
					cx={sqSize / 2}
					cy={sqSize / 2}
					r={radius - 30}
					strokeWidth={`${strokeWidth}px`}
				/>
				<text className={styles.progress_percent} x="50%" y="50%" dy=".3em" textAnchor="middle">
					{`${percentage}%`}
				</text>
			</svg>
		</div>
	)
}

