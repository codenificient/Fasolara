"use client"
import User from "@c/users/User"
import styles from "@cs/users.module.scss"
import { notFound } from 'next/navigation'

import { Grid } from '@chakra-ui/react'

export default function Users( { users } )
{
	if ( !users ) return <>No users</>

	return (
		<Grid templateColumns="repeat(auto-fit, minmax(380px, 1fr));" gap={6} className={styles.UsersWrapper}>
			{
				users.map( ( user, idx ) => <User user={user} index={idx} /> )
			}
		</Grid>
	)
}

