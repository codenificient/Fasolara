import Image from 'next/image'

import styles from '@css/Avatar.module.scss'

interface Props
{
	image: string
	wSize: string
	iSize: string
}

const Avatar: React.FC<Props> = ( { image, wSize, iSize } ) =>
{
	return (
		<span className={styles.avatar_container} style={{ width: wSize + 'px', height: wSize + 'px' }}>
			<Image
				className={styles.avatar}
				src={image}
				width={iSize}
				height={iSize}
				alt={`image of ${image}`}
			/>
		</span >
	)
}

export default Avatar