import apiUrl from '../../apiConfig'
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import './User.scss'

class Users extends Component {
  constructor (props) {
    super(props)

    this.state = {
      users: []
    }
  }

  async componentDidMount () {
    const response = await axios(`${apiUrl}/users`)
    this.setState({ users: response.data.users })
    console.log(this.state.users)
  }

  render () {
    const { users } = this.state
    const usersList = users.map(user => (
      <div key={user._id}>
        <img src={user.profile} className="userlist-profiles"/>
        <p>{user.username}</p>
      </div>
    ))
    return (
      <div className="user-container">
        {usersList}
      </div>
    )
  }
}

export default withRouter(Users)
