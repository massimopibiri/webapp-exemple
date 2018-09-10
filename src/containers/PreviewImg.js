import React, { Component } from 'react'
import { connect } from 'react-redux'
import AWS from 'aws-sdk'
/* COMPONENTS */
import Header from '../components/Header'
/* ACTION CREATORS */
import { addAlert } from '../reducer/alerts'
import { getTemporaryAuthorization } from '../reducer/profile'
import { setAvatar } from '../reducer/profile'

class PreviewImg extends Component {
  constructor() {
    super()
    this.getBtn = this.getBtn.bind(this)
    this.state = {clicked: false}
  }
  componentDidMount() {
    if (!this.props.location || !this.props.location.state || !this.props.location.state.file || !this.props.location.state.file.url) {
      this.props.history.push('/uploadimg') 
    }  else {
      this.props.dispatch(getTemporaryAuthorization()) 
    }
  }
  uploadImg() {
    this.setState({clicked: true})
    if (
      this.props.location
      && this.props.location.state
      && this.props.location.state.file
      && this.props.location.state.file.uri
      && this.props.s3auth
      && this.props.s3auth.AccessKeyId
      && this.props.s3auth.SecretAccessKey
      && this.props.s3auth.SessionToken
    ) {
      // pass the temporary authorizations necessary to connect to amazon S3 
      // AWS.config.credentials = new AWS.Credentials(this.props.s3auth.AccessKeyId, this.props.s3auth.SecretAccessKey, this.props.s3auth.SessionToken)
      AWS.config.update({region: 'eu-west-1', credentials: {accessKeyId: this.props.s3auth.AccessKeyId, secretAccessKey: this.props.s3auth.SecretAccessKey, sessionToken: this.props.s3auth.SessionToken}})
      // initialize the object to connect to service
      const s3 = new AWS.S3({apiVersion: '2006-03-01'})
      // set the data to send
      const params = {   
        Body: this.props.location.state.file.uri,
        Bucket: "trickyapp/forProfile",
        Key: this.props.location.state.file.name,
        ContentType: 'image/jpeg'
      }

      s3.putObject(params, (err, data) => {
        if (err) {
          this.props.dispatch(addAlert('danger', 'L\'image n\'a pas été uploadée'))
        } else {
          // get the url of the picture saved ===>>> https://stackoverflow.com/questions/44400227/how-to-get-the-url-of-a-file-on-aws-s3-using-aws-sdk
          const urlToSave = 'https://s3-eu-west-1.amazonaws.com/trickyapp/forProfile/' + this.props.location.state.file.name
          this.props.dispatch(setAvatar(urlToSave))
          .then((result) => {
            this.props.dispatch(addAlert('cool', 'Votre avatar a été enregistré !'))
            this.props.history.push('/parameters')
          })
          .catch((error) => {
            this.props.dispatch(addAlert('danger', 'L\'image n\'a pas été uploadée'))
            this.props.history.push('/parameters')
          })
        }
      })
    } else {
      this.props.dispatch(addAlert('danger', 'L\'action n\'est pas authorisée'))
    }
  }
  getBtn() {
    if (this.state.clicked && this.state.clicked === true) {
      return (
        <span
          className="bg_greyMedium height-40 radius-25 paddingHorizontal-25 flexed column alignCenter justifyCentered white fontSize-15 weight-700 shadowBtn"
        >
          Attednre l'enregistrement
        </span>
      )
    } else if (this.state.clicked === false && !this.props.s3auth) {
      return (
        <span
          className="bg_greyMedium height-40 radius-25 paddingHorizontal-25 flexed column alignCenter justifyCentered white fontSize-15 weight-700 shadowBtn"
        >
          Attednre SVP
        </span>
      )
    } else {
      return (
        <button 
          onClick={() => this.uploadImg()}
          className="bg_color1_medium height-40 radius-25 paddingHorizontal-25 flexed column alignCenter justifyCentered white fontSize-15 weight-700 shadowBtn"
        >
          Choisir cette image
        </button>
      )
    }
  }
  render() {
    return (
      <div className="flexed flexFill column">
        <Header back={true} right="remove" title="l'image t'arrange ?"/>
        <div className="flexed flexFill column alignCenter justifyCentered">
          <div className="iconSize-140 radiusRound over_hidden borderTotal5Color7 relativePos">
            { this.props.location && this.props.location.state && this.props.location.state.file && this.props.location.state.file.url ?
              <img
                src={this.props.location.state.file.url}
                alt="preview-avatar"
                className="imgFillParent"
              />
              :
              null
            }
          </div>
        </div>
        <div className="height-150 flexed column alignCenter justifyCentered">
          { this.getBtn() }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    s3auth: state.profile.s3auth
  }
}

export default connect(mapStateToProps)(PreviewImg)

