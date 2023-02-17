"use client"
import Order from "@c/orders/Order"
import styles from "@cs/orders.module.scss"

import { Grid } from "@chakra-ui/react"
import client from "lib/client"
import { GET_ORDERS } from "lib/queries"
import { useQuery } from "@apollo/client"

function Orders( )
{
	const {data: order} = useQuery(GET_ORDERS)
	if ( !order ) return <h2>No orders available</h2>
	// console.log( { orders } )

	return (
		<Grid className={styles.GridWrapper} templateColumns="repeat(auto-fit, minmax(380px, 1fr));" gap={6}>
			{
				order?.orders.map( ( order, idx ) => <Order key={order.id} order={order} index={idx} /> )
			}
		</Grid>
	)
}

export default Orders
