import { useRouter } from 'next/router'
import { BiMoney } from "react-icons/bi"
import { GiElectricalResistance, GiMaterialsScience } from "react-icons/gi"
import { TbHeartRateMonitor } from "react-icons/tb"
import styles from "../styles/Home.module.scss"
import { features } from './data/descData'

const Description = (): JSX.Element =>
{
	const router = useRouter()
	return (
		<div className={`${styles.DescriptionWrapper} bg-[#e2e8f0] dark:bg-[#111] shadow`}>
			<h1 className="text-4xl  font-extrabold dark:text-[#aaa] text-[#555] mb-[2rem] capitalize">
				une platforme africaine
			</h1>
			<div className={styles.features}>
				{
					features.map( ( feature, indx ) => (
						<div key={feature.name} className={styles.feature}>
							{indx == 0 ? <GiElectricalResistance /> : indx == 1 ? <BiMoney /> : indx == 2 ? <TbHeartRateMonitor /> : <GiMaterialsScience />}
							<h2>{feature.name}</h2>
							<p>{feature.content}</p>
						</div>
					) )
				}

			</div>
		</div>
	)
}

export default Description
