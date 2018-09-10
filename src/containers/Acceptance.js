import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
/* COMPONENTS */
import Header from '../components/Header'
/* ACTION CREATORS */
import { challengeLoadSingle } from '../reducer/challenges'
/* HELPERS */
import { fromHoursToDays } from '../helpers/challengeFuncs'
/* IMAGES */
import defaultUser from '../icons/avatar.png'
import loading from '../icons/loading1.gif'

class Acceptance extends Component {
  constructor() {
    super()
    this.accept = this.accept.bind(this)
    this.match = this.match.bind(this)
    this.refuse = this.refuse.bind(this)
    this.state = {choosen: false}
  }
  componentDidMount() {
    if (this.props.location && this.props.location.state && this.props.location.state.idChallenge) {
      this.props.dispatch(challengeLoadSingle({idChallenge: this.props.location.state.idChallenge}))
    } else {
      this.props.history.push('/')
    }
  }
  accept(challengeId) {
    this.setState({choosen: true})
    if (
      this.context.websocket
      && challengeId
      && this.props.dataChallenge.amount
      && this.props.dataChallenge.challenger
      && this.props.dataChallenge.opponent
    ) {
      this.context.websocket.emit('acceptance', {
        challengeId,
        amount: this.props.dataChallenge.amount,
        challenger: this.props.dataChallenge.challenger,
        opponent: this.props.dataChallenge.opponent,
        command: 'accept'
      })
    }
  }
  match(challengeId) {
    this.setState({choosen: true})
    if (
      this.context.websocket
      && challengeId
      && this.props.dataChallenge.amount
      && this.props.dataChallenge.challenger
      && this.props.dataChallenge.opponent
    ) {
      this.context.websocket.emit('acceptance', {
        challengeId,
        amount: this.props.dataChallenge.amount,
        challenger: this.props.dataChallenge.challenger,
        opponent: this.props.dataChallenge.opponent,
        command: 'match'
      })
    }
  }
  refuse(challengeId) {
    this.setState({choosen: true})
    if (
      this.context.websocket
      && challengeId
      && this.props.dataChallenge.amount
      && this.props.dataChallenge.challenger
      && this.props.dataChallenge.opponent
    ) {
      this.context.websocket.emit('acceptance', {
        challengeId,
        amount: this.props.dataChallenge.amount,
        challenger: this.props.dataChallenge.challenger,
        opponent: this.props.dataChallenge.opponent,
        command: 'refuse'
      })
    }
  }
  render() {
    // set if the challenger can be matched or not
    let showMatch = true
    if (this.props.dataChallenge && this.props.dataChallenge.theme && this.props.dataChallenge.theme === 'nutrition') {
      if (this.props.dataChallenge && this.props.dataChallenge.challengerDett && this.props.dataChallenge.challengerDett.isBadEater === false) {
        showMatch = false
      }
    } else if (this.props.dataChallenge && this.props.dataChallenge.theme && this.props.dataChallenge.theme === 'tabac') {
      if (this.props.dataChallenge && this.props.dataChallenge.challengerDett && this.props.dataChallenge.challengerDett.isSmoker === false) {
        showMatch = false
      }
    } else if (this.props.dataChallenge && this.props.dataChallenge.theme && this.props.dataChallenge.theme === 'sport') {
      if (this.props.dataChallenge && this.props.dataChallenge.challengerDett && this.props.dataChallenge.challengerDett.isBadSportsMan === false) {
        showMatch = false
      }
    } else if (this.props.dataChallenge && this.props.dataChallenge.theme && this.props.dataChallenge.theme === 'relaxation') {
      if (this.props.dataChallenge && this.props.dataChallenge.challengerDett && this.props.dataChallenge.challengerDett.isStressed === false) {
        showMatch = false
      }
    }
    return (
      <div className="flexed flexFill column">
        { this.props.location && this.props.location.state && this.props.location.state.origin ?
          <Header back={true} backTarget={{ pathname: this.props.location.state.origin, state: {}}} right="remove" title="Vous avez été défié"/>
          :
          <Header back={true} right="remove" title="Vous avez été défié"/>
        }
        <div className="flexed flexFill column alignStretch">
          <div className="scroll_y paddingHorizontal-20">
            { this.props.dataChallenge.challengerDett ?
              <div className="flexed column alignCenter">
                <p className="paddingTop-60 paddingBottom-40 textCenter white fontSize-21">Vous êtes challengé par</p>
                <img
                  src={this.props.dataChallenge.challengerDett && this.props.dataChallenge.challengerDett.image ? this.props.dataChallenge.challengerDett.image : defaultUser}
                  alt="avatar"
                  className="iconSize-100 radiusRound border border_color_7 borderWidth-5 alignSelfCenter marginBottom-5 noShrink"
                />
                <p className="fontSize-21 weight-700 white textCenter">{this.props.dataChallenge.challengerDett && this.props.dataChallenge.challengerDett.firstName}</p>
                <p className="fontSize-21 weight-700 white textCenter">{this.props.dataChallenge.challengerDett && this.props.dataChallenge.challengerDett.familyName}</p>
                <p className="fontSize-23 white weight-300 textCenter paddingTop-20 paddingBottom-10 marginTop-10">Réussirez-vous le défi suivant?</p>
                <p className="fontSize-15 weight-400 paddingVertical-10 white textCenter">{this.props.dataChallenge.subTheme}</p>
                <div>
                  <p className="fontSize-17 weight-300 paddingBottom-20 white textCenter">Pendant <span className="weight-700">{fromHoursToDays(this.props.dataChallenge.lasting)}</span> pour <span className="weight-700">{this.props.dataChallenge.amount} Trick{this.props.dataChallenge.amount !== 1 ? 's' : null}</span></p>
                </div>
                { this.props.dataChallenge && this.props.dataChallenge.opponentDett && this.props.dataChallenge.opponentDett.score && this.props.dataChallenge.opponentDett.score < this.props.dataChallenge.amount ?
                  <div className="paddingVertical-20 paddingHorizontal-20 flexed flexFillradius-8 bg_blur">
                    <p className="white fontSize-15 textCenter">Vous n'avez pas assez de Tricks pour relancer au défi. Cependant vous pouvez toujours le rélever.</p>
                  </div>
                  :
                  null
                }
                {
                  this.props.dataChallenge.programStages
                  && this.props.dataChallenge.programStages.stages
                  && this.props.dataChallenge.programStages.stages[this.props.dataChallenge.programStages.currentStage]
                  && this.props.dataChallenge.programStages.stages[this.props.dataChallenge.programStages.currentStage].time
                  && this.props.dataChallenge.programStages.stages[this.props.dataChallenge.programStages.currentStage].time > this.props.dataChallenge.currentTime + this.props.dataChallenge.lasting * 60 * 60 * 1000
                  ?
                  <div className="flexed alignSelfStretch alignCenter justifySpaceAround">
                    { this.state.choosen === false ?
                      <button
                        onClick={() => this.accept(this.props.dataChallenge._id)}
                        className="bg_color1_medium width_130 paddingVertical-15 radius-25 white fontSize-17 weight-700"
                      >
                        Accepter
                      </button>
                      :
                      null
                    }
                    { /* not to show if the challenger doesn't stop the same vice or if the challenge is fielded 'for' */
                      this.props.dataChallenge.fielded && this.props.dataChallenge.fielded !== 'for' && showMatch === true && this.state.choosen === false && this.props.dataChallenge.opponentDett && this.props.dataChallenge.opponentDett.score && this.props.dataChallenge.opponentDett.score > this.props.dataChallenge.amount ?
                      <button
                        onClick={() => this.match(this.props.dataChallenge._id)}
                        className="bg_color1_medium width_130 paddingVertical-15 radius-25 white fontSize-17 weight-700"
                      >
                        Relancer
                      </button>
                      :
                      null
                    }
                  </div>
                  :
                  <div className="paddingVertical-20 paddingHorizontal-20 marginBottom-15 marginHorizontal-20 radius-8 bg_blur">
                    <p className="textCenter weight-700 fontSize-17 white marginVertical-5">Vous n’avez pas assez de Tricks pour relancer le défi et passer en mode Match !</p>
                    <p className="textCenter weight-300 fontSize-12 white">Cependant vous pouvez toujours relever le défi et tenter de gagner des Tricks !</p>
                  </div>
                }
                { this.state.choosen === false ?
                  <button
                    className="white weight-300 marginVertical-25 fontSize-15"
                    onClick={() => this.refuse(this.props.dataChallenge._id)}
                  >
                    Refuser
                  </button>
                  :
                  <div className="bg_greyMedium width_130 paddingVertical-15 radius-25 flexed alignCenter justifyCentered alignSelfCenter">
                    <p className=" fontSize-15 black">Attendre...</p>
                  </div>
                }
              </div>
              :
              <img
                className="loading"
                alt="loading-icon"
                src={loading}
              />
              }
          </div>
        </div>
      </div>
    )
  }
}
// access context.type to get the store to pass to socket.io initialization
Acceptance.contextTypes = {
  websocket: PropTypes.object
}

function mapStateToProps(state) {
  return {
    dataChallenge: state.challenges.data
  }
}

export default connect(mapStateToProps)(Acceptance)
