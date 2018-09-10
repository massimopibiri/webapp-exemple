import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
/* COMPONENTS */
import Header from '../components/Header'

class DettFreeze extends Component {
  constructor() {
    super()
    this.getHeader = this.getHeader.bind(this)
    this.onValidateFreeze = this.onValidateFreeze.bind(this)
    this.state = {validated: false}
  }
  componentDidMount() {
    if (
      !this.props.location
      || !this.props.location.state
      || !this.props.location.state.image
      || !this.props.location.state.idFreeze
      || !this.props.location.state.accusedId
      || !this.props.location.state.idChallenge
      || !this.props.location.state.origin
    ) {
      this.props.history.push('/')
    }
  }
  onValidateFreeze(decision, id, accusedId, challengeId) {
    if (decision && id && accusedId && challengeId) {
      this.setState({validated: true})
      if (this.context.websocket) {
        this.context.websocket.emit('validateFreeze', {
          decision,
          id,
          accusedId,
          challengeId
        }) 
      }
      if (this.props.location.state.origin === 'main') {
        this.props.history.push({ pathname: '/', state: {} })
      } else if (this.props.location.state.origin === 'detailChallenge') {
        this.props.history.push({ pathname: '/detailchallenge', state: { idChallenge: challengeId } })
      }
      if (this.props.location.state.origin === 'notifications') {
        this.props.history.push({ pathname: '/notifications', state: {} })
      }
    }
  }
  getHeader() {
    if (this.props.location && this.props.location.state && this.props.location.state.idChallenge && this.props.location.state.origin) {
        return <Header back={true} backTarget={{ pathname: this.props.location.state.origin, state: { idChallenge: this.props.location.state.idChallenge}}} right="remove" title="A-t-il perdu ?"/>
    } else {
      return <Header back={true} backTarget={{ pathname: '/', state: {}}} right="remove" title="A-t-il perdu ?"/>
    }
  }
  render() {
    return (
      <div className="flexed flexFill column">
        { this.getHeader()}
        { !this.props.location
          || !this.props.location.state
          || !this.props.location.state.image
          || !this.props.location.state.idFreeze
          || !this.props.location.state.accusedId
          || !this.props.location.state.idChallenge
          || !this.props.location.state.origin
          ?
          null
          :
          <div className="flexed flexFill column alignCenter justifyEnd relativePos">
            <img
              src={this.props.location.state.image}
              alt="freeze"
              className="imgContainedInParent"
            />
            { this.props.location.state.comment ?
              <p className="white fontSize-26 absolutePos textCenter paddingHorizontal-20 top-90 left-20 weight-700">{this.props.location.state.comment}</p>
              :
              null
            }
            { (this.props.location.state.freezeConfirmation && this.props.location.state.freezeConfirmation === true) || this.props.location.state.freezer === localStorage.getItem('TrickyAppId') ?
              null
              :
              <button
                onClick={() => this.onValidateFreeze('validate', this.props.location.state.idFreeze, this.props.location.state.accusedId, this.props.location.state.idChallenge)}
                className="zIndex-1 width_2-3 radius-25 paddingVertical-10 bg_color1_medium flexed alignCenter justifyCentered marginVertical-10 white"
              >
                Valider
              </button>
            }
            { (this.props.location.state.freezeConfirmation && this.props.location.state.freezeConfirmation === true) || this.props.location.state.freezer === localStorage.getItem('TrickyAppId') ?
              null
              :
              <button 
                onClick={() => this.onValidateFreeze('decline', this.props.location.state.idFreeze, this.props.location.state.accusedId, this.props.location.state.idChallenge)}
                className="zIndex-1 width_2-3 radius-25 paddingVertical-10 marginBottom-35 marginTop-10 bg_color1_medium flexed alignCenter justifyCentered white"
              >
                Décliner
              </button>
            }
          </div> 
        }
      </div>
    )
  }
}
// access context.type to get the store to pass to socket.io initialization
DettFreeze.contextTypes = {
  websocket: PropTypes.object
}

export default connect()(DettFreeze)
