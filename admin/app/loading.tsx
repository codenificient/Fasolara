"use client"

import { Box, SkeletonCircle, SkeletonText, Stack } from '@chakra-ui/react'

const Loading = () =>
{
	return (
		<Stack>
			<p>Loading...</p>
			<Box padding='6' boxShadow='lg' bg='#434343'>
				<SkeletonCircle size='20' />
				<SkeletonText mt='4' noOfLines={20} spacing='4' skeletonHeight='4' />
			</Box>
		</Stack>
	)
}

export default Loading
