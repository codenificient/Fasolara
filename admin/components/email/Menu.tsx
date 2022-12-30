import styles from '@css/EmailMenu.module.scss'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { menus } from '../data/emailNav'

const Menu = () =>
{
	const router = useRouter()
	return (
		<span className={styles.menu_container}>
			{menus.map( ( icon ) => (
				<div className={styles.MenuItem}>
					<Link key={icon.id} href={icon.to} passHref>
						<a className={styles.Inline}>
							<i className={`Icon ${icon.icon}`} style={{ fontSize: '22px' }} />
							<span
								className={`${styles.Name} ${router.pathname == icon.to ? styles.Active : styles.inactive}`}
							>
								{icon.name}
							</span>
						</a>
					</Link>
				</div>
			) )}
		</span>
	)
}

export default Menu
