import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import remove from './icons/remove.png'
import menu from './icons/menu.png'
import back from './icons/back.png'

class Header extends Component {
  constructor() {
    super()
    this.backButton = this.backButton.bind(this)
    this.burgerButton = this.burgerButton.bind(this)
  }
  backButton() {
    if (this.props.back && this.props.back === true && this.props.backTarget) {
      return(
        <span onClick={() => this.props.history.push(this.props.backTarget)}>
          <img
            src={back}
            className="twentyIconSize"
            alt="remove"
          />
        </span>
      )
    } else if (this.props.back && this.props.back === true) {
      return(
        <span onClick={() => this.props.history.goBack()}>
          <img
            src={back}
            className="twentyIconSize"
            alt="remove"
          />
        </span>
      )
    }
    return null
  }
  burgerButton() {
    if (this.props.right && this.props.right === 'burger') {
      return(
        <Link to="/sidemenu">
          <img
            src={menu}
            className="twentyfiveIconSize"
            alt="menu"
          />
        </Link>
      )
    } else if (this.props.right && this.props.right === 'remove') {
      return (
        <Link to="/">
          <img
            src={remove}
            className="twentyIconSize"
            alt="remove"
          />
        </Link>
      )
    } else {
      return null
    }
  }
  render() {
    return (
      <div className="zIndex-3 flexed fixedBars paddingVertical-5 paddingHorizontal-8 alignCenter bg_color1_medium shadowBottom noShrink">
        <div className="flexed alignCenter justifyCentered widthIcon activeFeedBack radius-5 linkCentered">
          { this.backButton() }
        </div>
        <div className="flexed flexFill alignCenter justifyCentered">
          <p className="white uppercase fontSize-13">{this.props.title}</p>
        </div>
        <div className="flexed alignCenter justifyCentered widthIcon activeFeedBack radius-5 linkCentered">
          { this.burgerButton() }
        </div>
      </div>
    )
  }
}

export default withRouter(Header)