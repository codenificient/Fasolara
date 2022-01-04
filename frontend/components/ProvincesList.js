import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { getProvincesQuery } from '../queries/queries'
import styles from '../styles/Home.module.css'

class ProvincesList extends Component {
	displayProvinces() {
		let data = this.props.data
		console.log(data)
		if (data.loading) {
			return <div>Loading provinces..</div>
		} else {
			return data.provinces.map((province) => {
				return (
					<li key={province.id}>
						<h2>Province: {province.name}</h2>
						<h3>Region: {province.region}</h3>
						<p>Chef-lieu: {province.seat}</p>
						{province.villages.length > 0 && (
							<strong>
								Listes des Villages:
								{province.villages.map((village) => {
									return <ul key={village.id}>{village.name}</ul>
								})}
							</strong>
						)}
					</li>
				)
			})
		}
	}
	render() {
		return (
			<div className={styles.gridcontainer}>
				<h1>Provinces List</h1>
				<ul id="provinces" className='center'>{this.displayProvinces()}</ul>
			</div>
		)
	}
}

export default graphql(getProvincesQuery)(ProvincesList)
