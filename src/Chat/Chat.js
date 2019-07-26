import React, { Component } from 'react'
import './Chat.scss'

import apiUrl from '../apiConfig'
import axios from 'axios'

class Chat extends Component {
  constructor (props) {
    super(props)

    this.state = {
      users: []
    }
  }

  async componentDidMount () {
    const userResponse = await axios(`${apiUrl}/users`)
    this.setState({ users: userResponse.data.users })
  }

  render () {
    return (
      <div id="chat-window" className="chat-window">
      </div>
    )
  }
}

export default Chat
