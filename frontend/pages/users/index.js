import Head from "next/head"
import UserList from "../../components/UserList"
import styles from "../../styles/Home.module.scss"

export default function Users() {
  return (
    <div className={styles.container}>
      <Head>
        <title>FasoLara | Accueil</title>{" "}
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/solar.svg" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Bienvenu a <a href="https://fasolara.com">FasoLara</a>
        </h1>
        <UserList />
      </main>
    </div>
  )
}
