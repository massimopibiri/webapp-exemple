import React, { Component } from 'react'
import { connect } from 'react-redux'
/* COMPONENTS */
import Header from '../components/Header'
import ListChallenges from '../components/ListChallenges'
/* ACTION CREATORS */
import { loadChallenges } from '../reducer/challenges'
import { challengeToFreeze } from '../reducer/freeze'

class DestinationFreeze extends Component {
  constructor() {
    super()
    this.chooseFreezed = this.chooseFreezed.bind(this)
  }
  componentDidMount() {
    if (!this.props.location || !this.props.location.state || !this.props.location.state.challengeType) {
      this.props.history.push('/')
    }
    this.props.dispatch(challengeToFreeze())
    .then((result) => {
      this.props.dispatch(loadChallenges(result.data.challengesWithNames))
    })
    .catch((error) => {
      console.log(error)
    })
  }
	chooseFreezed(dataChallenge, target) {
		if (dataChallenge) {
      if (this.props.location.state.challengeType === 'freeze') {
        this.props.history.push({pathname: '/confirmfreeze', state: {
          idChallenge: dataChallenge._id,
          targetId: target === 'challenger' ? dataChallenge.challenger : dataChallenge.opponent,
          target:  target === 'challenger' ? dataChallenge.nameChallenger : dataChallenge.nameOpponent,
          imageTarget: target === 'challenger' ? dataChallenge.imageChallenger : dataChallenge.imageOpponent,
          theme: dataChallenge.theme,
          subTheme: dataChallenge.subTheme,
          date: dataChallenge.date,
          lasting: dataChallenge.lasting,
          amount: dataChallenge.amount,
          file: this.props.location.state.file,
          comment: this.props.location.state.comment,
          challengeType: this.props.location.state.challengeType,
          match: dataChallenge.match
        }})
      } else {
        this.props.history.push({pathname: '/confirmfreeze', state: {
          idChallenge: dataChallenge._id,
          targetId: target === 'challenger' ? dataChallenge.challenger : dataChallenge.opponent,
          target:  target === 'challenger' ? dataChallenge.nameChallenger : dataChallenge.nameOpponent,
          imageTarget: target === 'challenger' ? dataChallenge.imageChallenger : dataChallenge.imageOpponent,
          theme: dataChallenge.theme,
          subTheme: dataChallenge.subTheme,
          date: dataChallenge.date,
          lasting: dataChallenge.lasting,
          amount: dataChallenge.amount,
          suspectReason: this.props.location.state.suspectReason,
          comment: this.props.location.state.comment,
          challengeType: this.props.location.state.challengeType,
          match: dataChallenge.match
        }})
      }
		}
	}
  render() {
    return (
      <div className="flexed flexFill column">
        { this.props.location && this.props.location.state && this.props.location.state.challengeType && this.props.location.state.challengeType === 'freeze' ?
          <Header back={true} right="remove" backTarget={{
            pathname: '/previewfreeze',
            state: {
              file: this.props.location.state.file,
              challengeType: this.props.location.state.challengeType,
              comment: this.props.location.state.comment
            }
          }} title="Selectionner un utilisateur"/>
          :
          <Header back={true} right="remove" backTarget={{
            pathname: '/suspect',
            state: {}
          }} title="Selectionner un utilisateur"/>
        }
        <ListChallenges
          list={this.props.listChallenges}
          listFunction={this.chooseFreezed}
          origin='destFreeze'
        />
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    listChallenges: state.challenges.list
  }
}

export default connect(mapStateToProps)(DestinationFreeze)
