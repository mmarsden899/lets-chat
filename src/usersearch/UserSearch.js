import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './UserSearch.scss'
import apiUrl from '../apiConfig'
import axios from 'axios'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const moment = require('moment')

class UserSearch extends Component {
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
    console.log(this.props)
  }

  handleChange = event => {
    const updatedField = event.target.value
    this.setState({ userfield: updatedField })
    console.log(this.state.userfield)
    console.log(this.state.users)
  }

  render () {
    const users = this.state.users.filter(user =>
      user.username.toLowerCase().includes(this.state.userfield.toLowerCase()) &&
      this.state.userfield).map(user => (
      <div
        key={user._id}
        className="individual-user"
      >
        <span>
          <img
            src={user.profile}
            className="profile-images"
          />
          <h6>{user.username}</h6>
          <small>{moment(user.updatedAt).fromNow()}</small>
        </span>
      </div>
    ))
    return (
      <div className="search-component">
        <div className="search-container">
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
              maxLength="25"
            />
          </div>
        </div>
        <div className="searched-users">
          {users}
        </div>
      </div>
    )
  }
}

export default withRouter(UserSearch)
