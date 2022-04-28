import styles from '../styles/ActiveProjects.module.css'

export default function ActiveProject({ img = '', date, leader, due, status, featured = false }) {
	return (
		<span>
			{featured ? (
				<span className={styles.project_details}>
					<p className={styles.project_featured}>{img}</p>
					<p className={styles.project_featured}>{date}</p>
					<p className={styles.project_featured}>{leader}</p>
					<p className={styles.project_featured}>{due}</p>
					<p className={styles.project_featured}>{status}</p>
				</span>
			) : (
				<span className={styles.activeproject_container}>
					<span className={styles.project_details}>
						{img ? <img className={styles.project_detail} src={img} alt={img} /> : <p className={styles.project_detail}>Missing Image</p>}
						<p className={styles.project_detail}>{date}</p>
						<p className={styles.project_detail}>{leader}</p>
						<p className={styles.project_detail}>{due}</p>
						<p className={styles.project_detail}>{status}</p>
					</span>
				</span>
			)}
		</span>
	)
}
