import styles from '../styles/components/Charts.module.scss'

export default function Chart({number }) {
	return (
		<span className={styles.chart_container}>
			<div className={styles.title}>Chart {number}</div>		
		</span>
	)
}
