import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
/* IMAGES */
import cameraIcon from '../icons/cameraBig.png'
import suspectIcon from '../icons/suspectBig.png'
import thunder from '../icons/thunder.png'

class ExtraTabbar extends Component {
  render() {
    return (
      <div className="flexed  justifySpaceAround alignCenter fixedBars fullWidth absolutePos left-0 bottom-0 bg_white zIndex-3 shadoxTop">
        <button
          className="flexed justifyCentered alignCenter"
          onClick={() => this.props.history.push({
            pathname: '/freeze',
            state: {challenge: this.props.challenge}
          })}
        >
          <img
            src={cameraIcon}
            alt="freeze-icon"
            className="iconSize-30"
          />
        </button>
        <div className="flexed alignCenter justifyCentered iconSize-30 bg_greyMedium radiusRound alignSelfCenter">
          <img
            src={thunder}
            alt="thunder-icon"
            className="twentyIconSize"
          />
        </div>
        <button
          className="flexed justifyCentered alignCenter"
          onClick={() => this.props.history.push({
            pathname: '/suspect',
            state: {challenge: this.props.challenge}
          })}
        >
          <img
            src={suspectIcon}
            alt="suspect-icon"
            className="iconSize-30"
          />
        </button>
      </div>
    )
  }
}

export default withRouter(ExtraTabbar)
