import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import UserSearch from '../usersearch/UserSearch'
import Chat from '../Chat/Chat'
import ChatRooms from '../chatrooms/components/ChatRooms'
import './Home.scss'
import apiUrl from '../apiConfig'
import axios from 'axios'

class Home extends Component {
  constructor (props) {
    super(props)

    this.state = {
      users: [],
      userfield: '',
      room: {}
    }
  }

  setRoom = room => {
    this.setState({ room })
    console.log(this.state)
  }

  async componentDidMount () {
    const response = await axios(`${apiUrl}/users`)
    this.setState({ users: response.data.users })
  }

  handleChange = event => {
    const updatedField = event.target.value
    this.setState({ userfield: updatedField })
  }

  render () {
    return (
      <div className='home-body'>
        <UserSearch/>
        <Chat room={this.state.room}/>
        <ChatRooms setRoom={this.setRoom}/>
      </div>
    )
  }
}

export default withRouter(Home)
