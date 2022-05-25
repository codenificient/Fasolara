import React from 'react'
import MessageHeader from './MessageHeader'
import Input from '../UI/Input'
import styles from "../../styles/components/Messages.module.scss"

function Conversations() {
  return (
    <div className={styles.conversations_container}>
        <MessageHeader />
        <span className={styles.searchBox}>
            <Input placeholder="people, groups & messages..." />
            <span className={styles.mdimag}>
                <i class="fa-solid fa-magnifying-glass"></i>
            </span>
        </span>
    </div>
  )
}

export default Conversations