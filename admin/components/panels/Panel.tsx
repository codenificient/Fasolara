import { Avatar, Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, IconButton, Image, Text } from "@chakra-ui/react"
import styles from "@css/Panel.module.scss"
import { IPanelProps } from "lib/types"
import { BiChat, BiDetail, BiEdit } from "react-icons/bi"
import { BsThreeDotsVertical } from "react-icons/bs"

const Panel: React.FC<IPanelProps> = ( { index, panel: { serialNumber, installCost, orderId, groupId, isActive, isInstalled, isReplacement, ratedCapacity, maintenanceDates, createdAt, updatedAt }, user } ) => (
	<Card maxW='md' className={styles.PanelWrapper}>
		<CardHeader className={styles.CardHeader}>
			<Flex >
				<Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
					<Avatar name={user?.username} src={user?.avatar}/>

					<Box>
						<Heading size='sm'>{user?.fullName}</Heading>
						<Text casing="capitalize">{user?.role}, FasoLara</Text>
					</Box>
				</Flex>
				<IconButton
					variant='ghost'
					colorScheme='272727'
					aria-label='See menu'
					icon={<BsThreeDotsVertical />}
				/>
			</Flex>
		</CardHeader>
		<CardBody>
			<Text>
				{`Serial #: ${serialNumber} Order ID ${orderId}`} <br />
				{`${isInstalled ? "Installed" : "Not installed"} - installed Cost: ${installCost} - `} <br />
				{`${isActive ? "Active" : "Inactive"} - Group ID ${groupId}`}
			</Text>
		</CardBody>
		<Image
			objectFit='cover'
			src='https://images.pexels.com/photos/8853509/pexels-photo-8853509.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
			alt='Solar Panel'
		/>

		<CardFooter
			justify='space-around'
			flexWrap='wrap'
			sx={{
				'& > button': {
					minW: '100px',
					color: '#aaa'
				},
			}}
		>
			<Button flex='1' variant='ghost' leftIcon={<BiDetail />}>
				View
			</Button>
			<Button flex='1' variant='ghost' leftIcon={<BiChat />}>
				Comment
			</Button>
			<Button flex='1' variant='ghost' leftIcon={<BiEdit />}>
				Edit
			</Button>
		</CardFooter>
	</Card>
)

export default Panel