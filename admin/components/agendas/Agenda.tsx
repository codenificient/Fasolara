"use client"
import { Box, Flex, Text } from '@chakra-ui/react'
import { Icon } from '@iconify/react'
import Moment from 'react-moment'

import { calendar } from '@c/data/agendas'
import React from 'react'

const agendIcon = {
	"meeting": "simple-icons:gotomeeting",
	"presentation": "carbon:group-presentation",
	"training": "healthicons:i-training-class-negative",
	"appel": "material-symbols:video-call",
	"videoconference": "game-icons:video-conference",
	"voyage": "simple-icons:yourtraveldottv"
}


const Agenda = () =>
{
	return (
		<>
			{
				calendar?.map( ( agenda, idx ) => (
					<Flex marginY={"4"} key={idx}>
						<Icon icon={agendIcon[agenda.name]} color='#fca320' fontSize={"4rem"} cursor="pointer" radius={"50%"} />
						<Box ml='2' flex={4}>
							<Text fontSize='sm'>
								<Moment format="HH:mm">
									{new Date( agenda.start )}
								</Moment>
								{'-'}
								<Moment format="HH:mm">
									{new Date( agenda.end )}
								</Moment>
							</Text>
							<Text fontWeight='bold' fontSize='sm' textTransform={'capitalize'}>{agenda.name} avec {agenda.item}</Text>
							<Text fontSize='xs'>
								Lieu du Meeting: {agenda.location}
							</Text>
						</Box>
					</Flex>
				) )
			}
		</>
	)
}

const MemoAgenda = React.memo( Agenda )
export default MemoAgenda
