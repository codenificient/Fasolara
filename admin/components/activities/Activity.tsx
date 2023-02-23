import { Box, Flex, Text } from '@chakra-ui/react'
import { Icon } from '@iconify/react'
import human from "human-time"

import { recents } from "@data/activities"
import Avatar from '@ui/Avatar'
import Link from 'next/link'
import React from 'react'


const Activity = () =>
{
	return (
		<>
			{
				recents?.map( ( activity, idx ) => (
					<Flex marginY={"3"} key={idx}>
						<Avatar image={activity.avatar} wSize="55" iSize={44} />
						<Box ml='2' flex={4}>
							<Text fontWeight='bold' fontSize='sm'>
								{activity.name}
							</Text>
							<Text fontSize='sm' textTransform={'capitalize'}>{activity.type}: {activity.item}</Text>
							<Text fontSize='xs'>
								{human( new Date( activity.timestamp ) )}
							</Text>
						</Box>
						<Link href={`/activity/${activity.item}`}>
							<Icon icon="mdi:chevron-right-circle" color='#fca320' fontSize={"1.5rem"} cursor="pointer" />
						</Link>
					</Flex>
				) )
			}
		</>
	)
}

const MemoActivity = React.memo(Activity)
export default MemoActivity

