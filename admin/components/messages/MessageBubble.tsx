import Moment from 'react-moment'

import styles from '@css/Conversation.module.scss'


const MessageBubble = ( { conversation, userId } ) =>
{
	console.log( conversation )

	return (
		<>
			<div className={styles.messages_container}>
				{
					conversation.messages.map( ( message, idx ) => (
						<div key={idx} className={styles.message}>
							<div className={`${message.senderId == userId ? styles.Outgoing : styles.Incoming}`}>
								<span className={styles.Content}>{message.content}</span>
								<span className={styles.Date}>
									<Moment format="DD MMM YYYY HH:mm">
										{message.date }
									</Moment>
								</span>
							</div>
						</div>
					) )
				}
			</div>
		</>
	)
}

export default MessageBubble
