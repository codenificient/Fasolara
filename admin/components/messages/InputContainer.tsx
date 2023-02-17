import styles from '@css/Conversation.module.scss'

import React from 'react'
import { Icon } from '@iconify/react'

const InputContainer = () => {
  return (
	  <>
		  <div className={styles.input_container}>
			  <span className={styles.Attach}>
				  <Icon icon="ri:attachment-2" />
			  </span>
			  <input type="text" placeholder='Enter message..' />
			  <button type="submit" className={styles.Button2}>Send
				  <Icon icon="fa:send" />
			  </button>
		  </div>
	</>
  )
}

export default InputContainer
