import Head from "next/head"
import Hero from "../components/Hero"
import styles from "../styles/Home.module.scss"

const Landing = () =>
{
  return (
    <div className="dark:bg-dark-default">
      <Head>
        <title>Accueil | FasoLara</title>
        <link rel="icon" href="/assets/solar.svg" />
      </Head>

      <Hero />
    </div>
  )
}

export default Landing