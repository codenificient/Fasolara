import Image from 'next/image'
import Link from "next/link"
import { BsFillCircleFill } from "react-icons/bs"
import Logo from '../public/assets/laraTwo.png'
import styles from "../styles/components/Footer.module.scss"

const Footer = (): JSX.Element =>
{
	return (
		<div className={`${styles.FooterWrapper} max-w-screen-3xl`}>
			<footer className={styles.Footer}>
				<Image src={Logo} alt="FasoLara Logo" width={220} height={40} />
				<div className="text-center text-sm text-gray-500 my-4">
					<span className={styles.Copy}>&copy; {new Date().getFullYear()} {" "}
						FasoLara LLC
						<BsFillCircleFill />
						Tous droits reservés
						<BsFillCircleFill />
						<Link href={"/privacy"}> Politique de Confidentialité</Link>
					</span>
				</div>
				<span className={styles.Socials}>
					<span className={styles.Social}>tw</span>
					<span className={styles.Social}>yt</span>
					<span className={styles.Social}>li</span>
				</span>
			</footer>

		</div>
	)
}

export default Footer
