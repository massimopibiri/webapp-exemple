import React, { Component } from 'react'
import { connect } from 'react-redux'
import { isValidNumber } from 'libphonenumber-js'
/* ACTION CREATORS */
import { savePhoneNumber } from '../reducer/profile'

class FirstExtraInfos extends Component {
  constructor() {
    super()
    this.addNumber = this.addNumber.bind(this)
    this.writeNumber = this.writeNumber.bind(this)
    this.state = {
      telNumber: '',
      clicked: false
    }
  }
  writeNumber(event) {
    const regex = new RegExp(/^[+\d](?:.*\d)?$/) // ==>> just numbers and '+'
    if (event.target.value && event.target.value.length > 0 && regex.test(event.target.value)) {
      this.setState({telNumber: event.target.value})    
    } else if (!event.target.value || event.target.value.length === 0) {
      this.setState({telNumber: ''})
    }
  }
  addNumber() {
    if (isValidNumber(this.state.telNumber)) {
      this.setState({clicked: true})
      this.props.dispatch(savePhoneNumber(this.state.telNumber, 'International'))
      .then(() => {
        this.setState({telNumber: ''})
        this.props.history.push('/firstconfig')
      })
      .catch((error) => {
        this.setState({telNumber: ''})
        console.log(error)
      })
    }
  }
  render() {
    return (
      <div className="flexed flexFill column alignStretch paddingTop-30 paddingBottom-80">
        <div className="marginBottom-50 flexed column alignCenter justifyCentered paddingHorizontal-30 paddingTop-50">
          <p className="fontSize-17 weight-700 white textCenter">Nous utilisont une technologie innovante, mais qui ne permette pas encore d'envoyer des notifications.</p>
          <p className="fontSize-15 white textCenter paddingTop-20">Si vous désirez être prévenus des evenements importants dans vos défis, veuillez enregistrer votre numéro de téléphone ci-dessous.</p>
        </div>
        <div className="flexed column alignStretch justifyCentered paddingHorizontal-30">
          <input type="tel" name="tel" value={this.state.telNumber} className="bg_white radius-25 height-40 paddingHorizontal-25 textCenter" placeholder="ex: +3312479281" onChange={(event) => this.writeNumber(event)}/>
        </div>
        { !this.state.clicked || this.state.clicked === false ?
          <button
            onClick={this.addNumber}
            className="flexed column marginTop-35 paddingHorizontal-25 alignSelfCenter height-40 bg_color1_medium justifyCentered alignCenter white radius-25 width-220"
          >
            Valider
          </button>
          :
          <span
            className="flexed column marginTop-35 paddingHorizontal-25 alignSelfCenter height-40 bg_greyMedium justifyCentered alignCenter white radius-25 width-220"
          >
            ...attendre
          </span>
        }
        <button
          onClick={() => this.props.history.push('/firstconfig')}
          className="flexed column marginTop-15 alignSelfCenter justifyCentered alignCenter white"
        >
          Peut-être plus tard
        </button>
      </div>
    )
  }
}

export default connect()(FirstExtraInfos)
