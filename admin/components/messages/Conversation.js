import React from 'react'
import styles from '../../styles/components/Messages.module.scss'
import { formatDate, shorten } from '../../utils/helpers'
import Avatar from '../Avatar'

function Conversation({ conversation }) {
	return (
		<div className={styles.conversation_container}>
			<div className={styles.message}>
				<Avatar image={conversation.avatar} wSize="43" iSize="35" />
				<span className={styles.MessageInfo}>
					<span className={styles.NameTime}>
						<span className={styles.UserName}>{conversation.user}</span>
						<span className={styles.Time}>{formatDate(conversation.date)}</span>
					</span>
					<span className={styles.StatusContainer}>
						<span lassName={styles.content}>{shorten(conversation.message, 80)}</span>
					</span>
				</span>
			</div>
		</div>
	)
}

export default Conversation
