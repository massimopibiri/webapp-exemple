import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reset } from 'redux-form'
/* COMPONENTS */
import AccountForm from '../components/AccountForm'
import Header from '../components/Header'
/* ACTION CREATORS */
import { login, recoverPswAct /*, allowSocket */ } from '../reducer/auth'
import { addAlert } from '../reducer/alerts'
/* IMAGES */
import logo from '../icons/logoBig.png'

class Account extends Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      typeOfForm: 'login'
    }
  }
  handleSubmit(data, dispatch) {
    if (data.email && data.password && this.props.history.location.pathname === '/') {

      // ============>>>> TO LOG IN
      dispatch(login(data))
      .then((result) => {
        if (
          result
          && result.token
          && result.userId
          && result.role
        ) {
          dispatch(reset('accountForm'))
        } else {
          dispatch(addAlert('danger', 'Le login n\'était pas possible'))
        }
      })
      .catch((error) => {
        dispatch(addAlert('danger', 'Le login n\'était pas possible'))
      })

    // ============>>>> TO RETRIEVE THE PASSWORD
    } else if (data.email && this.props.history.location.pathname === '/lost') {
      dispatch(recoverPswAct(data))
      .then((result) => {
        dispatch(addAlert('cool', 'Un mail a été envoyé à cet adresse'))
        dispatch(reset('accountForm'))
      })
      .catch((error) => {
        dispatch(addAlert('danger', 'La récuperation du mot de passe n\'était pas possible'))
      })

    } 
  }
  render() {
    return (
      <div className="flexed flexFill column">
        { this.props.history.location.pathname !== '/' ?
          <Header back={true} right="none" title="Mot de passe perdu"/>
          :
          null
        }
        <div className="flexed flexFill column alignStretch scroll_y">
          <img src={logo} alt="logo" className="logoBigSize alignSelfCenter marginTop-35 marginBottom-35"/>
          <AccountForm onSubmit={this.handleSubmit} switchForm={this.onSwitchForm} typeLog={this.props.history.location.pathname} loading={this.props.loading}/>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    loading: state.auth.loading
  }
}

export default connect(mapStateToProps)(Account)
