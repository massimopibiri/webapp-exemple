import React, { Component } from 'react'
/* COMPONENTS */
import BoardChallengeClickable from '../BoardChallengeClickable'
import BoardChallengeNotClickable from '../BoardChallengeNotClickable'

class SlideChalls extends Component {
  constructor() {
    super()
    this.singleSlide = this.singleSlide.bind(this)
    this.state = { width: 0 }
  }
  singleSlide (data) {
    let baseColor
    switch (data.theme) {
      case 'tabac':
        baseColor = 'bg_color3_medium'
        break
      case 'sport':
        baseColor = 'bg_color4_light'
        break
      case 'nutrition':
        baseColor = 'bg_color2_medium'
        break
      case 'relax':
        baseColor = 'bg_color5_medium'
        break
      case 'custom':
        baseColor = 'bg_color5_medium'
        break
      default: baseColor = 'bg_color3_medium'
    }
    let borderColor
    switch (data.theme) {
      case 'tabac':
        borderColor = 'borderTotal3Color3_medium'
        break
      case 'sport':
        borderColor = 'borderTotal3Color4_light'
        break
      case 'nutrition':
        borderColor = 'borderTotal3Color2_medium'
        break
      case 'relax':
        borderColor = 'borderTotal3Color5_medium'
        break
      case 'custom':
        borderColor = 'borderTotal3Color5_medium'
        break
      default: borderColor = 'borderTotal3Color3_medium'
    }
    const specStyle = 'flexed flexFill paddingVertical-1 paddingHorizontal-10 radius-8 column ' + baseColor
    const imgBorder = 'fiftyIconSize border borderWidth-3 radiusRound marginBottom-5 ' + borderColor
    // render a not clickable tab if the opponent didn't accept the challenge
    if (specStyle && imgBorder) {
      if (data.challenger === localStorage.getItem('TrickyAppToken') && data.confirmed === false) {
        return (
          <div className="flexed column alignCenter">
            <BoardChallengeNotClickable
              data={data}
              specStyle={specStyle}
              imgBorder={imgBorder}
              userId={localStorage.getItem('TrickyAppToken')}
              listFunction={this.props.listFunction}
              origin={this.props.origin}
              forceWidth={true}
            />
          </div>
        )
      } else {
        return (
          <div className="flexed column alignCenter">
            <BoardChallengeClickable
              data={data}
              specStyle={specStyle}
              imgBorder={imgBorder}
              userId={localStorage.getItem('TrickyAppToken')}
              listFunction={this.props.listFunction}
              origin={this.props.origin}
              forceWidth={true}
            />
          </div>
        )
      }
    }
  }
  render() {
    return (
      <div className="slide slideWidth relativePos over_hidden noShrink">
        { this.singleSlide(this.props.listItem) }
      </div>
    )
  }
}

export default SlideChalls
