"use client"
import { useQuery } from '@apollo/client'
import styles2 from '@css/Conversation.module.scss'
import styles from '@css/Messages.module.scss'
import Header from '@msg/ConversationHeader'
import ConversationItem from '@msg/ConversationItem'
import InputContainer from '@msg/InputContainer'
import MessageBubble from '@msg/MessageBubble'
import MessageHeader from '@msg/MessageHeader'
import { GET_CONVERSATIONS } from 'lib/queries'
import { Message } from 'lib/types'

import { Icon } from '@iconify/react'
import { useState } from 'react'

function Messages()
{
	const [conversation, setConversation] = useState<Message | null>()
	const [currentMsg, setCurrentMsg] = useState<number | null>()

	const { data: message } = useQuery( GET_CONVERSATIONS )

	if ( !message ) return <>No conversations</>

	return (
		<div className={styles.messages_wrapper}>
			<div className={styles.conversations_container}>
				<MessageHeader />
				<span className={styles.searchBox}>
					<input placeholder="people, groups & messages..." />
					<span className={styles.SearchIcon}>
						<Icon icon="mdi:search" />
					</span>
				</span>
				<h4 className={styles.title}>Contacts</h4>

				{!message.conversations && <h4>Start a conversation</h4>}

				<div className={styles.conversations_list}>{message.conversations.map( ( convo, idx ) =>
					<div key={convo.id}
						className={`${styles.conversation_container} ${idx == currentMsg ? styles.ActiveConversation : null}`}
						onClick={() =>
						{
							setConversation( convo as Message )
							setCurrentMsg( idx )
						}}>
						<ConversationItem convo={convo} />
					</div> )}</div>
			</div>

			<div className={styles.content_container}>
				{
					conversation ? ( <div className={styles2.conversations_wrapper}>
						<div className={styles2.correspondant_wrapper}>
							<Header conversation={conversation} />
						</div>
						<MessageBubble conversation={conversation} userId="6368a4c20473019f5c923094" />
						<InputContainer />
					</div> ) : ( <p className={styles.NoConvo}>No Conversation Selected</p> )
				}
			</div>
		</div>
	)
}

export default Messages
