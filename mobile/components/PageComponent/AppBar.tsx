import { MaterialIcons } from '@expo/vector-icons'
import { Box, HStack, Icon, IconButton, StatusBar, Text } from 'native-base'
import React from 'react'

const AppBar = ( children ) =>
{
	return <React.Fragment>
		<StatusBar barStyle="light-content" />
		<Box safeAreaTop bg="dark.100" />
		<HStack bg="dark.50" px="1" py="3" justifyContent="space-between" alignItems="center" w="100%">
			<HStack alignItems="center">
				<IconButton icon={<Icon size="sm" as={MaterialIcons} name="menu" color="white" />} />
				<Text color="white" fontSize="20" fontWeight="bold">
					{children.title}
				</Text>
			</HStack>
			<HStack>
				<IconButton icon={<Icon as={MaterialIcons} name="favorite" size="sm" color="white" />} />
				<IconButton icon={<Icon as={MaterialIcons} name="search" size="sm" color="white" />} />
				<IconButton icon={<Icon as={MaterialIcons} name="more-vert" size="sm" color="white" />} />
			</HStack>
		</HStack>
	</React.Fragment>
}

export default AppBar
