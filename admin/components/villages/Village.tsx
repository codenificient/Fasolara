import { StarIcon } from '@chakra-ui/icons'
import { Badge, Box, Image } from '@chakra-ui/react'
import * as React from 'react'

import styles from '@cs/locations.module.scss'
import { IVillageProps } from 'lib/types'


const Village: React.FC<IVillageProps> = ( { index, village: { name, population, provinceId, dotcolor, urbanCommune } } ) =>
{
	const property = {
		imageUrl: `https://picsum.photos/${401 + index % 356}/${202 + index % 206}`,
		imageAlt: 'Rear view of modern home with pool',
		reviewCount: 34,
		rating: 4,
	}
	return (
		<Box maxW='sm' borderRadius='md' overflow='hidden' className={styles.CardWrapper}>
			<Image src={property.imageUrl} alt={property.imageAlt} />

			<Box p='6'>
				<Box display='flex' alignItems='baseline'>
					<Badge borderRadius='full' px='2' colorScheme='pink'>
						{name}
					</Badge>
					<Box
						color='gray.500'
						fontWeight='semibold'
						letterSpacing='wide'
						fontSize='xs'
						textTransform='uppercase'
						ml='2'
					>
						{population} habitants &bull; {urbanCommune ? "Urbaine" : "Rurale"}
					</Box>
				</Box>

				<Box
					mt='1'
					fontWeight='semibold'
					as='h4'
					lineHeight='tight'
					noOfLines={1}
				>
					{provinceId}
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

export default Village
