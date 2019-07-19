
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './Home.scss'

class Home extends Component {
  constructor (props) {
    super(props)

    this.state = {
      users: []
    }
  }

  async componentDidMount () {
  }

  render () {
    return (
      <div className='home-body'>
        <h1>Welcomes</h1>
      </div>
    )
  }
}

export default withRouter(Home)
