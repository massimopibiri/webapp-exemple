import React from 'react'
/* IMAGES */
import defaultUser from '../icons/avatar.png'
/* HELPERS */
import { formatPosition } from '../helpers/toolFuncs'

class ListOpponents extends React.Component {
  constructor() {
    super()
    this.renderContent = this.renderContent.bind(this)
  }
  renderContent(data, index) {
    if (this.props.noFunction === false) {
      return (
        <button
          className="fullWidth marginTop-6 borderBottomWhite marginTop-2 paddingVertical-10 flexed alignCenter"
          onClick={() => this.props.selectOpponent(data)}
        >
          <img
            src={data.image ? data.image : defaultUser}
            alt="avatar"
            className="fiftyIconSize border borderWidth-4 border_color_7 radiusRound marginHorizontal-20"
          />
          <p className="flexed flexFill white fontSize-17 paddingVertical-15">
            {data.firstName + ' ' + data.familyName}
          </p>
        </button>
      )
    } else {
      const val = formatPosition(index + 1)
      return (
        <div
          className="noShrink borderBottomWhite paddingVertical-10 paddingHorizontal-15 flexed alignCenter"
        >
          <div className="noShrink flexed alignCenter justifyStart paddingRight-10 width-45">
            <p className="white fontSize-26 weight-700">{val.nb}</p>
            <p className="fontSize-15 white">{val.card}</p>
          </div>
          <div className="noShrink fiftyIconSize borderTotal4Color7 radiusRound marginRight-10 relativePos over_hidden">
            <img
              src={data.image ? data.image : defaultUser}
              alt="avatar"
              className="imgFillParent"
            />
          </div>
          <p className="noShrink flexed flexFill white fontSize-17 paddingVertical-15">
            {data.firstName + ' ' + data.familyName}
          </p>
          <div className="noShrink flexed column alignEnd justifyCentered">
            <p className="fontSize-28 weight-700 white">{data.score}</p>
            <p className="fontSize-12 weight-300 white textRight marginTop--5">TRICKS</p>
          </div>
        </div>
      )
    }
  }
  render() {
    return (
      <div className="flexed column flexFill alignStretch scroll_y">
        {this.props.users.map((user, index) => {
          return(
            <div key={user._id} className="flexed column alignStretch justifyCentered">
              { this.renderContent(user, index) }
            </div>
          )
        })}
      </div>
    )
  }
}

export default ListOpponents
