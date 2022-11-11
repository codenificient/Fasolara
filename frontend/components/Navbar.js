import { navLinks } from "./navLink"
import styles from '../styles/Navbar.module.scss'
import React from 'react'
import Link from "next/link"

const Navbar = () => {
  return (
    <div className={styles.navLinks}>
      {navLinks.map((nav) => (
        <Link key={nav.id} href={nav.to}>
          <a className={styles.navLink}>{nav.name}</a>
        </Link>
      ))}
    </div>
  )
}

export default Navbar