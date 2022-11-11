import React, { Component } from "react"
import { graphql } from "react-apollo"
import { getUsersQuery } from "../queries/queries"

class UserList extends Component {
  displayUsers() {
    let data = this.props.data
    // console.log(data)
    if (data.loading) {
      return <div>Loading Users</div>
    } else {
      return data.users.map((user) => {
        return <li key={user.id}>{user.fullname}</li>
      })
    }
  }
  render() {
    return (
      <div>
        <h1>Users List</h1>
        <ul id="users">{this.displayUsers()}</ul>
      </div>
    )
  }
}

export default graphql(getUsersQuery)(UserList)
