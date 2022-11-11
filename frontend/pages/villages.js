import React from 'react'
import VillageList from '../components/VillageList'

import Head from "next/head"
// import UserList from "../components/UserList"
import styles from "../styles/Home.module.scss"

export default function Villages() {
  return (
    <div className={styles.container}>
      <Head>
        <title>FasoLara | Accueil</title>{" "}
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/solar.svg" />
      </Head>
      <main className={styles.main}>
        <VillageList />
      </main>
    </div>
  )
}
