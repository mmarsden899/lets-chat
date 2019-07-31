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
      room: {},
      message: ''
    }
  }

  async componentDidMount () {
    const userResponse = await axios(`${apiUrl}/users`)
    this.setState({ users: userResponse.data.users })
    console.log(this.props)
  }

  shouldComponentUpdate (nextProps) {
    console.log(nextProps)
    console.log(this.props)
    if (nextProps.room !== this.props.room) {
      this.setState({ room: nextProps.room })
    }
    return nextProps.room === this.props.room
  }

  handleChange = event => {
    const message = event.target.value
    this.setState({ message: message })
  }

  handleSubmit = async event => {
    event.preventDefault()
    event.persist()
    await axios({
      url: `${apiUrl}/messages`,
      method: 'POST',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: {
        message: {
          body: this.state.message,
          chat: this.props.room._id
        }
      }
    })
  }

  render () {
    return (
      <div id="chat-window" className="chat-window">
        <h3 className="chat-h3">
          {this.props.room ? this.state.room.name : ''}</h3>
        <div className="chat-container">
          <div className="message-container"
            id="message-container">{
              this.props.room.messages
                ? this.state.room.messages.map(message => (
                  <div key={message._id}>
                    <span><p>{message.owner.username}:</p>
                      <p>{message.body}</p></span>
                  </div>
                )) : ' '}</div>
          <div className='chat-div'>
            <input
              className="chat-input"
              required type="text"
              name="userfield"
              placeholder="type a message"
              onChange={this.handleChange}
              maxLength="50"
            />
            <Button
              className="btn-sm button"
              onClick={this.handleSubmit}>submit</Button>
          </div>
        </div>
      </div>
    )
  }
}

export default Chat
