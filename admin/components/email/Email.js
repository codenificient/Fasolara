import React from 'react'
import Menu from './Menu'
import styles from '../../styles/components/EmailMenu.module.scss'
import EmailContent from './Content'

function Email() {
	return (
		<div className={styles.email_container}>
			<Menu />
            <EmailContent />
		</div>
	)
}

export default Email
