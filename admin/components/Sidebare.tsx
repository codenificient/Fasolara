import Activities from './activities/Activities'
import Agenda from './agendas/Agendas'
import ProfileMenu from './ProfileMenu'
import styles from '@css/Sidebare.module.scss'
import React from 'react'

const Sidebare= () => {
	return (
		<div className={styles.sidebare_container}>
            <ProfileMenu />
            <Activities />
            <Agenda />
		</div>
	)
}

export const MemoizedSidebare = React.memo( Sidebare )
