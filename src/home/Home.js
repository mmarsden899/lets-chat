import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Users from '../users/components/Users'
import Chat from '../Chat/Chat'
import './Home.scss'
import apiUrl from '../apiConfig'
import axios from 'axios'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

class Home extends Component {
  constructor (props) {
    super(props)

    this.state = {
      users: [],
      userfield: ''
    }
  }

  async componentDidMount () {
    const response = await axios(`${apiUrl}/users`)
    this.setState({ users: response.data.users })
  }

  handleChange = event => {
    const updatedField = event.target.value
    this.setState({ userfield: updatedField })
    console.log(this.state.userfield)
    console.log(this.state.users)
  }

  render () {
    const users = this.state.users.filter(user =>
      user.username.includes(this.state.userfield)
    ).map(user => (
      <li key={user._id}>{user.username}</li>
    ))
    return (
      <div className='home-body'>
        <div className='searchbar-div'>
          <FontAwesomeIcon
            className="search-icon"
            icon={faSearch}
          />
          <input
            className="find-user"
            required type="text"
            name="userfield"
            placeholder="find a user"
            onChange={this.handleChange}
            maxLength="160"
          />
          <ul>
            {users}
          </ul>
        </div>
        <div>
        </div>
        <Users/>
        <Chat/>
      </div>
    )
  }
}

export default withRouter(Home)
