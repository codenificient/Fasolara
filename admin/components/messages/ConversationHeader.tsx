import styles from '@css/MessageHeader.module.scss'
import Avatar from '../UI/Avatar'

function ConversationHeader( { name, connect, avatar } )
{
	return (
		<div className={styles.header_container}>
			<div className={styles.profile}>
				<Avatar image={avatar} wSize="50" iSize="40" />
				<span className={styles.UserInfo}>
					<h2 className={styles.UserName}>{name}</h2>
					<span className={styles.StatusContainer}>
						<span className={`${connect == "en ligne" ? styles.Online : styles.Status}`} />
						<span className={styles.UserStatus}>{connect == "en ligne" ? " En ligne" : " Hors ligne"}</span>
					</span>
				</span>
			</div>
		</div>
	)
}

export default ConversationHeader
