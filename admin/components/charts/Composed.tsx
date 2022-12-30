import
{
	Area,
	Bar, CartesianGrid, ComposedChart, Legend, Line, ResponsiveContainer,
	Tooltip, XAxis,
	YAxis
} from "recharts"

import styles from "@css/Charts.module.scss"



const ComposedCharrt = ( { data } ) =>
{
	return (
		<div className={styles.chart_container}>
			<ResponsiveContainer width="100%" height="100%">
				<ComposedChart width={730} height={250} data={data}>
					<XAxis dataKey="name" />
					<YAxis />
					<Tooltip />
					<Legend />
					<Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" />
					<Bar dataKey="pv" barSize={20} fill="#413ea0" />
					<Line type="monotone" dataKey="uv" stroke="#ff7300" />
				</ComposedChart>
			</ResponsiveContainer>
		</div>
	)
}

export default ComposedCharrt
