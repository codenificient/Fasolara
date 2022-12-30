import
{
	Bar,
	BarChart,
	CartesianGrid, Legend, ResponsiveContainer,
	Tooltip, XAxis,
	YAxis
} from "recharts"

import styles from "@css/Charts.module.scss"



const BarCharrt = ( { data } ) =>
{
	return (
		<div className={styles.chart_container}>
			<ResponsiveContainer width="100%" height="100%">
				<BarChart width={730} height={250} data={data}>
					<XAxis dataKey="name" />
					<YAxis />
					<Tooltip />
					<Legend />
					<Bar dataKey="pv" fill="#8884d8" />
					<Bar dataKey="uv" fill="#82ca9d" />
				</BarChart>
			</ResponsiveContainer>
		</div>
	)
}

export default BarCharrt
