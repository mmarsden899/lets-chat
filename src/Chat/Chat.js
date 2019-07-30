import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import './Chat.scss'

import apiUrl from '../apiConfig'
import axios from 'axios'

class Chat extends Component {
  constructor (props) {
    super(props)

    this.state = {
      users: [],
      room: ''
    }
  }

  async componentDidMount () {
    const userResponse = await axios(`${apiUrl}/users`)
    this.setState({ users: userResponse.data.users })
    console.log(this.props)
  }

  render () {
    return (
      <div id="chat-window" className="chat-window">
        <h3 className="chat-h3">Currently in room {this.state.room}</h3>
        <div className="chat-container">
          <div className='chat-div'>
            <input
              className="chat-input"
              required type="text"
              name="userfield"
              placeholder="type a message"
              onChange={this.handleChange}
              maxLength="50"
            />
            <Button className="btn-sm button">submit</Button>
          </div>
        </div>
      </div>
    )
  }
}

export default Chat
