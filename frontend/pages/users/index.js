import UserList from "../../components/UserList"
import styles from "../../styles/Home.module.scss"

export default function Users() {
  return (
    <div className={styles.container}>
      <UserList />
    </div>
  )
}
