"use client"
import { useState } from 'react'

import Visitor from '@c/Visitor'
import Charts from '@chart/Charts'
import styles from '@cs/Home.module.scss'
import ActiveProjects from '@proj/ActiveProjects'
import Projects from '@proj/Projects'

export default function LandingPage()
{
	const [notify, setNotify] = useState( true )
	return (
		<div className={styles.inn_wrapper}>
			<Projects />
			<Charts />
			<ActiveProjects />
			<Visitor />
		</div>
	)
}
