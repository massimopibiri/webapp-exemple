import React from 'react'
/* IMAGES */
import remove from '../icons/remove-violet.png'
import tabac from '../icons/tabacBtnSmall.png'
import sport from '../icons/sportBtnSmall.png'
import food from '../icons/foodBtnSmall.png'
import relax from '../icons/relaxBtnSmall.png'

class LinkedChall extends React.Component {
  constructor() {
    super()
    this.source = this.source.bind(this)
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
      default:
        return tabac
    }
  }
  render() {
    return (
      <div
        className={this.props.authorizeTag === true
          ?
          'flexed alignCenter justifyCentered noShrink paddingHorizontal-20 bg_dirtyWhite paddingBottom-10zIndex-1 paddingVertical-10 zIndex-1 borderTopGreyMedium'
          :
          'flexed alignCenter justifyCentered noShrink paddingHorizontal-20 bg_dirtyWhite paddingBottom-10 borderTop1Color-2 paddingVertical-10 zIndex-1 radius-top-8'
        }
      >
        <div className="iconSize-35 radiusRound relativePos">
          <img
            src={this.source(this.props.challenge.theme)}
            alt="challenge-icon"
            className="imgFillParent"
          />
        </div>
        <div className="flexed flexFill column paddingLeft-20">
          <p className="greyDark fontSize-15 uppercase weight-700">{this.props.challenge.subTheme}</p>
          <p className="black fontSize-13 marginTop-6">{this.props.challenge.nameChallenger.firstName + ' VS ' + this.props.challenge.nameOpponent.firstName}</p>
        </div>
        <button
          className="iconSize-15 relativePos"
          onClick={() => {
            this.props.removeHashTag();
          }}
        >
          <img
            src={remove}
            alt="remove-icon"
            className="imgFillParent"
          />
        </button>
      </div>
    )
  }
}

export default LinkedChall