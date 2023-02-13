import human from 'human-time'

import styles from '@css/Messages.module.scss'
import Avatar from '@ui/Avatar'
import { shorten } from 'utils/helpers'


const ConversationItem = ( { convo } ) =>
{
	return (
		<>
			<div className={styles.message}>
				<Avatar image={convo.participants[0].avatar} wSize="43" iSize={35} />
				<span className={styles.MessageInfo}>
					<span className={styles.NameTime}>
						<span className={styles.UserName}>{convo.participants[0].name}</span>
						<span className={styles.Time}>{human( new Date( convo.messages[convo.messages.length - 1].date ) )}</span>
					</span>
					<span className={styles.StatusContainer}>
						<span className={styles.content}>{shorten( convo.messages[0].content, 70 )}</span>
					</span>
				</span>
			</div>
		</>
	)
}

export default ConversationItem
