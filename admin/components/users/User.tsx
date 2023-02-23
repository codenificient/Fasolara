import
{
	Avatar, Badge, Box, Button, Center, Heading, Stack, Text, useColorModeValue
} from '@chakra-ui/react'
import React from 'react'

import styles from "@cs/users.module.scss"
import { IUserProps } from 'lib/types'

const User: React.FC<IUserProps> = ( { index, user: { fullName, avatar, dob, role, username } } ) =>
{
	return (
		<Center py={6} >
			<Box
				maxW={'380px'}
				w={'full'}
				className={styles.SingleUser}
				boxShadow={'2xl'}
				rounded={'lg'}
				p={6}
				textAlign={'center'}>
				<Avatar
					size={'xl'}
					src={
						avatar || `https://randomuser.me/api/portraits/women/${65 + index}.jpg`
					}
					mb={4}
					pos={'relative'}
					_after={{
						content: '""',
						w: 4,
						h: 4,
						bg: 'green.300',
						border: '2px solid white',
						rounded: 'full',
						pos: 'absolute',
						bottom: 0,
						right: 3,
					}}
				/>
				<Heading fontSize={'2xl'} mb="4">
					{fullName}
				</Heading>
				<Text fontWeight={600} color={'gray.500'} mb={4}>
					@{username} - {role}
				</Text>

				<Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
					<Badge
						px={2}
						py={1}
						bg={useColorModeValue( 'gray.50', 'gray.800' )}
						fontWeight={'400'}>
						#art
					</Badge>
					<Badge
						px={2}
						py={1}
						bg={useColorModeValue( 'gray.50', 'gray.800' )}
						fontWeight={'400'}>
						#photography
					</Badge>
					<Badge
						px={2}
						py={1}
						bg={useColorModeValue( 'gray.50', 'gray.800' )}
						fontWeight={'400'}>
						#music
					</Badge>
				</Stack>

				<Stack mt={8} direction={'row'} spacing={4} color="#aaa">
					<Button
						flex={1}
						fontSize={'sm'}
						rounded={'full'}
						_focus={{
							bg: 'gray.200',
						}}>
						Message
					</Button>
					<Button
						flex={1}
						fontSize={'sm'}
						rounded={'full'}
						bg={'212121'}
						boxShadow={
							'0px 1px 25px -5px rgb(27 27 27 / 48%), 0 10px 10px -5px rgb(27 27 27 / 43%)'
						}
						_hover={{
							bg: 'blackAlpha.300',
						}}
						_focus={{
							bg: 'blackAlpha.300',
						}}>
						Follow
					</Button>
				</Stack>
			</Box>
		</Center>
	)
}

export default User
