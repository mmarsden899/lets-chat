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
    console.log(this.props)
    const response = await axios(`${apiUrl}/users`)
    this.setState({ users: response.data.users })
    console.log(this.state.users)
  }

  render () {
    const { users } = this.state
    const usersList = users.filter(user => {
      if (this.props.user) {
        return user.username !== this.props.user.username
      } else {
        return user
      }
    }).map(user => (
      <div key={user._id} className="single-user">
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
