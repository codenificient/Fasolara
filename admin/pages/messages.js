import Conversations from '../components/messages/Conversations'
import MessageContent from '../components/messages/MessageContent'
import styles from '../styles/pages/messages.module.scss'

function Messages() {
	return (
			<span className={styles.messages_wrapper}>
				<Conversations />
				<MessageContent />
			</span>
	)
}

export default Messages
