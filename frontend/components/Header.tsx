import Image from 'next/image'
import React from 'react'
import styles from "../styles/components/Header.module.scss"
import NavMenu from './NavMenu'
import Logo from '../public/assets/laraTwo.png'
import { FaUserCircle } from 'react-icons/fa' 

const Header = () => {
  return (
	  <div className={styles.headerWrapper}>
		  <Image src={Logo} alt="FasoLara Logo" width={150} height={30} />
		  <NavMenu />
		  <button className={styles.loginBtn}>
			  <FaUserCircle />
			  Se Connecter</button>
	</div>
  )
}

export default Header