import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AWS from 'aws-sdk'
/* COMPONENTS */
import Header from '../components/Header'
/* ACTION CREATORS */
import { addAlert } from '../reducer/alerts'
import { getTemporaryAuthorization } from '../reducer/profile'
/* ACTION CREATORS */
// import { addAlert } from '../reducer/alerts'
/* CONFIG */
// import { forFreezes } from '../amazon/config'
/* IMAGES */
import defaultUser from '../icons/avatar.png'

class ConfirmFreeze extends Component {
  constructor() {
    super()
    this.yes = this.yes.bind(this)
    this.non = this.non.bind(this)
    this.getHeader = this.getHeader.bind(this)
    this.chooseBox = this.chooseBox.bind(this)
    this.content = this.content.bind(this)
    this.state = {choosen: false}
  }
  componentDidMount() {
    if (
      !this.props.location
      || !this.props.location.state
      || !this.props.location.state.idChallenge
      || !this.props.location.state.targetId
      || !this.props.location.state.target
      || !this.props.location.state.theme
      || !this.props.location.state.subTheme
      || !this.props.location.state.date
      || !this.props.location.state.lasting
      || !this.props.location.state.amount
      || !this.props.location.state.match
      || (!this.props.location.state.suspectReason && !this.props.location.state.file)
      || !this.props.location.state.challengeType
    ) {
      this.props.history.push('/')
    } else {
      this.props.dispatch(getTemporaryAuthorization()) 
    }
  }
  yes(id) {
    this.setState({choosen: true})
    let data
    if (
      this.props.location
      && this.props.location.state
      && this.props.location.state.challengeType === 'freeze'
      && this.props.location.state.idChallenge
      && this.props.location.state.challengeType
      && this.props.s3auth
      && this.props.s3auth.AccessKeyId
      && this.props.s3auth.SecretAccessKey
      && this.props.s3auth.SessionToken
      && this.props.location.state.file
      && this.props.location.state.file.uri
    ) {
      // pass the temporary authorizations necessary to connect to amazon S3 
      // AWS.config.credentials = new AWS.Credentials(this.props.s3auth.AccessKeyId, this.props.s3auth.SecretAccessKey, this.props.s3auth.SessionToken)
      AWS.config.update({region: 'eu-west-1', credentials: {accessKeyId: this.props.s3auth.AccessKeyId, secretAccessKey: this.props.s3auth.SecretAccessKey, sessionToken: this.props.s3auth.SessionToken}})
      // initialize the object to connect to service
      const s3 = new AWS.S3({apiVersion: '2006-03-01'})
      // set the data to send
      const params = {   
        Body: this.props.location.state.file.uri,
        Bucket: "trickyapp/freezes",
        Key: this.props.location.state.file.name,
        ContentType: 'image/jpeg'
      }

      s3.putObject(params, (err, data) => {
        if (err) {
          this.props.dispatch(addAlert('danger', 'L\'image n\'a pas été uploadée'))
        } else {
          // get the url of the picture saved ===>>> https://stackoverflow.com/questions/44400227/how-to-get-the-url-of-a-file-on-aws-s3-using-aws-sdk
          const urlToSave = 'https://s3-eu-west-1.amazonaws.com/trickyapp/freezes/' + this.props.location.state.file.name
          // store the freeze in the server wit hte link for the picture stored in Amazon-S3
          data = {
            userId: localStorage.getItem('TrickyAppId'),
            idChallenge: this.props.location.state.idChallenge,
            accused: id,
            image: {
              name: this.props.location.state.file.name,
              url: urlToSave
            },
            comment: this.props.location.state.comment,
            challengeType: this.props.location.state.challengeType
          }
          // send data to server for saving the freeze
          if (this.context.websocket) {
            this.context.websocket.emit('saveFreeze', data)
          }
          this.props.history.push({pathname: '/detailchallenge', state: {idChallenge: this.props.location.state.idChallenge}})
        }
      })
    /* SUSPECT */
    } else if (
      this.props.location
      && this.props.location.state
      && this.props.location.state.challengeType === 'suspect'
      && this.props.location.state.idChallenge
      && this.props.location.state.suspectReason
      && this.props.location.state.challengeType
      && this.props.location.state.comment
    ) {
      data = {
        userId: localStorage.getItem('TrickyAppId'),
        idChallenge: this.props.location.state.idChallenge,
        accused: id,
        suspectReason: this.props.location.state.suspectReason,
        comment: this.props.location.state.comment,
        challengeType: this.props.location.state.challengeType
      }
      // send data to server for saving the freeze
      if (this.context.websocket) {
        this.context.websocket.emit('saveFreeze', data)
      }
      this.props.history.push({pathname: '/detailchallenge', state: {idChallenge: this.props.location.state.idChallenge}})
    }
  }
  non() {
    this.props.history.push('/')
  }
  chooseBox() {
    return (
      <div className="flexed column alignCenter justifyCentered marginTop-35 width-220">
        { this.state.choosen === false ?
          <button
            onClick={() => this.yes(this.props.location.state.targetId)}
            className="flexed alignSelfStretch alignCenter justifyCentered bg_color1_medium paddingVertical-15 fullWidth radius-25 white"
          >
            Oui
          </button>
          :
          <div className="bg_greyMedium paddingVertical-15 fullWidth radius-25 flexed alignCenter justifyCentered alignSelfCenter">
            <p className="black">Attendre...</p>
          </div>
        }
        {this.state.choosen === false ?
          <button 
            onClick={this.non}
            className="borderBottomGreyMedium marginTop-15 weight-700 fonstSize-15 black"
          >
            Annuller
          </button>
          :
          null
        }
      </div>
    )
  }
  content() {
    if (
      this.props.location
      && this.props.location.state
      && this.props.location.state.challengeType
      && this.props.location.state.challengeType === 'freeze'
      && this.props.location.state.file
      && this.props.location.state.target
      && this.props.location.state.target.firstName
      && this.props.location.state.target.familyName
    ) {
      return (
        <div className="flexed flexFill column alignCenter justifyCentered paddingHorizontal-15">
          <img
            src={this.props.location.state.file.url}
            alt="freeze-img"
            className="imgFillParent "
          />
          <div className="zIndex-1 width-280 paddingTop-60 paddingBottom-15 flexed column alignCenter radius-8 bg_white">
            <div className="flexed column alignCenter jusitfyCentered">
              <img
                src={this.props.location.state.imageTarget ? this.props.location.state.imageTarget : defaultUser}
                alt="profile-pic"
                className="iconSize-70 borderTotal7GreyMedium radiusRound"
              />
              <p className="fontSize-15 weight-400 paddingTop-10 textCenter">Etes vous sûr(e) de vouloir freezer</p>
              <p className="fontSize-15 weight-700 paddingTop-10 textCenter">{this.props.location.state.target.firstName} {this.props.location.state.target.familyName} ?</p>
            </div>
            { this.chooseBox() }
          </div>
        </div>
      )
    } else if (
      this.props.location
      && this.props.location.state
      && this.props.location.state.challengeType
      && this.props.location.state.challengeType === 'suspect'
      && this.props.location.state.suspectReason
      && this.props.location.state.target
      && this.props.location.state.target.firstName
      && this.props.location.state.target.familyName
    ) {
      return (
        <div className="flexed flexFill column alignCenter justifyCentered paddingHorizontal-15">
          <div className="zIndex-1 width-280 paddingTop-60 paddingBottom-15 flexed column alignCenter radius-8 bg_white">
            <div className="flexed column alignCenter jusitfyCentered">
              <img
                src={this.props.location.state.imageTarget ? this.props.location.state.imageTarget : defaultUser}
                alt="profile-pic"
                className="iconSize-70 borderTotal7GreyMedium radiusRound"
              />
              <p className="fontSize-15 weight-400 paddingTop-10 textCenter">Etes vous sûr(e) de vouloir lancer la suspicion à</p>
              <p className="fontSize-15 weight-700 paddingTop-10 textCenter">{this.props.location.state.target.firstName} {this.props.location.state.target.familyName}</p>
              <p className="fontSize-15 weight-400 paddingTop-10 textCenter">pour la raison suivante :</p>
              <p className="fontSize-15 weight-700 paddingTop-10 textCenter">" {this.props.location.state.suspectReason} "</p>
            </div>
            { this.chooseBox() }
          </div>
        </div>
      )
    }
    return null
  }
  getHeader() {
    if (
      this.props.location
      && this.props.location.state
      && this.props.location.state.suspectReason
      && this.props.location.state.challengeType
      && this.props.location.state.challengeType === 'suspect'
      && this.props.location.state.origin
      && this.props.location.state.origin === 'chall'
      && this.props.location.state.challenge
      && this.props.location.state.challenge.match === true
      && localStorage
      && localStorage.getItem('TrickyAppId') !== this.props.location.state.challenge.challenger
      && localStorage.getItem('TrickyAppId') !== this.props.location.state.challenge.opponent
    ) {
      return (
        <Header
          back={true}
          right="remove"
          backTarget={{
            pathname: '/choosetarget',
            state: {
              challenge: this.props.location.state.challenge, 
              suspectReason: this.props.location.state.suspectReason,
              challengeType: this.props.location.state.challengeType
            }
          }}
          title="Confirmation"
        />
      )
    } else if (
      this.props.location
      && this.props.location.state
      && this.props.location.state.suspectReason
      && this.props.location.state.challengeType
      && this.props.location.state.challengeType === 'suspect'
      && this.props.location.state.origin
      && this.props.location.state.origin === 'chall'
    ) {
      return (
        <Header
          back={true}
          right="remove"
          backTarget={{
            pathname: '/suspect',
            state: {
              challenge: this.props.location.state.challenge
            }
          }}
          title="Confirmation"
        />
      )
    } else if (
      this.props.location
      && this.props.location.state
      && this.props.location.state.suspectReason
      && this.props.location.state.challengeType
      && this.props.location.state.challengeType === 'suspect'
    ) {
      return (
        <Header
          back={true}
          right="remove"
          backTarget={{
            pathname: '/destinationfreeze',
            state: {
              suspectReason: this.props.location.state.suspectReason, 
              challengeType: this.props.location.state.challengeType
            }
          }}
          title="Confirmation"
        />
      )
    } else if (
      this.props.location
      && this.props.location.state
      && this.props.location.state.file
      && this.props.location.state.challengeType
      && this.props.location.state.challengeType === 'freeze'
      && this.props.location.state.origin
      && this.props.location.state.origin === 'chall'
      && this.props.location.state.challenge
      && this.props.location.state.challenge.match === true
      && localStorage
      && localStorage.getItem('TrickyAppId') !== this.props.location.state.challenge.challenger
      && localStorage.getItem('TrickyAppId') !== this.props.location.state.challenge.opponent
    ) {
      return (
        <Header
          back={true}
          right="remove"
          backTarget={{
            pathname: '/choosetarget',
            state: {
              challenge: this.props.location.state.challenge,
              file: this.props.location.state.file,
              challengeType: this.props.location.state.challengeType
            }
          }}
          title="Confirmation"
        />
      )
    } else if (
      this.props.location
      && this.props.location.state
      && this.props.location.state.file
      && this.props.location.state.challengeType
      && this.props.location.state.challengeType === 'freeze'
      && this.props.location.state.origin
      && this.props.location.state.origin === 'chall'
    ) {
      return (
        <Header
          back={true}
          right="remove"
          backTarget={{
            pathname: '/previewfreeze',
            state: {
              challenge: this.props.location.state.challenge,
              file: this.props.location.state.file,
              challengeType: this.props.location.state.challengeType
            }
          }}
          title="Confirmation"
        />
      )
    } else if (
      this.props.location
      && this.props.location.state
      && this.props.location.state.file
      && this.props.location.state.challengeType
      && this.props.location.state.challengeType === 'freeze'
    ) {
      return (
        <Header
          back={true}
          right="remove"
          backTarget={{
            pathname: '/destinationfreeze',
            state: {
              file: this.props.location.state.file, 
              challengeType: this.props.location.state.challengeType
            }
          }}
          title="Confirmation"
        />
      )
    }
    return null
  }
  render() {
    return (
      <div className="flexed flexFill column alignStretch">
        { this.getHeader()}
        { this.content() }
      </div>
    )
  }
}
// access context.type to get the store to pass to socket.io initialization
ConfirmFreeze.contextTypes = {
  websocket: PropTypes.object
}

function mapStateToProps(state) {
  return {
    s3auth: state.profile.s3auth
  }
}

export default connect(mapStateToProps)(ConfirmFreeze)
