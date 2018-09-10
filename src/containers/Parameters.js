import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { isValidNumber } from 'libphonenumber-js'
/* COMPONENTS */
import Header from '../components/Header'
/* ACTION CREATORS */
import { addAlert } from '../reducer/alerts'
import { getAllParameters } from '../reducer/params'
import { imageProfile } from '../reducer/profile'
import { savePhoneNumber } from '../reducer/profile'
/* IMAGES */
import goTo from '../icons/left.png'
import defaultImg from '../icons/user.png'

class Parameters extends Component {
  constructor() {
    super()
    this.onWritePsw = this.onWritePsw.bind(this)
    this.updatePsw = this.updatePsw.bind(this)
    this.onWritePhone = this.onWritePhone.bind(this)
    this.updatePhone = this.updatePhone.bind(this)
    this.onWriteSuggestion = this.onWriteSuggestion.bind(this)
    this.sendSuggestion = this.sendSuggestion.bind(this)
    this.state = {
      password: '',
      suggestion: '',
      phone: ''
    }
  }
  componentDidMount() {
    this.props.dispatch(getAllParameters())
    .then((result) => {

      if (result && result.data) {
        if (result.data.image) {
          // initialize the values of the parameters
          this.props.dispatch(imageProfile(result.data.image))
        }
        if (result.data.phoneNumber) {
          this.setState({phone: result.data.phoneNumber})
        } 
      }
    })
    .catch((error) => {
      console.log(error)
    })
  }
  onWritePsw(event) {
    this.setState({password: event.target.value})
  }
  updatePsw() {
    if (this.state.password) {
      if (this.context.websocket) {
        this.context.websocket.emit('changeUserPassword', {psw: this.state.password})
        this.setState({password: ''})
      } else {
        this.props.dispatch(addAlert('danger', 'Veuillez recharger la page'))
      }
    }
  }
  onWritePhone(event) {
    const regex = new RegExp(/^[+\d](?:.*\d)?$/) // ==>> just numbers and '+'
    if (event.target.value && event.target.value.length > 0 && regex.test(event.target.value)) {
      this.setState({phone: event.target.value})    
    } else if (!event.target.value || event.target.value.length === 0) {
      this.setState({phone: ''})
    }
  }
  updatePhone() {
    if (isValidNumber(this.state.phone)) {
      this.props.dispatch(savePhoneNumber(this.state.phone, 'International'))
      .then(() => {
        this.props.dispatch(addAlert('cool', 'Votre numéro de téléphone à été mis à jour'))
      })
      .catch((error) => {
        this.setState({phone: ''})
        console.log(error)
      })
    }
  }
  onWriteSuggestion(event) {
    this.setState({suggestion: event.target.value})
  }
  sendSuggestion() {
    if (this.state.suggestion) {
      if (this.context.websocket) {
        this.context.websocket.emit('sendSuggestion', {txt: this.state.suggestion})
        this.setState({suggestion: ''})
      } else {
        this.props.dispatch(addAlert('danger', 'Veuillez recharger la page'))
      }
    }
  }
  navTab(title) {
    return (
      <button
        className="flexed justifyStart alignCenter noShrink paddingHorizontal-15 height-80 borderBottomGreyMedium"
        onClick={() => this.props.history.push('/genconfig')}
      >
        <p className="fonstSize-13 white flexed flexFill">{title}</p>
        <img
         src={goTo}
         alt="arrow-icon"
         className="iconSize-20 rotate180"
        />
      </button>
    )
  }
  render() {
    return (
      <div className="flexed flexFill column alignStretch">
        <Header back={true} right="remove" title="paramètres"/>
        <div className="flexed flexFill column alignStretch scroll_y">
          {/* change profile */}
          <div className="paddingHorizontal-15 paddingVertical-20 borderBottomGreyMedium">
            <p className="fontSize-13 white">Modifier votre photo de profil</p>
            <div className="flexed flexFill justifyStart alignCenter marginVertical-15">
              <div className="iconSize-70 bg_blur flexed alignCenter justifyCentered alignSelfStart radiusRound borderTotal4Color7 relativePos over_hidden">
                <img
                  src={this.props.imgProfile ? this.props.imgProfile : defaultImg}
                  alt="avatar"
                  className={this.props.imgProfile ? 'imgFillParent' : 'fiftyIconSize'}
                />
              </div>
              <button
                className="shadowBtn bg_color1_medium height-40 flexed column justifyCentered alignCenter paddingHorizontal-25 radius-25 marginLeft-20 white fontSize-15 white weight-700"
                onClick={() => this.props.history.push('/uploadimg')}
              >
                Modifier
              </button>   
            </div>
          </div>
          {/* change password */}
          <div className="height-80 paddingHorizontal-15 paddingVertical-20 borderBottomGreyMedium">
            <p className="fontSize-13 white">Indiquez votre nouveau mot de passe</p>
            <div className="flexed flexFill justifyStart alignCenter marginVertical-15">
              <input
                type="password"
                autoComplete="off"
                placeholder='Nouveau mot de passe'
                ref={(input) => { this.passwordInput = input }}
                onChange={(event) => this.onWritePsw(event)}
                value={this.state.password}
                className="bg_white height-40 radius-25 paddingHorizontal-15 weight-700 fontSize-12"
              />
              <button 
                onClick={this.updatePsw}
                className="shadowBtn flexed alignCenter justifyCentered bg_color1_medium height-40 paddingHorizontal-25 radius-25 marginLeft-20 fontSize-15 white weight-700"
              >
                Confirmer
              </button>
            </div>
          </div>
          {/* change telephone nuber */}
          <div className="height-80 paddingHorizontal-15 paddingVertical-20 borderBottomGreyMedium">
            <p className="fontSize-13 white">Indiquez votre nouveau numero de telephone</p>
            <div className="flexed flexFill justifyStart alignCenter marginVertical-15">
              <input
                type="text"
                autoComplete="off"
                placeholder='Ajoutez votre numéro de téléphone'
                ref={(input) => { this.phoneInput = input }}
                onChange={(event) => this.onWritePhone(event)}
                value={this.state.phone}
                className="bg_white height-40 radius-25 paddingHorizontal-15 weight-700 fontSize-12"
              />
              <button 
                onClick={this.updatePhone}
                className="shadowBtn flexed alignCenter justifyCentered bg_color1_medium height-40 paddingHorizontal-25 radius-25 marginLeft-20 fontSize-15 white weight-700"
              >
                Confirmer
              </button>
            </div>
          </div>
          { this.navTab('Modifier mes déclaratifs de thématiques') }
          {/* change parametres */}
          <div className="flexed column alignStretch justifyCentered">
          </div>
          {/* change parametres */}
          <div className="paddingVertical-20 paddingHorizontal-15 flexed column alignStretch">
            <p className="fontSize-13 white marginBottom-10">Une idée ? Un problème ? Une reccomandation à faire ? Aidez-nous à faire grandir Tricky.</p>
            <p className="fontSize-13 white marginBottom-10">Laissez-nous vos impressions.</p>
            <textarea
              rows={5}
              maxLength={300}
              value={this.state.suggestion}
              ref={(input) => { this.suggestionInput = input }}
              placeholder="Ecrivez une suggestion pour nous aider à améliorer"
              onChange={(event) => this.onWriteSuggestion(event)}
              className="bg_white paddingHorizontal-30 noResize noShrink paddingVertical-20 marginVertical-15 radius-25 black fontSize-13"
            />
            <button 
              onClick={this.sendSuggestion}
              className="shadowBtn noShrink bg_color1_medium height-40 flexed column alignCenter justifyCentered paddingHorizontal-25 radius-25 fontSize-15 white weight-700 marginBottom-35"
            >
              Send Suggestion
            </button>
          </div>
        </div>
      </div>
    )
  }
}
// access context.type to get the store to pass to socket.io initialization
Parameters.contextTypes = {
  websocket: PropTypes.object
}

function mapStateToProps(state) {
  return {
    imgProfile: state.profile.imgProfile
  }
}

export default connect(mapStateToProps)(Parameters)
