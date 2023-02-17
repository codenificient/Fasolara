"use client"
import { useQuery } from "@apollo/client"
import Panel from "@c/panels/Panel"
import { Grid } from "@chakra-ui/react"
import styles from "@cs/panels.module.scss"
import client from "lib/client"
import { GET_PANELS, GET_USERS } from "lib/queries"

const Panels = ( ) =>
{
	const { data: panel } = useQuery( GET_PANELS )
	const { data: user } = useQuery( GET_USERS )

	if ( !panel ) return <h2>No panels available</h2>
	if ( !user ) return <h2>No users available</h2>

	// console.log( { users } )

	return (
		<Grid className={styles.PanelGrid} templateColumns="repeat(auto-fit, minmax(380px, 1fr));" gap={6}>
			{
				panel?.panels.map( ( panel, idx ) => <Panel key={panel.id} index={idx} panel={panel} user={user?.users[idx] || user?.users[idx % user?.users.length]} /> )
			}
		</Grid>
	)
}

export default Panels
