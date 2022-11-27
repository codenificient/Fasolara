import React, { Component } from "react"
import { graphql } from "react-apollo"
import { getVillagesQuery } from "../queries/queries"
import styles from "../styles/Home.module.scss"

class VillagesList extends Component {
  displayVillages() {
    let data = this.props.data
    // console.log(data)
    if (!data.villages) return
    if (data.loading) {
      return <div>Chargement des villages...</div>
    } else {
      return data.villages.map((province) => {
        return (
          <li key={province.id}>
            <h1>Village: {province.name}</h1>
            <h3>Population: {province.population}</h3>
            <p>
              {province.urbanCommune ? "Commune Urbaine" : "Commune Rurale"}
            </p>
          </li>
        )
      })
    }
  }
  render() {
    return (
      <div className={styles.gridcontainer}>
        <h1 className="center">Villages List</h1>
        <ul id="villages" className="center">
          {this.displayVillages()}
        </ul>
      </div>
    );
  }
}

export default graphql(getVillagesQuery)(VillagesList)
