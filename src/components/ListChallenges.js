import React from 'react'
/* COMPONENTS */
import BoardChallengeClickable from './BoardChallengeClickable'
import BoardChallengeNotClickable from './BoardChallengeNotClickable'

class ListChallenges extends React.Component {
  constructor() {
    super()
    this.renderContent = this.renderContent.bind(this)
  }
  renderContent(data) {
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
    const imgBorder = 'fiftyIconSize radiusRound marginBottom-5 ' + borderColor
    // render a not clickable tab if the opponent didn't accept the challenge
    if (specStyle && imgBorder) {
      if (
        (data.challenger === localStorage.getItem('TrickyAppToken') && data.confirmed === false)
        || this.props.origin === 'destFreeze'
      ) {
        return (
          <div className="flexed column alignStretch over_hidden">
            <BoardChallengeNotClickable
              data={data}
              specStyle={specStyle}
              imgBorder={imgBorder}
              userId={localStorage.getItem('TrickyAppId')}
              listFunction={this.props.listFunction}
              origin={this.props.origin}
            />
          </div>
        )
      } else {
        return (
          <div className="flexed column alignStretch over_hidden">
            <BoardChallengeClickable
              data={data}
              specStyle={specStyle}
              imgBorder={imgBorder}
              userId={localStorage.getItem('TrickyAppId')}
              listFunction={this.props.listFunction}
              origin={this.props.origin}
            />
          </div>
        )
      }
    }
  }
  render() {
    return (
      <div className="flexed flexFill column alignStretch scoll_y paddingHorizontal-15">
        { this.props.list.map(
          (chall) => {
            return(
              <div key={chall._id} className="flexed column alignStretch paddingTop-30 noShrink">
                { this.renderContent(chall) }
              </div>
            )
          }
        )}
      </div>
    )
  }
}

export default ListChallenges
