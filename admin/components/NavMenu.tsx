"use client"
import styles from '@css/Navigation.module.scss'
import { Icon } from '@iconify/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
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


	const pathname = usePathname()

	if ( !icons ) return <>Nav</>

	return (
		<span className={styles.Menu} >
			{icons.map( ( icon, idx ) => (
				icon.children ? <span key={icon.id} className={styles.SubMenu} >
					<span className={styles.SubInline}>
						<Link key={icon.id} href={icon.to} >
							<span className={styles.Row}>
								<Icon icon={icon.icon} style={{ fontSize: '22px' }} color="#fca320" />
								<span
									className={`${styles.Name} ${pathname === icon.to ? styles.Active : styles.Inactive}`}
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
							<Icon icon={child.icon} style={{ fontSize: '22px' }} color="#fca320" />
							<span
								className={`${styles.Name} ${pathname === child.to ? styles.Active : styles.Inactive}`}
							>
								{child.name}
							</span>
						</Link>
					) )}
				</span> : <Link key={icon.id} href={icon.to} className={styles.Inline}>
					<Icon icon={icon.icon} style={{ fontSize: '22px', color: "#ffca320" }} color="#fca320" />
					<span
						className={`${styles.Name} ${pathname === icon.to ? styles.Active : styles.Inactive}`}
					>
						{icon.name}
					</span>
				</Link>
			) )}
		</span>
	)
}
