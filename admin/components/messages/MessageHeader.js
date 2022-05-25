import React from 'react'
import styles from '../../styles/components/Messages.module.scss'
import Avatar from '../Avatar'

function MessageHeader() {
	return (
		<div className={styles.header_container}>
			<div className={styles.profile}>
				<Avatar image={'/assets/admin.png'} wSize="50" iSize="40" />
				<span className={styles.UserInfo}>
					<span className={styles.UserName}>Christian Tioye</span>
					<span className={styles.StatusContainer}>
						<span className={styles.Status} />
						<span lassName={styles.UserStatus}>Connecté</span>
					</span>
				</span>
			</div>
			<div className={styles.Settings}>
				<i class="fa-solid fa-gear" />
			</div>
		</div>
	)
}

export default MessageHeader
