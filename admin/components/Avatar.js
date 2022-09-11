import Image from 'next/image'
import styles from '../styles/components/Avatar.module.scss'

export default function Avatar({ image, wSize, iSize }) {
	return (
		<span className={styles.avatar_container} style={{ width: wSize + 'px', height: wSize + 'px' }}>
			<Image
				className={styles.avatar}
				src={image}
				width={iSize}
				height={iSize}
				alt={`image of ${image}`}
			/>
		</span>
	)
}
