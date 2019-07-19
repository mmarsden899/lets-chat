import apiUrl from './apiConfig'
import { Component } from 'react'
import axios from 'axios'

export default class Users extends Component {
  constructor (props) {
    super(props)

    this.state = {
      users: []
    }
  }

  async ComponentDidMount () {
    const response = await axios(`${apiUrl}/uploads`)
    this.setState({ users: response.data.users })
  }
}
