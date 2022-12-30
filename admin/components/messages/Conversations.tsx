import React from 'react'
import styles from '../../styles/components/Messages.module.scss'
import { messages } from '../data/messageList'
import Input from '../UI/Input'
import ConversationList from './ConversationList'
import MessageHeader from './MessageHeader'

function Conversations() {
	return (
		<div className={styles.conversations_container}>
			<MessageHeader />
			<span className={styles.searchBox}>
				<Input placeholder="people, groups & messages..." />
				<span className={styles.mdimag}>
					<i className="fa-solid fa-magnifying-glass" />
				</span>
			</span>
			<h4 className={styles.title}>Contacts</h4>
			<ConversationList conversations={messages} />
		</div>
	)
}

export default Conversations
