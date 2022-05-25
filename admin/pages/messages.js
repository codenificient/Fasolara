import Email from "../components/email/Email"
import Layout from "../components/Layout"
import styles from "../styles/pages/messages.module.css"

function Messages() {
	return (
		<Layout>
			<h1 className={styles.text_center}>Messages coming soon</h1>
			<Email />
		</Layout>
	)
}

export default Messages
