import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
/* ICONS */
import home from '../icons/home.png'
import homeSel from '../icons/homeTab.png'
import bell from '../icons/bell.png'
import bellSel from '../icons/notifTab.png'
import chat from '../icons/chat.png'
import chatSel from '../icons/chatTab.png'
import thunder2 from '../icons/thunder2.png'
import thunder2Sel from '../icons/freezeTab.png'
import ranking from '../icons/ranking.png'
import ranking_r from '../icons/ranking-r.png'

const itemTabStyle = "flexed flexFill alignCenter justifyCentered linkCentered"

class Tabbar extends Component {
  constructor() {
    super()
    this.getContent = this.getContent.bind(this)
  }
  getContent() {
    if (this.props.routerToShow && this.props.routerToShow === 'matchOn') {
      return (
        <div className="flexed flexFill">
          <div className={this.props.history.location.pathname === '/home' ? itemTabStyle + ' bg_colorPrimaryMediumLight' : itemTabStyle}>
            <Link to="/home">
              <img
                src={this.props.history.location.pathname === '/home' ? homeSel : home}
                className="twentyfiveIconSize"
                alt="network"
              />
            </Link>
          </div>
          <div className={this.props.history.location.pathname === '/chat' ? itemTabStyle + ' bg_colorPrimaryMediumLight' : itemTabStyle}>
            <Link to="/chat">
              <img
                src={this.props.history.location.pathname === '/chat' ? chatSel : chat}
                className="twentyfiveIconSize"
                alt="notif"
              />
            </Link>
          </div>
          <div className={this.props.history.location.pathname === '/notifications' ? itemTabStyle + ' bg_colorPrimaryMediumLight' : itemTabStyle}>
            <Link to="/notifications">
              <div className="twentyfiveIconSize relativePos">
                <img
                  src={this.props.history.location.pathname === '/notifications' ? bellSel : bell}
                  className="twentyfiveIconSize"
                  alt="notif"
                />
                { this.props.nbNewNotifs && this.props.nbNewNotifs > 0 ?
                  <span className="fontSize-12 white bg_color1_medium paddingHorizontal-5 paddingVertical-2 radius-8 absolutePos top--5 right--11">{this.props.nbNewNotifs}</span>
                  :
                  null
                }
              </div>
            </Link>
          </div>
          <div className={this.props.history.location.pathname === '/introfreeze' ? itemTabStyle + ' bg_colorPrimaryMediumLight' : itemTabStyle}>
            <Link to="/introfreeze">
              <img
                src={this.props.history.location.pathname === '/introfreeze' ? thunder2Sel : thunder2}
                className="twentyfiveIconSize"
                alt="notif"
              />
            </Link>
          </div>
        </div>
      )
    } else {
      return (
        <div className="flexed flexFill">
          <div className={this.props.history.location.pathname === '/chat' ? itemTabStyle + ' bg_colorPrimaryMediumLight' : itemTabStyle}>
            <Link to="/chat">
              <img
                src={this.props.history.location.pathname === '/chat' ? chatSel : chat}
                className="twentyfiveIconSize"
                alt="network"
              />
            </Link>
          </div>
          <div className={this.props.history.location.pathname === '/notifications' ? itemTabStyle + ' bg_colorPrimaryMediumLight' : itemTabStyle}>
            <Link to="/notifications">
              <div className="twentyfiveIconSize relativePos">
                <img
                  src={this.props.history.location.pathname === '/notifications' ? bellSel : bell}
                  className="twentyfiveIconSize"
                  alt="notif"
                />
                { this.props.nbNewNotifs && this.props.nbNewNotifs > 0 ?
                  <span className="fontSize-12 white bg_color1_medium paddingHorizontal-5 paddingVertical-2 radius-8 absolutePos top--5 right--11">{this.props.nbNewNotifs}</span>
                  :
                  null
                }
              </div>
            </Link>
          </div>
          <div className={this.props.history.location.pathname === '/ranking' ? itemTabStyle + ' bg_colorPrimaryMediumLight' : itemTabStyle}>
            <Link to="/ranking">
              <img
                src={this.props.history.location.pathname === '/ranking' ? ranking_r : ranking}
                className="twentyfiveIconSize"
                alt="ranking"
              />
            </Link>
          </div>
        </div>
      )
    }
  }
  render() {
    return (
      <div className="zIndex-3 flexed fixedBars bg_white shadoxTop">
        { this.getContent() }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    nbNewNotifs: state.notifications.nbNewNotifs,
    routerToShow: state.auth.routerToShow
  }
}

export default withRouter(connect(mapStateToProps)(Tabbar))