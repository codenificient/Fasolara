import styles from '@css/Navigation.module.scss'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function NavMenu( { icons } )
{
	const router = useRouter()
	if ( !icons ) return
	return (
		<span className={styles.Center}>
			{icons.map( ( icon ) => (
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
