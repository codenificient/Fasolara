import Image from 'next/image'
import { useRouter } from 'next/router'
import Proces from '../public/assets/process.png'
import styles from "../styles/Home.module.scss"
import { steps } from './data/step'
import Step from './Step'

const Process = (): JSX.Element =>
{
	const router = useRouter()
	return (
		<div className={`${styles.ProcessWrapper} bg-[#e2e8f0] dark:bg-[#111] shadow`}>
			<h1 className="text-4xl  font-extrabold dark:text-[#aaa] text-[#555] mb-[2rem] capitalize">
				comment ça marche?
			</h1>
			<div className={styles.processes}>
				<Image src={Proces} alt="Processes" />

			</div>
		</div>
	)
}

export default Process
