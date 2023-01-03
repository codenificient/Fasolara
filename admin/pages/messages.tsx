import styles2 from '@css/Conversation.module.scss'
import styles from '@css/Messages.module.scss'
import { conversations } from '@data/chatList'
import Header from '@msg/ConversationHeader'
import MessageHeader from '@msg/MessageHeader'
import Avatar from '@ui/Avatar'
import Input from '@ui/Input'
import human from 'human-time'
import { useState } from 'react'
import { shorten } from 'utils/helpers'


interface Message
{
	id: string
	name: string
	avatr: string
	phone: string
	connect: string
	status?: string
	date: string
	messages: [{
		i: string
		r: string
		o: string
		s: string
	}]
}


type Convo = {
	conversation?: Message
}

function Messages()
{
	const [conversation, setConversation] = useState<Message | null>()

	return (
		<div className={styles.messages_wrapper}>
			<div className={styles.conversations_container}>
				<MessageHeader />
				<span className={styles.searchBox}>
					<Input placeholder="people, groups & messages..." />
					<span className={styles.mdimag}>
						<i className="fa-solid fa-magnifying-glass" />
					</span>
				</span>
				<h4 className={styles.title}>Contacts</h4>

				{!conversations && <h4>No conversations</h4>}

				<div className={styles.conversations_list}>{conversations.map( ( convo ) => <div key={convo.id} className={styles.conversation_container} onClick={() =>
				{
					setConversation( convo )
				}}>
					<div className={styles.message}>
						<Avatar image={convo.avatr} wSize="43" iSize="35" />
						<span className={styles.MessageInfo}>
							<span className={styles.NameTime}>
								<span className={styles.UserName}>{convo.name}</span>
								<span className={styles.Time}>{human( new Date( convo.date ) )}</span>
							</span>
							<span className={styles.StatusContainer}>
								<span className={styles.content}>{shorten( convo.messages[0].r, 70 )}</span>
							</span>
						</span>
					</div>
				</div> )}</div>
			</div>

			<div className={styles.content_container}>
				{
					conversation ? ( <div className={styles2.conversation_wrapper}>
						<Header avatar={conversation.avatr} name={conversation.name} connect={conversation.connect} />
						{
							conversation.messages.map( ( message, idx ) => (
								<div className={styles2.messages}>
									<div className={styles2.Incoming}>
										<span className={styles2.Date}>{message.i}</span><span className={styles2.Content}>{message.r}</span>
									</div>
									<div className={styles2.Outgoing}>
										<span className={styles2.Date}>{message.o}</span><span className={styles2.Content}>{message.s}</span>

									</div>
								</div>
							) )
						}
					</div> ) : ( <p className={styles.NoConvo}>No Conversation Selected</p> )
				}
			</div>
		</div>
	)
}

export default Messages
