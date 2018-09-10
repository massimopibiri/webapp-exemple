import React, { Component } from 'react'
/* COMPONENTS */
import Header from '../components/Header'
/* IMAGES */
import defaultUser from '../icons/avatar.png'

class ChooseTarget extends Component {
  constructor() {
    super()
    this.chooseFreezed = this.chooseFreezed.bind(this)
  }
  componentDidMount() {
    if (
      !this.props.location
      || !this.props.location.state
      || !this.props.location.state.challenge
      || !this.props.location.state.suspectReason
      || !this.props.location.state.challengeType
    ) {
      this.props.history.push('/')
    }
  }
  chooseFreezed(target) {
    if (this.props.location && this.props.location.state && this.props.location.state.challenge) {
      if (this.props.location.state.challengeType === 'freeze') {
        this.props.history.push({ pathname: '/confirmfreeze', state: {
          idChallenge: this.props.location.state.challenge._id,
          targetId: target === 'challenger' ? this.props.location.state.challenge.challenger : this.props.location.state.challenge.opponent,
          target:  target === 'challenger' ? this.props.location.state.challenge.challengerDett.firstName : this.props.location.state.challenge.opponentDett.firstName,
          imageTarget: target === 'challenger' ? this.props.location.state.challenge.challengerDett.image : this.props.location.state.challenge.opponentDett.image,
          theme: this.props.location.state.challenge.theme,
          subTheme: this.props.location.state.challenge.subTheme,
          date: this.props.location.state.challenge.date,
          lasting: this.props.location.state.challenge.lasting,
          amount: this.props.location.state.challenge.amount,
          file: this.props.location.state.file,
          comment: this.props.location.state.comment,
          challengeType: this.props.location.state.challengeType,
          match: this.props.location.state.challenge.match,
          challenge: this.props.location.state.challenge,
          origin: 'chall'
        }})
      } else {
        this.props.history.push({ pathname: '/confirmfreeze', state: {
          idChallenge: this.props.location.state.challenge._id,
          targetId: target === 'challenger' ? this.props.location.state.challenge.challenger : this.props.location.state.challenge.opponent,
          target:  target === 'challenger' ? this.props.location.state.challenge.challengerDett : this.props.location.state.challenge.opponentDett,
          imageTarget: target === 'challenger' ? this.props.location.state.challenge.challengerDett.image : this.props.location.state.challenge.opponentDett.image,
          theme: this.props.location.state.challenge.theme,
          subTheme: this.props.location.state.challenge.subTheme,
          date: this.props.location.state.challenge.date,
          lasting: this.props.location.state.challenge.lasting,
          amount: this.props.location.state.challenge.amount,
          suspectReason: this.props.location.state.suspectReason,
          challengeType: this.props.location.state.challengeType,
          match: this.props.location.state.challenge.match,
          challenge: this.props.location.state.challenge,
          origin: 'chall'
        }})
      }
    }
  }
  render() {
    if (
      this.props.location
      && this.props.location.state
      && this.props.location.state.challenge
      && this.props.location.state.suspectReason
      && this.props.location.state.challengeType
    ) {
      return (
        <div className="flexed flexFill column">
          <Header back={true} right="remove" backTarget={{ pathname: '/suspect', state: { challenge: this.props.location.state.challenge}}} title="Quel joueur ça concerne ?"/>
          <div className="flexed flexFill column alignStretch justifyCentered">
            <p className="fontSize-21 white textCenter marginBottom-35">Confirmez votre cible :</p>
            <div className="flexed bg_blackTrans paddingVertical-20">
              { this.props.location.state.challenge.match === true && localStorage && localStorage.getItem('TrickyAppId') !== this.props.location.state.challenge.challenger ?
                <div className="flexed flexFill column alignCenter justifyCentered">
                  <div className="iconSize-90 radiusRound borderTotal4ColorGrey relativePos">
                    <img
                      src={this.props.location.state.challenge.challengerDett.image ? this.props.location.state.challenge.challengerDett.image : defaultUser}
                      alt="challenger-avatar"
                      className="imgFillParent"
                    />
                  </div>
                  <p className="fontSize-21 white weight-700 marginTop-10">{this.props.location.state.challenge.challengerDett.firstName}</p>
                  <p className="fontSize-21 white weight-700 marginTop-10">{this.props.location.state.challenge.challengerDett.familyName}</p>
                  <button
                    onClick={() => this.chooseFreezed('challenger')}
                    className="bg_color1_medium paddingHorizontal-25 paddingVertical-10 marginTop-15 radius-25 white fontSize-17"
                  >
                    Choisir
                  </button>
                </div>
                :
                null
              }
              { localStorage && localStorage.getItem('TrickyAppId') !== this.props.location.state.challenge.opponent ?
                <div className="flexed flexFill column alignCenter justifyCentered">
                  <div className="iconSize-90 radiusRound borderTotal4ColorGrey relativePos">
                    <img
                      src={this.props.location.state.challenge.opponentDett.image ? this.props.location.state.challenge.opponentDett.image : defaultUser}
                      alt="opponent-avatar"
                      className="imgFillParent"
                    />
                  </div>
                  <p className="fontSize-21 white weight-700 marginTop-10">{this.props.location.state.challenge.opponentDett.firstName}</p>
                  <p className="fontSize-21 white weight-700 marginTop-10">{this.props.location.state.challenge.opponentDett.familyName}</p>
                  <button
                    onClick={() => this.chooseFreezed('opponent')}
                    className="bg_color1_medium paddingHorizontal-25 paddingVertical-10 marginTop-15 radius-25 white fontSize-17"
                  >
                    Choisir
                  </button>
                </div>
                :
                null
              }
            </div>
          </div>
        </div>
      )
    } else {
      return null
    }
  }
}

export default ChooseTarget
