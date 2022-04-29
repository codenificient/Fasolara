import React from 'react'
import NavMenu from './NavMenu'

const icons = [
	{
		id: '03-893-7839',
		icon: 'fas fa-home',
		name: 'acceuil',
		to: '/'
	},
	{
		id: '67-992-7236',
		icon: 'fas fa-wallet',
		name: 'accounts',
		to: '/accounts'
	},
	{
		id: '47-035-2825',
		icon: 'fas fa-university',
		name: 'banks',
		to: '/banks'
	},
	{
		id: '16-257-3030',
		icon: 'fas fa-users',
		name: 'partners',
		to: '/partners'
	},
	{
		id: '10-996-6197',
		icon: 'fas fa-people-carry',
		name: 'projects',
		to: '/projects'
	},
	{
		id: '57-567-1628',
		icon: 'fas fa-solar-panel',
		name: 'teams',
		to: '/teams'
	},
	{
		id: '09-078-9247',
		icon: 'fas fa-sitemap',
		name: 'reports',
		to: '/reports'
	},
	{
		id: '16-324-5166',
		icon: 'fas fa-user-friends',
		name: 'users',
		to: '/users'
	},
	{
		id: '55-761-8498',
		icon: 'fas fa-cog',
		name: 'settings',
		to: '/settings'
	}
]

function Navigation() {
	return icons.map((icon) => <NavMenu key={icon.id} icon={icon} />)
}

export default Navigation
