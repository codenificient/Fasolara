import styles from "../styles/components/Footer.module.scss"
import Logo from '../public/assets/laraTwo.png'
import Image from 'next/image'
import { BsFillCircleFill } from "react-icons/bs";
import Link from "next/link"
import React from 'react'

const Footer = () =>
{
	return (
		<div className={styles.FooterWrapper}>
			<Image src={Logo} alt="FasoLara Logo" width={220} height={40} />
			<footer className={styles.Footer}>
				<div className="text-center text-sm text-gray-500 my-4">
					<span className={styles.Copy}>&copy; {new Date().getFullYear()} {" "}
						 FasoLara LLC
						<BsFillCircleFill />
						Tous droits reservés
						<BsFillCircleFill />
						<Link href={"/privacy"}> Politique de Confidentialité</Link>
					</span>
				</div>
			</footer>
			<span className={styles.Socials}>
				<span className={styles.Social}>tw</span>
				<span className={styles.Social}>yt</span>
				<span className={styles.Social}>li</span>
			</span>
		</div>
	)
}

export default Footer
