import React, { Component } from 'react'
/* COMPONENTS */
import Timer from './Timer/Timer'
/* IMAGES */
import defaultUser from '../icons/avatar.png'
import tabac from '../icons/tabacBtnSmall.png'
import sport from '../icons/sportBtnSmall.png'
import food from '../icons/foodBtnSmall.png'
import relax from '../icons/relaxBtnSmall.png'
import vs1 from '../icons/vs1.png'

export default class BoardChallengeClickable extends Component {
  constructor() {
    super()
    this.reverseCount = this.reverseCount.bind(this)
    this.source = this.source.bind(this)
    this.formatRole = this.formatRole.bind(this)
  }
  reverseCount(currentTime, finishing, confirmed, won) {
    const finish = new Date(finishing).getTime()
    if (finish < currentTime || won === true) {
      return (
        <p className="fontSize-15 weight-700 textCenter">terminé</p>
      )
    } else if (confirmed !== true) {
      return (
        <p className="fontSize-15 textCenter">En attente...</p>
      )
    } else {
      return (
        <Timer
          time={Math.ceil((finish - currentTime) / 1000)} //default starting time
          textStyle="fontSize-13 textCenter" //default color black
          origin='main'
        />
      )
    }
  }
  source(theme) {
    switch (theme) {
      case 'tabac':
        return tabac
      case 'sport':
        return sport
      case 'nutrition':
        return food
      case 'relaxation':
        return relax
      case 'custom':
        return relax
      default:
        return tabac
    }
  }
  formatRole(role, time) {
    if ((role === 'challenger' || role === 'bettor') && time === 'past') {
      return 'aviez';
    } else if ((role === 'challenger' || role === 'bettor') && time === 'present') {
      return 'avez';
    } else if (role === 'opponent' && time === 'past') {
      return 'aviez été';
    } else if (role === 'opponent' && time === 'present') {
      return 'êtes';
    }
  }
  render() {
    // establish betting initial values to show in the board
    const {
      data,
      specStyle,
      imgBorder,
      userId
    } = this.props
    let forBet = 0
    let bothBet = 0
    let againtsBet = 0
    if (
      data.fielded === 'for'
      || (data.fielded === 'againts' && data.match === true)
    ) {
      forBet = data.amount;
    }
    if (data.fielded === 'againts') {
      againtsBet = data.amount;
    }
    // add the values of every fielded bet
    if (data && data.for && data.for.length > 0) {for (let i = 0; i < data.for.length; i++) {forBet += data.for[i].amount;}}
    if (data && data.both && data.both.length > 0) {for (let j = 0; j < data.both.length; j++) {bothBet += data.both[j].amount;}}
    if (data && data.againts && data.againts.length > 0) {for (let k = 0; k < data.againts.length; k++) {againtsBet += data.againts[k].amount;}}
    // if the user betted in the challenge, retrieve the role and the amount
    let betOfUser;
    if (data.for && data.for.map((sg) => {return sg.id}).indexOf(userId) >= 0) {
      betOfUser = data.for[data.for.map((sg) => {return sg.id}).indexOf(userId)].amount;
    } else if (data.both && data.both.map((sg) => {return sg.id}).indexOf(userId) >= 0) {
      betOfUser = data.both[data.both.map((sg) => {return sg.id}).indexOf(userId)].amount;
    } else if (data.againts && data.againts.map((sg) => {return sg.id}).indexOf(userId) >= 0) {
      betOfUser = data.againts[data.againts.map((sg) => {return sg.id}).indexOf(userId)].amount;
    }
    // define if the challenge is finished or not
    let conditionChal;
    if (new Date(data.finishing).getTime() < new Date(data.currentTime).getTime() || data.won === true) {
      conditionChal = 'past';
    } else {
      conditionChal = 'present';
    }
    return (
      <button
        onClick={() => this.props.listFunction(data)}
        className={ this.props.forceWidth && this.props.forceWidth === true ?
          'flexed flexFill column alignStretch relativePos marginTop-35 fullWidth--50 noShrink'
          :
          'flexed flexFill column alignStretch relativePos marginTop-35 noShrink'
        }
      >
        <div className={specStyle}>
          <div className="bg_white">
            <p className="marginTop-25 paddingHorizontal-30 textCenter fontSize-13 weight-700">{data.subTheme}</p>
            <div className="paddingTop-10 flexed flexFill relativePos bg_white">
              { data.match === true ?
                <div className="flexed flexFill column alignCenter justifyStart">
                  <img
                    src={data.imageChallenger ? data.imageChallenger : defaultUser}
                    alt="avatar"
                    className={imgBorder}
                  />
                  { this.props.userId === data.challenger ?
                    <p className="weight-700 fontSize-13">Vous</p>
                    :
                    <p className="weight-700 fontSize-13">{data.nameChallenger && data.nameChallenger.firstName ? data.nameChallenger.firstName : ''}</p>
                  }
                  { this.props.userId !== data.challenger ?
                    <p className="weight-700 fontSize-13">{data.nameChallenger && data.nameChallenger.familyName ? data.nameChallenger.familyName : ''}</p>
                    :
                    <p className="weight-700 fontSize-13"> </p>
                  }
                </div>
                :
                <div className="flexed flexFill column alignCenter justifyStart">
                  <img
                    src={data.imageOpponent ? data.imageOpponent : defaultUser}
                    alt="img_border"
                    className={imgBorder}
                  />
                  { this.props.userId === data.opponent ?
                    <p className="weight-700 fontSize-13">Vous</p>
                    :
                    <p className="weight-700 fontSize-13">{data.nameOpponent && data.nameOpponent.firstName ? data.nameOpponent.firstName : ''}</p>
                  }
                  { this.props.userId !== data.opponent ?
                    <p className="weight-700 fontSize-13">{data.nameOpponent && data.nameOpponent.familyName ? data.nameOpponent.familyName : ''}</p>
                    :
                    <p className="weight-700 fontSize-13"> </p>
                  }
                </div>
              }
              { data.match === true ?
                <div className="marginTop-6 flexed column alignCenter">
                  { this.reverseCount(data.currentTime, data.finishing, data.confirmed, data.won) }
                  <div className="flexed flexFill column fiftyIconSize alignSelfCenter relativePos">
                    <img
                      src={vs1}
                      alt="img_border"
                      className="imgFillParent"
                    />
                  </div>
                  { /* -------- show if the user played in this challenge -------- */ }
                  { betOfUser && data.confirmed !== false && this.props.origin !== 'destFreeze' ?
                    <div><p className="textCenter black">Vous {this.formatRole('bettor', conditionChal)} parié</p><p className="textCenter black"><span className="weight-700">{betOfUser} Tricks</span></p></div>
                    :
                    null
                  }
                  { /* ----------------------------------------------------------------- */ }
                </div>
                :
                null
              }
              { data.match === true ?
                <div className="flexed flexFill column alignCenter justifyStart relativePos">
                  <img
                    src={data.imageOpponent ? data.imageOpponent : defaultUser}
                    alt="img_border"
                    className={imgBorder}
                  />
                  { this.props.userId === data.opponent ?
                    <p className="weight-700 fontSize-13">Vous</p>
                    :
                    <p className="weight-700 fontSize-13">{data.nameOpponent && data.nameOpponent.firstName ? data.nameOpponent.firstName : ''}</p>
                  }
                  { this.props.userId !== data.opponent ?
                    <p className="weight-700 fontSize-13">{data.nameOpponent && data.nameOpponent.familyName ? data.nameOpponent.familyName : ''}</p>
                    :
                    <p className="weight-700 fontSize-13"> </p>
                  }
                </div>
                :
                <div className="flexed flexFill column justifyCentered alignCenter">
                  { this.reverseCount(data.currentTime, data.finishing, data.confirmed, data.won) }
                  <p className="fontSize-17 weight-700 fontItalic black">CHALLENGE</p>
                  { /* -------- show if the user played in this challenge -------- */ }
                  { userId === data.challenger && data.match === false && data.confirmed !== false && this.props.origin !== 'destFreeze' ?
                    <div><p className="textCenter black">Vous {this.formatRole('challenger', conditionChal)} défié pour</p><p className="textCenter black"><span className="weight-700">{data.amount} Tricks</span></p></div>
                    :
                    null
                  }
                  { userId === data.opponent && data.match === false && data.confirmed !== false && this.props.origin !== 'destFreeze' ?
                    <div><p className="textCenter black">Vous {this.formatRole('opponent', conditionChal)} défié</p></div>
                    :
                    null
                  }
                  { betOfUser && data.match === false && data.confirmed !== false && this.props.origin !== 'destFreeze' ?
                    <div><p className="textCenter black">Vous {this.formatRole('bettor', conditionChal)} parié</p><p className="textCenter black"><span className="weight-700">{betOfUser} Tricks</span></p></div>
                    :
                    null
                  }
                  { /* ----------------------------------------------------------------- */ }
                </div>
              }
            </div>
          </div>
          { data.match === true ?
            <div className="bg_white flexed paddingTop-5 paddingBottom-10">
              <div className="flexed flexFill column alignCenter borderRight1Color6">
                <p className="fontSize-13 black"><span className="fontSize-15 weight-700 text">{againtsBet}</span>ts</p>
              </div>
              <div className=" flexed flexFill column alignCenter borderHoriz2Color6">
                <p className="fontSize-13 black"><span className="fontSize-15 weight-700">{bothBet}</span>ts</p>
              </div>
              <div className="flexed flexFill column alignCenter borderLeft1Color6">
                <p className="fontSize-13 black"><span className="fontSize-15 weight-700 text">{forBet}</span>ts</p>
              </div>
            </div>
            :
            <div className="bg_white flexed paddingTop-5 paddingBottom-10">
              <div className="flexed flexFill column alignCenter borderRight1Color6">
                <p className="fontSize-13 black">Défaite</p>
                <p className="fontSize-13 black"><span className="fontSize-15 weight-700 text">{againtsBet}</span>ts</p>
              </div>
              <div className="flexed flexFill column alignCenter">
                <p className="fontSize-13 alignCenter black">Réussite</p>
                <p className="fontSize-13 alignCenter black"><span className="fontSize-15 weight-700 text">{forBet}</span>ts</p>
              </div>
            </div>
          }
        </div>
        <div className="iconSize-40 absoluteHorCenter top--23 radiusRound borderTotal2White">
          <img
            src={this.source(data.theme)}
            alt="img_border"
            className="imgFillParent"
          />
        </div>
      </button>
    )
  }
}
