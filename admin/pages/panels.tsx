import Panel from "@c/panels/Panel"
import { Grid } from "@chakra-ui/react"
import styles from "@cs/panels.module.scss"
import client from "lib/client"
import { GET_PANELS, GET_USERS } from "lib/queries"

const Panels = ( { panels, users } ) =>
{
	if ( !panels ) return <h2>No panels available</h2>
	if ( !users ) return <h2>No users available</h2>

	// console.log( { users } )

	return (
		<Grid className={styles.PanelGrid} templateColumns="repeat(auto-fit, minmax(380px, 1fr));" gap={6}>
			{
				panels.map( ( panel, idx ) => <Panel key={panel.id} index={idx} panel={panel} user={users[idx] || users[idx % users.length]} /> )
			}
		</Grid>
	)
}

export default Panels

export async function getStaticProps()
{
	const panel = await client.request( GET_PANELS )
	const user = await client.request( GET_USERS )

	return {
		props: {
			panels: panel.panels,
			users: user.users
		},
		revalidate: 60,
	}
}
