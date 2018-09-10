import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
/* COMPONENTS */
import { withInfiniteScroll } from './withInfiniteScroll'
/* HELPERS */
import { timerNotifs, formatTags } from '../helpers/notifs'
/* IMAGES */
import defaultUser from '../icons/avatar.png'
import loading from '../icons/loading1.gif'
import right from '../icons/right-arrow.png'
import tabac from '../icons/tabacBtnSmall.png'
import sport from '../icons/sportBtnSmall.png'
import food from '../icons/foodBtnSmall.png'
import relax from '../icons/relaxBtnSmall.png'

class ListComments extends Component {
  constructor() {
    super()
    this.content = this.content.bind(this)
    this.linkedContent = this.linkedContent.bind(this)
    this.renderContent = this.renderContent.bind(this)
    this.capitalizeAndTags = this.capitalizeAndTags.bind(this)
    this.source = this.source.bind(this)
  }
  capitalizeAndTags(str){
    return str.charAt(0).toUpperCase() + str.slice(1)
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
  linkedContent(data) {
    return(
      <button
        className="flexed alignCenter marginLeft-20 paddingVertical-10 paddingHorizontal-5 marginBottom-10 radius-8 borderLeft4Color2_blur bg_blur_color2_medium"
        onClick={() => {
          this.props.history.push({ pathname: '/detailchallenge', state: { idChallenge: data.challenge._id, origin: this.props.location.pathname }})
        }}
      >
        <div className="iconSize-40 radiusRound relativePos over_hidden">
          <img
            src={this.source(data.challenge.theme)}
            alt="theme-icon"
            className="imgFillParent"
          />
        </div>
        <div className="flexed flexFill column paddingLeft-10 alignStart justifyCentered">
          <p className="black fontSize-15 weight-700 uppercase">{data.challenge.subTheme}</p>
          <p className="black">{data.challenge.challengerName + ' VS ' + data.challenge.opponentName}</p>
        </div>
        <div className="flexed alignSelfCenter iconSize-20 relativePos over_hidden">
          <img
            src={right}
            alt="remove-icon"
            className="imgFillParent"
          />
        </div>
      </button>
    )
  }
  content(rowData) {
    return (
      <div className="flexed flexFill column alignStretch justifyCentered border_vertical_extraBlur_color2_medium">
        <div className="flexed flexFill column bg_white paddingHorizontal-15 paddingVertical-15">
          { rowData.challenge ?
            this.linkedContent(rowData)
            :
            null
          }
          <div className="flexed flexFill alignCenter">
            <div className="fiftyIconSize radius-8 relativePos over_hidden">
              <img
                src={rowData.img ? rowData.img : defaultUser}
                alt="avatar"
                className="imgFillParent"
              />
            </div>
            <div className="flexed flexFill column paddingHorizontal-15">
              <div className="flexed flexFill alignCenter">
                <p className="weight-700 fontSize-12 black">{rowData.firstName}  {rowData.familyName.substring(0, 1) + '.'}</p>
                { this.props.currentTime && rowData.date ?
                  <p className="paddingLeft-10 weight-700 fontSize-11 greyDark uppercase">{timerNotifs(this.props.currentTime, rowData.date)}</p>
                  :
                  null
                }
              </div>
              <p className="weight-400 fontSize-15 black">
                {this.capitalizeAndTags(formatTags(rowData.comment))}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
  renderContent(data) {
    return (
      <div
        className={
          data.commentatorId === this.props.userId
          ?
          'flexed flexFill column alignSelfEnd alignStretch'
          :
          'flexed flexFill column alignStretch'
        }
      >
        { this.content(data) }
      </div>
    )
  }
  render() {
    return (
      <div id="commentsBox" className="flexed flexFill column alignStretch justifyEnd bg_white">
        <div id="scrollPosition" className="flexed column alignStretch scroll_y">
          { /* show loading older feedback */ }
          { this.props.loadingOlder && this.props.loadingOlder === true ?
            <div className="flexed flexFill column alignStretch justifyCentered border_vertical_extraBlur_color2_medium bg_white paddingHorizontal-15 paddingVertical-25">
              <img
                className="miniloading"
                alt="loading-icon"
                src={loading}
              />
            </div>
            :
            null
          }
          { /* render list */ }
          { [...this.props.list].reverse().map(
            (comment) => {
              /*
                infinite scolling -> onEndReached={() => this.props.fetchOlderComments()}
                Invertire l'ordine dei messaggi
              */
              return(
                <div key={comment._id}>
                  { this.renderContent(comment) }
                </div>
              )
            }
          )}
        </div>
      </div>
    )
  }
}

export default withRouter(withInfiniteScroll(ListComments))
