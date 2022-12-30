import Conversations from '@msg/Conversations'
import MessageContent from '@msg/MessageContent'
import styles from '@cs/messages.module.scss'

function Messages() {
	return (
			<span className={styles.messages_wrapper}>
				<Conversations />
				<MessageContent />
			</span>
	)
}

export default Messages
