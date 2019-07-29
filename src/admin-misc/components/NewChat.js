import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import './NewChat.scss'

import apiUrl from '../../apiConfig'
import axios from 'axios'

class NewChat extends Component {
  constructor (props) {
    super(props)

    this.state = {
      chats: [],
      name: ''
    }
  }

  async componentDidMount () {
    const userResponse = await axios(`${apiUrl}/chats`)
    this.setState({ chats: userResponse.data.chats })
    console.log(this.state)
  }

  handleChange = event => {
    // handle change
    const updatedField = {
      [event.target.name]: event.target.value
    }
    const name = Object.assign(this.state.name, updatedField)
    this.setState({ name: name.name })
    console.log(this.state)
  }

  createChat = async event => {
    event.preventDefault()
    await axios({
      url: `${apiUrl}/chats`,
      method: 'POST',
      data: {
        chat: {
          name: this.state.name
        }
      }
    })
  }

  render () {
    const { name } = this.state.name
    return (
      <div id="newchat" className="new-chat">
        <p>{this.state.name}</p>
        <form
          onSubmit={this.createChat}
          className="chat-input">
          <input
            name="name"
            value={name}
            placeholder="name"
            onChange={this.handleChange}
            className="form-border"
          />
          <Button
            type="submit"
            className="comment-button">Post</Button>
        </form>
      </div>
    )
  }
}

export default NewChat
