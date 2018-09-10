import React, { Component } from 'react'
import { reset } from 'redux-form'
/* COMPONENTS */
import Header from '../components/Header'
import TextAreaForm from '../components/TextAreaForm'

class CustomTheme extends Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(data, dispatch) {
    if (
      data
      && data.customChall
      && data.customChall.length > 0
      && this.props.location
      && this.props.location.state
      && this.props.location.state.idProgram
      && this.props.location.state.selOpponent
      && this.props.location.state.selTheme
    ) {
      const dataToSave = {
        idProgram: this.props.location.state.idProgram,
        selOpponent: this.props.location.state.selOpponent,
        selTheme: this.props.location.state.selTheme,
        selSubTheme: data.customChall
      }
      // always reset the form
      dispatch(reset('textareaForm'))
      this.props.history.push({ pathname: '/lasting', state: dataToSave })
    }
  }
  render() {
    return (
      <div className="flexed flexFill column alignStretch">
        { this.props.location && this.props.location.state && this.props.location.state.idProgram && this.props.location.state.selOpponent ?
          <Header back={true} backTarget={{ pathname: '/theme', state: { idProgram: this.props.location.state.idProgram, selOpponent: this.props.location.state.selOpponent}}} right="remove" title="Précisez votre défi"/>
          :
          null
        }
        { !this.props.location || !this.props.location.state || !this.props.location.state.selOpponent || !this.props.location.state.selTheme ?
          <div className="fullWidth flexed column alignCenter  paddingHorizontal-15">
            <p className="white fontSize-17 textCenter paddingVertical-30 paddingHorizontal-30">Cet accès n'est pas autorisé.</p>
              <button
                onClick={() => {
                  this.props.history.push('/')
                }}
                className="marginTop-6 bg_color1_medium radius-15 flexed alignCenter justifyCentered alignSelf white fontSize-17 paddingVertical-20 paddingHorizontal-20"
              >
                Retour à la home
              </button>
          </div>
          :
          <div className="paddingHorizontal-15">
            <p className="marginTop-55 white marginBottom-10 fontSize-15 textCenter">Ecrivez le contenu du défi :</p>
            <TextAreaForm onSubmit={this.handleSubmit}/>
          </div>
        }
      </div>
    )
  }
}

export default CustomTheme
