import React, { Component } from 'react'
import './ChatRooms.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

import apiUrl from '../../apiConfig'
import axios from 'axios'

class ChatRooms extends Component {
  constructor (props) {
    super(props)

    this.state = {
      chats: [],
      actSearch: false,
      form: ''
    }
  }

  async componentDidMount () {
    const userResponse = await axios(`${apiUrl}/chats`)
    this.setState({ chats: userResponse.data.chats })
  }

  actSearch = () => {
    this.setState({ actSearch: !this.state.actSearch })
    this.setState({ form: '' })
  }

  handleChange = event => {
    const form = event.target.value
    this.setState({ form: form })
  }

  render () {
    const chats = this.state.chats.filter(chat => (
      chat.name.toLowerCase().includes(this.state.form.toLowerCase())
    )).map(chat => (
      <div key={chat._id}>
        <h6 className="returned-room">{chat.name}</h6>
      </div>
    ))
    return (
      <div id="chatrooms" className="chatrooms-container">
        <div className="chatroom-header">
          <FontAwesomeIcon
            className="search-icon"
            icon={faSearch}
            onClick={this.actSearch}
          />
          { this.state.actSearch
            ? <input
              className="find-user"
              required type="text"
              name="room"
              placeholder="find a room"
              onChange={this.handleChange}
              maxLength="25"
            />
            : <div>
              <h6 className="chatroom-h6">Rooms</h6>
            </div>
          }
        </div>
        <div className="returned-rooms">
          {chats}
        </div>
      </div>
    )
  }
}

export default ChatRooms
