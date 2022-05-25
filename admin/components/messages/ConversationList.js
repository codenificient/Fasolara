import React from 'react'
import Conversation from './Conversation'
import styles from '../../styles/components/Messages.module.scss'

function ConversationList({ conversations }) {
	if (!conversations) return <h3>No conversations</h3>
	return <div className={styles.conversations_list}>{conversations.map((convo) => <Conversation conversation={convo} />)}</div>
}

export default ConversationList
