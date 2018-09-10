import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
/* COMPONENTS */
import Header from '../components/Header'
/* ACTION CREATORS */
import { currentScore } from '../reducer/profile'
/* IMAGES */
import thunder from '../icons/thunder.png'
import logo from '../icons/logoBig.png'
import checked from '../icons/checkedDark.png'

class Bonus extends Component {
  constructor() {
    super()
    this.checked = this.checked.bind(this)
    this.action = this.action.bind(this)
  }
  componentDidMount() {
    this.props.dispatch(currentScore())
  }
  checked(type) {
    if (!this.props.done || this.props.done.map((item) => {return item}).indexOf(type) < 0) {
      return (
        <div className="iconSize-30 radiusRound bg_greyMedium borderTotal2GreyMedium"/>
      )
    } else {
      return (
        <div className="iconSize-30 radiusRound bg_color1_medium borderTotal2GreyMedium relativePos over_hidden flexed alignCenter justifyCentered">
          <img
            src={checked}
            alt="check-icon"
            className="iconSize-20"
          />
        </div>
      )
    }
  }
  action(type, txt, value) {
    return (
      <div className="flexed paddingVertical-15 noShrink paddingHorizontal-15">
        <div className="flexed column justifyCentered alignCenter">
          { this.checked(type) }
        </div>
        <div className="flexed flexFill column justifyCentered alignStart paddingHorizontal-15"><p className="white fontSize-15">{txt}</p></div>
        <div className="flexed column justifyCentered alignCenter">
          <p className="fontSize-28 white weight-700">{value}</p>
          <p className="fontSize-11 white uppercase marginTop--5">Tricks</p>
        </div>
      </div>
    )
  }
  render() {
    return (
      <div className="flexed flexFill column alignStretch">
        <Header back={true} right="remove" title="gagnez des tricks !"/>
        <div className="flexed flexFill column alignStretch scroll_y">
          <div className="flexed column alignCenter justifyCentered noShrink paddingVertical-30">
            <div className="flexed alignSelfCenter iconSize-200-225 relativePos">
              <img
                src={logo}
                alt="logo"
                className="imgFillParent"
              />
            </div>
            <p className="textCenter fontSize-28 marginTop-25 white">Gagnez des Tricks !</p>
            <p className="textCenter fontSize-17 marginTop-25 white paddingHorizontal-30">Aujourd'hui vous avez déjà gagné:</p>
            <p className="textCenter fontSize-45 weight-700 marginTop-5 white paddingHorizontal-30">{this.props.score ? this.props.score : '---'}</p>
            <p className="textCenter fontSize-19 weight-400 white marginTop--10 uppercase">Tricks</p>
          </div>
          <div className="paddingHorizontal-20 flexed column alignSTretch justifyCentered noShrink">
            <p className="textCenter fontSize-17 marginTop-25 white paddingHorizontal-30">Pour gagner plus de Tricks, valider les actions suivantes:</p>
          </div>

          { this.action('avatar', 'Ajouter un avatar', 40) }
          { this.action('challenge', 'Lancer un challenge', 30) }
          { this.action('match', 'Relancer un adversaire lors d\'un défi', 60) }
          { this.action('bet', 'Parier des points dans un défi', 20) }
          { this.action('win', 'Remporter un défi', 80) }

          <div className="noShrink bg_blackTrans height-300 paddingHorizontal-20 flexed column alignStretch justifyCentered relativePos marginTop-35">
            <div className="iconSize-40 radiusRound bg_greyMedium alignSelfCenter over_hidden relativePos flexed column alignCenter justifyCentered">
              <img
                src ={thunder}
                alt="thunder-icon"
                className="twentyfiveIconSize"
              />
            </div>
            <div className="flexed column aignCenter justifyCentered">
              <p className="textCenter fontSize-17 marginTop-25 white paddingHorizontal-30">Les freezes vous permettent de gagner<span className="weight-700"> 100 Tricks </span>si ils sont validés.</p>
              <p className="textCenter fontSize-17 marginTop-25 white paddingHorizontal-30">Attention à ne pas en abuser en réalisant des faux freezes...</p>
              <p className="textCenter fontSize-17 marginTop-25 white paddingHorizontal-30">ou c'est la pénalité!</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
// access context.type to get the store to pass to socket.io initialization
Bonus.contextTypes = {
  websocket: PropTypes.object
}

function mapStateToProps(state) {
  return {
    score: state.profile.score,
    done: state.profile.done
  }
}

export default connect(mapStateToProps)(Bonus)
