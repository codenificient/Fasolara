"use client"
import styles from '@css/Navigation.module.scss'
import Link from 'next/link'
import { useState } from 'react'
import { FaChevronCircleDown, FaChevronCircleRight } from 'react-icons/fa'

export default function NavMenu( { icons } )
{
	const [allValues, setAllValues] = useState( {
		locations: false,
		orders: false,
		panels: false,
		projects: false,
		transactions: false,
		users: false,
	} )

	const changeHandler = ( name, value ) =>
	{
		setAllValues( prevValues =>
		{
			return { ...prevValues, [name]: value }
		} )
	}

	// const router = useRouter()
	let router = {
		pathname: ""
	}

	if ( !icons ) return
	return (
		<span className={styles.Menu} >
			{icons.map( ( icon, idx ) => (
				icon.children ? <span key={icon.id} className={styles.SubMenu} >
					<span className={styles.SubInline}>
						<Link key={icon.id} href={icon.to} >
							<span>
								<i className={`Icon ${icon.icon}`} style={{ fontSize: '22px' }} />
								<span
									className={`${styles.Name} ${router.pathname == icon.to ? styles.Active : styles.inactive}`}
								>
									{icon.name}
								</span>
							</span>
						</Link>
						{
							allValues[icon.name] ? <FaChevronCircleDown onClick={() => changeHandler( icon.name, false )} style={{ fontSize: '22px', fill: "#fca320" }} /> : <FaChevronCircleRight onClick={() => changeHandler( icon.name, true )} style={{ fontSize: '22px', }} />
						}
					</span>

					{allValues[icon.name] && icon.children.map( child => (
						<Link key={child.id} href={child.to} className={`${styles.SubChildren} ${allValues[icon.name] ? "Shown" : "Hidden"}`}>
							<i className={`Icon ${child.icon}`} style={{ fontSize: '22px' }} />
							<span
								className={`${styles.Name} ${router.pathname == child.to ? styles.Active : styles.inactive}`}
							>
								{child.name}
							</span>
						</Link>
					) )}
				</span> : <Link key={icon.id} href={icon.to} className={styles.Inline}>
					<i className={`Icon ${icon.icon}`} style={{ fontSize: '22px' }} />
					<span
						className={`${styles.Name} ${router.pathname == icon.to ? styles.Active : styles.inactive}`}
					>
						{icon.name}
					</span>
				</Link>
			) )}
		</span>
	)
}
