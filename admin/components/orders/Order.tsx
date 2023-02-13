import { Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Heading, Image, Stack, Text } from "@chakra-ui/react"
import styles from "@css/Order.module.scss"
import { IOrderProps } from "lib/types"
import React from "react"

const Order: React.FC<IOrderProps> = ( { index, order: { orderDate, userId, quantity, currency, purchaseCost, status, id, title, description } } ) => (
	<Card maxW='sm' className={styles.OrderWrapper}>
		<CardBody >
			<Image
				src='https://images.pexels.com/photos/4320475/pexels-photo-4320475.jpeg'
				alt='Photo by Kelly from Pexels'
				borderRadius='lg'
			/>
			<Stack mt='6' spacing='3'>
				<Heading size='md'>{`${title || "Item"} ordered on ${orderDate}`}</Heading>
				<Text>
					{description}
				</Text>
				<Text color='blue.600' fontSize='2xl'>
					{currency}{purchaseCost}
				</Text>
			</Stack>
		</CardBody>
		<Divider />
		<CardFooter>
			<ButtonGroup spacing='2'>
				<Button variant='solid' colorScheme='orange'>
					View
				</Button>
				<Button variant='ghost' colorScheme='yellow'>
					Edit
				</Button>
			</ButtonGroup>
		</CardFooter>
	</Card>
)

export default Order
