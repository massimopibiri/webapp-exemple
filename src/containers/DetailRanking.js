import React, { Component } from 'react'
import { connect } from 'react-redux'
/* COMPONENTS */
import Header from '../components/Header'
import ListOpponents from '../components/ListOpponents'
/* ACTION CREATORS */
import { selectedPlayers } from '../reducer/users'
/* IMAGES */
import loading from '../icons/loading1.gif'

let title

class DetailRanking extends Component {
  componentDidMount() {
    //  if the user is logged, load infos
    if (this.props.location && this.props.location.state && this.props.location.state.arg) {
      this.props.dispatch(selectedPlayers(this.props.location.state.arg, this.props.location.state.subArg))    
      if (this.props.location.state.arg === 'themes') {
        title = 'theme ' + this.props.location.state.subArg
      } else if (this.props.location.state.arg === 'services') {
        title = 'service ' + this.props.location.state.subArg
      } else if (this.props.location.state.arg === 'month' && this.props.location.state.subArg === 'current') {
        title = 'mois currant'
      } else if (this.props.location.state.arg === 'month' && this.props.location.state.subArg === 'previous') {
        title = 'mois précedant'
      } else if (this.props.location.state.arg === 'month' && this.props.location.state.subArg === 'before-last') {
        title = 'avant dérnier mois'
      } else if (this.props.location.state.arg === 'program') {
        title = 'classement général'
      }
    } else {
      this.props.history.push('/ranking')
    }
  }
  render() {
    return (
      <div className="flexed flexFill column alignStretch">
        <Header back={true} right="remove" title={title}/>
        { this.props.users ?
          <ListOpponents
            users={this.props.users}
            noFunction={true}
          />
          :
          <img
            className="loading"
            alt="loading-icon"
            src={loading}
          />
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    users: state.users.users
  }
}

export default connect(mapStateToProps)(DetailRanking)
