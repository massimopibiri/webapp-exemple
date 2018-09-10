import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import { Link } from 'react-router-dom'

const lower = value => value && value.toLowerCase()

const renderInput = (field) => (  // Define stateless component to render input and errors
  <div>
    <input {...field.input} type={field.type} placeholder={field.placeholder} autoComplete="off" autoFocus={field.autoFocus}/>
    {field.meta.touched &&
     field.meta.error &&
     <span className="error">{field.meta.error}</span>}
  </div>
)

class AccountForm extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    handleSubmit: PropTypes.func
  }
  render() {
    let btnTxt
    switch (this.props.typeLog) {
      case '/lost':
        btnTxt = 'Récuperer'
        break
      default:
        btnTxt = 'Se connecter'
    }
    return (
      <form className="flexed paddingHorizontal-40 column alignStretch" onSubmit={this.props.handleSubmit}>
        <Field type="hidden" id="_id" name="_id" component={renderInput}/>
        <div className="input marginBottom-15">
          <Field name="email" component={renderInput} type="text" id="email" placeholder="Adresse mail" autoFocus={true} normalize={lower}/>
        </div>
        <div className="input marginBottom-15">
          { this.props.typeLog === '/' ?
            <Field name="password" component={renderInput} type="password" id="password" placeholder="Mot de passe" autoFocus={false}/>
            :
            null
          }
        </div>
        { !this.props.loading || this.props.loading === false ?
          <button
            className="noShrink activeFeedBack fontSize-17 white radius-25 textCenter paddingVertical-10 shadowBottom bg_color1_medium bordersNone  marginBottom-15"
            type="submit"
          >
            {btnTxt}
          </button>
          :
          <span className="noShrink activeFeedBack fontSize-17 white radius-25 textCenter paddingVertical-10 shadowBottom bg_greyMedium bordersNone  marginBottom-15">
            {btnTxt}
          </span>
        }
        { this.props.typeLog === '/' ?
          <div className="linkCentered linkColor">
            <Link to="/lost">
              mot de passe perdu
            </Link>
          </div>
          :
          null
        }
      </form>
    )
  }
}

export default reduxForm({
  form: 'accountForm'
  // validate: memberValidation
})(AccountForm)
