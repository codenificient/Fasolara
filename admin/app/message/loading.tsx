"use client"
import { Skeleton, SkeletonText } from '@chakra-ui/react'
import styles from '@css/Messages.module.scss'


function Loading()
{
	return (
		<div className={styles.messages_wrapper}>
			<Skeleton className={styles.conversations_container}>


				<div className={styles.conversations_list}>
					<SkeletonText mt='4' noOfLines={40} spacing='4' skeletonHeight='2' w={"64vw"} h="full" />
				</div>
			</Skeleton>

			<Skeleton className={styles.content_container}>

				<SkeletonText mt='4' noOfLines={40} spacing='4' skeletonHeight='2' w={"64vw"} h="full" />

			</Skeleton>
		</div>
	)
}

export default Loading
