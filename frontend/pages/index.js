import ProvincesList from "../components/ProvincesList"
import styles from "../styles/Home.module.scss"

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Bienvenu a <a href="https://fasolara.com">FasoLara</a>
      </h1>

      <ProvincesList />
    </div>
  )
}
