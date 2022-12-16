import Head from "next/head"
import Description from "../components/Description"
import Hero from "../components/Hero"
import Process from "../components/Process"
import styles from "../styles/Home.module.scss"

const Landing = () =>
{
  return (
    <div className={`${styles.homeWrapper} dark:bg-dark-default`}>
      <Head>
        <title>Accueil | FasoLara</title>
        <link rel="icon" href="/assets/solar.svg" />
      </Head>

      <Hero />
      <Description />
      <Process />
    </div>
  )
}

export default Landing