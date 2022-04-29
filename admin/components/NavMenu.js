import Link from 'next/link'
import React from 'react'

function NavMenu({ icon }) {
	<Link to={icon.to}>
		<li key={icon.id}>
			<i class={icon.icon} />
			<p>{icon.name}</p>
		</li>
	</Link>
}

export default NavMenu
