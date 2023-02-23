"use client"
import { Grid, Skeleton } from "@chakra-ui/react"
import styles from "@cs/orders.module.scss"
import styles2 from "@css/Order.module.scss"


function Loading()
{

	return (
		<Grid className={styles.GridWrapper} templateColumns="repeat(auto-fit, minmax(380px, 1fr));" gap={6}>
			<Skeleton className={styles2.OrderWrapper}>

			</Skeleton>
		</Grid>
	)
}

export default Loading
