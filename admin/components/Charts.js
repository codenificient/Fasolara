import styles from '../styles/Charts.module.css'
import Chart from './Chart'

export default function Charts() {
	return (
		<div className={styles.charts_container}>
            <div className={styles.grid}>
                <Chart number={'1'} />
                <Chart  number={'2'} />
                <Chart  number={'3'} />
            </div>
		</div>
	)
}
