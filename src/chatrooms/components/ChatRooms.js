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
      actSearch: false
    }
  }

  async componentDidMount () {
    const userResponse = await axios(`${apiUrl}/chats`)
    this.setState({ chats: userResponse.data.chats })
  }

  actSearch = () => {
    this.setState({ actSearch: !this.state.actSearch })
  }

  render () {
    const chats = this.state.chats.map(chat => (
      <div key={chat._id}>
        <h4>{chat.name}</h4>
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
            ? <input/>
            : <div>
              <h6 className="chatroom-h6">Rooms</h6>
            </div>
          }
        </div>
        {chats}
      </div>
    )
  }
}

export default ChatRooms
