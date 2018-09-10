import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import io from 'socket.io-client'
import getUrl from '../helpers/getUrl'
import { withRouter } from 'react-router-dom'
/* SOCKET EVENTS */
import socketEvents from '../socket/events'

class SocketCont extends Component {
  constructor() {
    super()
    this.state = {
      allowSocket: false,
      websocket: null
    }
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    // check if we have to initialize websocket
    if (
      nextProps.allowSocket === true
      && nextProps.allowSocket !== prevState.allowSocket
      && nextProps.letSocket
      && nextProps.letSocket === true
    ) {
      // =========>> SOCKET INITIALIZATION
      const hostURL = process.env.NODE_ENV === 'production' ? getUrl('/') : 'http://localhost:3012/'
      // initialize the socket connection with the passwordToken
      const socket = io(hostURL, {
        // jsonp: false,
        // transports: ['websocket'],
        // forceNew: true,
        reconnection: true,
        query: {
          token: localStorage && localStorage.getItem('TrickyAppToken') ? localStorage.getItem('TrickyAppToken') : null
        }
      })
      // connect to socket
      socket.connect()
      socket.on('connect', () => {
        console.log('connected')
      })
      socket.on('reconnect', () => {
        console.log('Sono riconnesso!')
      })
      socket.on('disconnect', () => {
        console.log('Sono disconnesso!')
      })
      return {
        allowSocket: true,
        websocket: socket
      }
    }
    return null
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.websocket
      && this.state.allowSocket === true
      && this.state.allowSocket !== prevState.allowSocket
    ) {
      // all the events to listen
      socketEvents(this.state.websocket, this.props.dispatch, this.props.history)
    }
  }
  getChildContext() {
    return {websocket: this.state.websocket}
  }
  render() {
    return (
      <div className="flexed flexFill column relativePos">
        {this.props.children}
      </div>
    )
  }
}
SocketCont.childContextTypes = {
  websocket: PropTypes.object
}

function mapStateToProps(state) {
  return {
    allowSocket: state.auth.allowSocket
  }
}

export default withRouter(connect(mapStateToProps)(SocketCont))
