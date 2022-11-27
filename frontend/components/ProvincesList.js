import React, { Component } from "react"
import { graphql } from "react-apollo"
import { getProvincesQuery } from "../queries/queries"
import styles from "../styles/Home.module.scss"

class ProvincesList extends Component {
  displayProvinces() {
    let data = this.props.data
    // console.log(data)
    if (!data.provinces) return
    if (data.loading) {
      return <div>Chargement en cours...</div>;
    } else {
      return data.provinces.map((province) => {
        return (
          <li key={province.id}>
            <h1>Province: {province.name}</h1>
            <h3>Région: {province.region}</h3>
            <p>Chef-lieu: {province.seat}</p>
            {province.villages.length > 0 && (
              <strong>
                Listes des Villages:
                {province.villages.map((village) => {
                  return (
                    <span key={village.id} id="villagelist">
                      {village.name}
                    </span>
                  )
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
        <ul id="provinces" className="center">
          {this.displayProvinces()}
        </ul>
      </div>
    )
  }
}

export default graphql(getProvincesQuery)(ProvincesList)
