import styles from "../styles/Home.module.scss"

const Step = ( props: { name : string } ): JSX.Element =>
{
	return (
		<div className={`${styles.Step} bg-[#ccc] dark:bg-[#545454] rounded-2xl  px-4 py-2`}>{props.name}</div>
	)
}

export default Step