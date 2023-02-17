"use client"
import User from "@c/users/User"
import styles from "@cs/users.module.scss"

import { useQuery } from "@apollo/client"
import { Grid } from '@chakra-ui/react'
import { GET_USERS } from "lib/queries"

export default function Users()
{
	const { data: user } = useQuery( GET_USERS )
	if ( !user ) return <>No users</>

	return (
		<Grid templateColumns="repeat(auto-fit, minmax(380px, 1fr));" gap={6} className={styles.UsersWrapper}>
			{
				user?.users.map( ( user, idx ) => <User key={user.id} user={user} index={idx} /> )
			}
		</Grid>
	)
}
