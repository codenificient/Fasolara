import styles from '@css/Design.module.scss'

export default function Icon( { classes, colors, size } ): JSX.Element
{
	return (
		<span className={styles.icon_wrapper}>
			<i
				className={classes}
				style={{ color: colors, fontSize: size }}
			/>
		</span>
	)
}
