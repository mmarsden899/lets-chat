import React, { Component } from 'react'
import './ChatRooms.scss'

import apiUrl from '../../apiConfig'
import axios from 'axios'

class ChatRooms extends Component {
  constructor (props) {
    super(props)

    this.state = {
      chats: []
    }
  }

  async componentDidMount () {
    const userResponse = await axios(`${apiUrl}/chats`)
    this.setState({ chats: userResponse.data.chats })
  }

  render () {
    const chats = this.state.chats.map(chat => (
      <div key={chat._id}>
        <h4>{chat.name}</h4>
      </div>
    ))
    return (
      <div id="chatrooms" className="chatrooms-container">
        {chats}
      </div>
    )
  }
}

export default ChatRooms
