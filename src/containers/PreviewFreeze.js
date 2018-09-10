import React, { Component } from 'react'
import { connect } from 'react-redux'
/* COMPONENTS */
import Header from '../components/Header'
/* ACTION CREATORS */
import { toogleBox } from '../reducer/tools'
/* HELPERS */
import { formatTags } from '../helpers/notifs'
/* IMAGES */
import pencil from '../icons/pencil.png'
import valid from '../icons/valid.png'

class PreviewFreeze extends Component {
  constructor() {
    super()
    this.onConfirm = this.onConfirm.bind(this)
    this.onShowCommentbox = this.onShowCommentbox.bind(this)
    this.state = {comment: ''}
  }
  componentDidMount() {
    this.props.dispatch(toogleBox(true))
    this.setState({comment: ''})
    if (!this.props.location || !this.props.location.state || !this.props.location.state.file) {
      this.props.history.push('/freeze') 
    }
  }
  onShowCommentbox() {
    this.props.dispatch(toogleBox(this.props.show))
  }
  onConfirm() {
    const type = 'freeze'
    // datinationfreeze is used for both suspiction and freeze, as the following three pages
    /* ORIGIN FROM DETAIL CHALLENGE */
    if (
      this.props.location
      && this.props.location.state
      && this.props.location.state.challenge
      && this.props.location.state.challenge._id
      && this.props.location.state.file
    ) {
      // if the player has just one choice, avoid following step
      if (this.props.location.state.challenge.match === true && localStorage && localStorage.getItem('TrickyAppId') !== this.props.location.state.challenge.challenger && localStorage.getItem('TrickyAppId') !== this.props.location.state.challenge.opponent) {
        this.props.history.push({ pathname: '/choosetarget', state: { // for the freeze lauched from DettChallenge
          file: this.props.location.state.file,
          challengeType: type,
          comment: this.state.comment,
          challenge: this.props.location.state.challenge
        }})
      } else {
        this.props.history.push({ pathname: '/confirmfreeze', state: {
          idChallenge: this.props.location.state.challenge._id,
          targetId: this.props.location.state.challenge.match === false || (localStorage && localStorage.getItem('TrickyAppId') === this.props.location.state.challenge.challenger) ? this.props.location.state.challenge.opponent : this.props.location.state.challenge.challenger,
          target:  this.props.location.state.challenge.match === false || (localStorage && localStorage.getItem('TrickyAppId') === this.props.location.state.challenge.challenger) ? this.props.location.state.challenge.opponentDett : this.props.location.state.challenge.challengerDett,
          imageTarget: this.props.location.state.challenge.match === false || (localStorage && localStorage.getItem('TrickyAppId') === this.props.location.state.challenge.challenger) ? this.props.location.state.challenge.opponentDett.image : this.props.location.state.challenge.challengerDett.image,
          theme: this.props.location.state.challenge.theme,
          subTheme: this.props.location.state.challenge.subTheme,
          date: this.props.location.state.challenge.date,
          lasting: this.props.location.state.challenge.lasting,
          amount: this.props.location.state.challenge.amount,
          file: this.props.location.state.file,
          challengeType: type,
          match: this.props.location.state.challenge.match,
          challenge: this.props.location.state.challenge,
          origin: 'chall'
        }})
      }
    /* ORIGIN FROM TABBAR */
    } else if(
      this.props.location
      && this.props.location.state
      && this.props.location.state.file
    ) {
      this.props.history.push({ pathname: '/destinationfreeze', state: {
        file: this.props.location.state.file,
        challengeType: type,
        comment: this.state.comment
      }})
    }
  }
  onWriteComment(event) {
    this.setState({comment: event.target.value})
  }
  render() {
    return (
      <div className="flexed flexFill column alignStretch">
        { this.props.location && this.props.location.state && this.props.location.state.challenge && this.props.location.state.challenge._id ?
          <Header back={true} right="remove" backTarget={{ pathname: '/freeze', state: { challenge: this.props.location.state.challenge}}} title="Preview"/>
          :
          <Header back={true} right="remove" title="Preview"/>
        }
        <div className="flexed flexFill relativePos">
          { this.props.location && this.props.location.state && this.props.location.state.file && this.props.location.state.file.url ?
            <img
              src={this.props.location.state.file.url}
              alt="preview-freeze"
              className="imgFillParent"
            />
            :
            null
          }
        </div>
        { this.props.show === false ?
          <button
            className="opacity-6 absolutePos left-60 bottom-70 iconSize-30"
            onClick={this.onShowCommentbox}
          >
            <img
              src={pencil}
              alt="pencil-icon"
              className="imgFillParent"
            />
          </button>
          :
          null
        }
        <button
          className="opacity-6 absolutePos right-40 bottom-60 fiftyIconSize"
          onClick={this.onConfirm}
        >
          <img
            src={valid}
            alt="valid-icon"
            className="imgFillParent"
          />
        </button>
        { this.props.show === true ?
          <input
            type="text"
            autoFocus
            autoComplete="off"
            // onKeyUp={this.handleKey}
            value={formatTags(this.state.comment)}
            placeholder="Ecrivez un commentaire..."
            onChange={(event) => this.onWriteComment(event)}
            className="absolutePos left-0 bottom-0 fullWidth bg_blackSemiTrans paddingHorizontal-10 white height-50 fontSize-15"
          />
          :
          null
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    show: state.tools.show
  }
}

export default connect(mapStateToProps)(PreviewFreeze)
