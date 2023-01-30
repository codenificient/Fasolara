import Image from 'next/image'
import Link from 'next/link'
import { FaUserCircle } from 'react-icons/fa'
import Logo from '../public/assets/laraTwo.png'
import styles from "../styles/components/Header.module.scss"
import NavMenu from './NavMenu'

const Header = (): JSX.Element =>
{
	return (
		<div className={`${styles.headerWrapper} max-w-screen-3xl`}>
			<Link href={"/"}>
				<Image src={Logo} alt="FasoLara Logo" width={150} height={30} />
			</Link>
			<NavMenu />
			<button className={styles.loginBtn}>
				<FaUserCircle />
				Se Connecter</button>
		</div>
	)
}

export default Header
