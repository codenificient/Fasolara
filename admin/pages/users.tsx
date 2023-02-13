import User from "@c/users/User"
import styles from "@cs/users.module.scss"
import client from "lib/client"
import { GET_USERS } from "lib/queries"

import { Grid } from '@chakra-ui/react'

export default function Users( { users } )
{
	return (
		<Grid  templateColumns="repeat(auto-fit, minmax(380px, 1fr));" gap={6} className={styles.UsersWrapper}>
			{
				users.map( ( user, idx ) => <User user={user} index={idx} /> )
			}
		</Grid>
	)
}

export async function getStaticProps()
{
	const user = await client.request( GET_USERS )


	return {
		props: {
			users: user.users,
		},
		revalidate: 60,
	}
}
