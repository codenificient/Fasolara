import styles from '../styles/Avatar.module.css'
import Image from 'next/image'

function Avatar({ image, wSize, iSize }) {
	return (
		<span className={styles.avatar_container} style={{ width: wSize + 'px', height: wSize + 'px' }}>
			<Image
				className={styles.avatar}
				src={image}
				width={wSize}
				height={wSize}
				alt={`image of ${image}`}
				style={{ width: iSize + 'px', height: iSize + 'px' }}
			/>
		</span>
	)
}

export default Avatar