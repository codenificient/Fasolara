import styles from '@css/Conversation.module.scss'

import React from 'react'

const InputContainer = () => {
  return (
	  <>
		  <div className={styles.input_container}>
			  <span className={styles.Attach}>
				  <i className="icon ion-md-attach"></i>
			  </span>
			  <input type="text" placeholder='Enter message..' />
			  <button type="submit" className={styles.Button2}>Send
				  <i className="icon ion-md-send"></i>

			  </button>
		  </div>
	</>
  )
}

export default InputContainer
