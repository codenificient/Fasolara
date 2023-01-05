import styles from '@css/MessageHeader.module.scss'
import Avatar from '../UI/Avatar'

function ConversationHeader( { conversation  } )
{
	return (
		<div className={styles.header_container}>
			<div className={styles.profile}>
				<Avatar image={conversation.participants[0].avatar} wSize="50" iSize="40" />
				<span className={styles.UserInfo}>
					<h2 className={styles.UserName}>{conversation.participants[0].name}</h2>
					<span className={styles.StatusContainer}>
						<span className={`${conversation.participants[0].connect == "online" ? styles.Online : styles.Status}`} />
						<span className={styles.UserStatus}>{conversation.participants[0].connect == "online" ? " En ligne" : " Hors ligne"}</span>
					</span>
				</span>
			</div>
		</div>
	)
}

export default ConversationHeader
