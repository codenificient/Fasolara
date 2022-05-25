import Layout from '../components/Layout'
import Conversations from '../components/messages/Conversations'
import MessageContent from '../components/messages/MessageContent'
import styles from '../styles/pages/messages.module.css'

function Messages() {
	return (
		<Layout>
			<span className={styles.messages_wrapper}>
				<Conversations />
				<MessageContent />
			</span>
		</Layout>
	)
}

export default Messages
