import { StarIcon } from '@chakra-ui/icons'
import { Badge, Box, Image } from '@chakra-ui/react'
import * as React from 'react'

import styles from '@cs/locations.module.scss'
import { IAddressProps } from 'lib/types'


const Address: React.FC<IAddressProps> = ( {index, address: { address, addressType, locationId, dotcolor, name, villageId } } ) =>
{
	const property = {
		imageUrl: `https://picsum.photos/${403 + index % 4}/${201 + index % 5}`,
		imageAlt: 'Back of home with pool',
		reviewCount: 34,
		rating: 4,
	}
	return (
		<Box maxW='sm' borderRadius='md' overflow='hidden' className={styles.CardWrapper}>
			<Image src={property.imageUrl} alt={property.imageAlt} />

			<Box p='6'>
				<Box display='flex' alignItems='baseline'>
					<Badge borderRadius='full' px='2' colorScheme='red'>
						{addressType}
					</Badge>
					<Box
						color='gray.500'
						fontWeight='semibold'
						letterSpacing='wide'
						fontSize='xs'
						textTransform='uppercase'
						ml='2'
					>
						{dotcolor} &bull; {addressType ?? "Home"}
					</Box>
				</Box>

				<Box
					mt='1'
					fontWeight='semibold'
					as='h4'
					lineHeight='tight'
					noOfLines={1}
				>
					{address}
				</Box>


				<Box display='flex' mt='2' alignItems='center'>
					{Array( 5 )
						.fill( '' )
						.map( ( _, i ) => (
							<StarIcon
								key={i}
								color={i < property.rating ? 'teal.500' : 'gray.300'}
							/>
						) )}
					<Box as='span' ml='2' color='gray.600' fontSize='sm'>
						{property.reviewCount} reviews
					</Box>
				</Box>
			</Box>
		</Box>
	)
}

export default Address
