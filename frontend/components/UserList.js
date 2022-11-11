import React, { Component } from "react"
import { graphql } from "react-apollo"
import Moment from "react-moment"
import { getUsersQuery } from "../queries/queries"
import styles from "../styles/Home.module.scss"

class UserList extends Component {
  displayUsers() {
    let data = this.props.data
    // console.log(data)

    if (!data) return

    if (data.loading) {
      return <div>Loading Users</div>
    } else {
      return data.users.slice(3).map((user) => {
        return (
          <li key={user.id}>
            <h2>{user.fullname}</h2>
            <h3>Role: {user.role}</h3>
            <p>Couriel: {user.email}</p>
            {user.dob && (
              <span>
                Date de Naissance:{" "}
                <Moment format="D MMM yyyy">{+user.dob}</Moment>
              </span>
            )}
            <br />
            {user.cnib && `Numero d'Identité: ${user.cnib}`}
          </li>
        )
      })
    }
  }
  render() {
    return (
      <div className={styles.gridcontainer}>
        <h1>Users List</h1>
        <ul id="users">{this.displayUsers()}</ul>
      </div>
    )
  }
}

export default graphql(getUsersQuery)(UserList)
