import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { getVillagesQuery } from '../queries/queries'
import styles from '../styles/Home.module.css'

class VillagesList extends Component {
	displayVillages() {
		let data = this.props.data
		console.log(data)
		if (data.loading) {
			return <div>Loading villages..</div>
		} else {
			return data.villages.map((province) => {
				return (
					<li key={province.id}>
						<h1>Village: {province.name}</h1>
						<h3>Population: {province.population}</h3>
						<p>{province.urbanCommune ? 'Commune Urbaine' : 'Commune Rurale'}</p>
					</li>
				)
			})
		}
	}
	render() {
		return (
			<div className={styles.gridcontainer}>
				<h1>Villages List</h1>
				<ul id="villages" className="center">
					{this.displayVillages()}
				</ul>
			</div>
		)
	}
}

export default graphql(getVillagesQuery)(VillagesList)
