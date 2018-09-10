import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
/* COMPONENTS */
import Header from '../components/Header'
/* ACTION CREATOR */
import { addAlert } from '../reducer/alerts'
/* IMAGES */
import defaultUser from '../icons/avatar.png'

class EndChallenge extends Component {
  constructor() {
    super()
    this.confirm = this.confirm.bind(this)
    this.state = {disable: false}
  }
  confirm() {
    if (
      this.context.websocket
      && this.props.location
      && this.props.location.state
      && this.props.location.state.idProgram
      && this.props.location.state.fielded
      && this.props.location.state.selOpponent._id
      && this.props.location.state.selTheme
      && this.props.location.state.selSubTheme
      && this.props.location.state.selTime
      && this.props.location.state.selPoints
    ) {
      this.setState({disable: true})
      this.context.websocket.emit('createChallenge', {
        fielded: this.props.location.state.fielded,
        selOpponent: this.props.location.state.selOpponent._id,
        selTheme: this.props.location.state.selTheme,
        selSubTheme: this.props.location.state.selSubTheme,
        selTime: this.props.location.state.selTime,
        selPoints: this.props.location.state.selPoints
      })
      this.props.dispatch(addAlert('cool', 'Votre défi a été envoyé'))
      this.props.history.push('/')
    }
  }
  render() {
    // =====>>> RENDER LIST
    if (this.props.location && this.props.location.state && this.props.location.state.fielded && this.props.location.state.selOpponent._id && this.props.location.state.selTheme && this.props.location.state.selSubTheme && this.props.location.state.selTime) {
      return (
        <div className="flexed flexFill column">
          <Header back={true} backTarget={{ pathname: '/betting', state: { idProgram: this.props.location.state.idProgram, selOpponent: this.props.location.state.selOpponent, selTheme: this.props.location.state.selTheme, selSubTheme: this.props.location.state.selSubTheme, selTime: this.props.location.state.selTime}}} right="remove" title="Confirmation du défi"/>
          <div className="flexed flexFill column alignStretch scroll_y">
            <div className="scroll_y flexed alignStretch column">
              <div className="flexed column alignCenter justifyCentered">
                <p className="marginTop-55 marginBottom-15 white fontSize-17">Vous challengez:</p>
                <div className="noShrink iconSize-90 radiusRound border border_color_7 borderWidth-4 marginTop-25 marginBottom-10 relativePos over_hidden">
                  <img
                    src={this.props.location && this.props.location.state && this.props.location.state.selOpponent && this.props.location.state.selOpponent.image ? this.props.location.state.selOpponent.image : defaultUser}
                    alt="avatar"
                    className="imgFillParent"
                  />
                </div>
                <p className="white fontSize-16 weight-700">{this.props.location && this.props.location.state && this.props.location.state.selOpponent ? this.props.location.state.selOpponent.firstName : null}</p>
                <p className="white fontSize-16 weight-700">{this.props.location && this.props.location.state && this.props.location.state.selOpponent ? this.props.location.state.selOpponent.familyName : null}</p>
              </div>
              <div className="flexed column alignCenter paddingTop-50">
                <p className="fontSize-15 white textCenter">sur le thème de</p>
                <p className="fontSize-21 weight-700 white alignCenter textCenter">{this.props.location && this.props.location.state && this.props.location.state.selSubTheme ? this.props.location.state.selSubTheme : null}</p>
                <p className="fontSize-15 white textCenter">pendant <span className="fontSize-21 weight-700 white alignCenter textCenter">{this.props.location && this.props.location.state && this.props.location.state.selTime ? this.props.location.state.selTime : null}h </span>pour <span className="fontSize-24 weight-700 white alignCenter">{this.props.location && this.props.location.state && this.props.location.state.selPoints ? this.props.location.state.selPoints : null} Tricks</span></p>
              </div>
              { this.state.disable === false ?
                <button
                  onClick={() => this.confirm()}
                  className="bg_color1_medium alignSelfCenter height-50 width_2-3 flexed alignCenter justifyCentered radius-25 marginTop-80 marginBottom-50 white fontSize-15 uppercase weight-700"
                >
                  Confirmer
                </button>
                :
                <div className="bg_greyMedium alignSelfCenter height-50 width_2-3 flexed alignCenter justifyCentered radius-25 marginTop-80 marginBottom-50 fontSize-15 uppercase weight-700">
                  <p className="black">Attendre...</p>
                </div>
              }
            </div>
          </div>
        </div>
      )
    // =====>>> REDIRECT IF ACCESS IS NOT AUTHORIZED
    } else {
      return (
        <div className="fullWidth flexed flexFill paddingTop-50 column alignCenter bg_gradiant">
          <p className="white fontSize-17 textCenter paddingVertical-30 paddingHorizontal-30">Cet accès n'est pas autorisé.</p>
            <button
              onClick={() => {
                this.props.history.push('/')
              }}
              className="marginTop-6 bg_color1_medium radius-15 flexed alignCenter justifyCentered alignSelf white fontSize-17 paddingVertical-20 paddingHorizontal-20"
            >
              Retour à la home
            </button>
        </div>
      )
    }
  }
}
// access context.type to get the store to pass to socket.io initialization
EndChallenge.contextTypes = {
  websocket: PropTypes.object
}

export default connect()(EndChallenge)
