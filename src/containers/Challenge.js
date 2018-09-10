import React, { Component } from 'react'
import { connect } from 'react-redux'
/* COMPONENTS */
import Header from '../components/Header'
import ListOpponents from '../components/ListOpponents'
/* ACTION CREATORS */
import { getAllPlayers } from '../reducer/challenges'
import { loadAllPlayers } from '../reducer/users'
/* IMAGES */
import loading from '../icons/loading1.gif'

class Challenge extends Component {
  constructor() {
    super()
    this.selectOpponent = this.selectOpponent.bind(this)
  }
  componentDidMount() {
    if (localStorage && localStorage.getItem('TrickyAppIdProgram')) {
      // ===============>>> SEND => retrieve data
      this.props.dispatch(getAllPlayers({idProgram: localStorage.getItem('TrickyAppIdProgram')}))
      .then((result) => {
        // write the result of the api call in the internat state
        this.props.dispatch(loadAllPlayers(result.data.programUsers))
      })
      .catch((error) => {
        console.log(error)
      })
    } else {
      // this.props.dispatch(addAlert('danger', 'Sorry, but an error occurred during loading'));
    }
    // reset the push notification action to avoid redirecting again 
    // this.props.dispatch(resetPushNotifAction())
  }
  selectOpponent(data) {
    if (data) {
      this.props.history.push({ pathname: '/theme', state: { selOpponent: data, idProgram: localStorage.getItem('TrickyAppIdProgram') } })
    }
  }
  render() {
    return (
      <div className="flexed flexFill column alignStretch">
        { this.props.location && this.props.location.state && this.props.location.state.origin ?
          <Header back={true} backTarget={{ pathname: this.props.location.state.origin, state: {}}} right="remove" title="Challengez un joueur"/>
          :
          <Header back={true} right="remove" title="Challengez un joueur"/>
        }
        { this.props.users ?
          <ListOpponents
            users={this.props.users}
            selectOpponent={this.selectOpponent}
            noFunction={false}
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

export default connect(mapStateToProps)(Challenge)
