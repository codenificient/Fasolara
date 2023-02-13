import styles from '@css/MessageHeader.module.scss'
import Avatar from '../UI/Avatar'

function MessageHeader()
{
	return (
		<div className={styles.header_container}>
			<div className={styles.profile}>
				<Avatar image={'/assets/admin.png'} wSize="50" iSize={40} />
				<span className={styles.UserInfo}>
					<span className={styles.UserName}>Christian Tioye</span>
					<span className={styles.StatusContainer}>
						<span className={styles.Online} />
						<span className={styles.UserStatus}>Connecté</span>
					</span>
				</span>
			</div>
			<div className={styles.Settings}>
				<i className="fa-solid fa-gear" />
			</div>
		</div>
	)
}

export default MessageHeader
