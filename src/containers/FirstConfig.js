import React, { Component } from 'react'
import { connect } from 'react-redux'
/* COMPONENTS */
import ConfigBox from '../components/ConfigBox'
/* ACTION CREATORS */
import { setSmoker, setBadEater, setBadSportsMan, setStressed, setThemes } from '../reducer/params'

class FirstConfig extends Component {
  constructor() {
    super()
    this.onSetSmoker = this.onSetSmoker.bind(this)
    this.onSetBadEater = this.onSetBadEater.bind(this)
    this.onSetBadSportsMan = this.onSetBadSportsMan.bind(this)
    this.onSetStressed = this.onSetStressed.bind(this)
    this.validation = this.validation.bind(this)
  }
  componentDidMount() {
    // reset all values
    this.props.dispatch(setSmoker(false))
    this.props.dispatch(setBadEater(false))
    this.props.dispatch(setBadSportsMan(false))
    this.props.dispatch(setStressed(false))
  }
  onSetSmoker() {
    this.props.dispatch(setSmoker(!this.props.isSmoker))
  }
  onSetBadEater() {
    this.props.dispatch(setBadEater(!this.props.isBadEater))
  }
  onSetBadSportsMan() {
    this.props.dispatch(setBadSportsMan(!this.props.isBadSportsMan))
  }
  onSetStressed() {
    this.props.dispatch(setStressed(!this.props.isStressed))
  }
  validation() {
    // save the parameters (called without socket)
    this.props.dispatch(setThemes({isSmoker: this.props.isSmoker, isBadEater: this.props.isBadEater, isBadSportsMan: this.props.isBadSportsMan, isStressed: this.props.isStressed}))
    .then((result) => {
      if (result && result.data && result.data.result && result.data.result === true) {
        localStorage.setItem('TrickyAppfirstConnection', 'main')
        this.props.history.push('/')
      }
    })
    .catch((error) => {
      // this.props.history.push('/login')
    })
  }
  render() {
    return (
      <div className="flexed flexFill column alignStretch paddingTop-30 paddingBottom-80">
        <div className="height-30 marginBottom-50 flexed column alignCenter justifyCentered marginTop-10">
          <p className="fontSize-17 white">Définissez vos paramètres : </p>
        </div>
        <ConfigBox
          onSetSmoker={this.onSetSmoker}
          isSmoker={this.props.isSmoker}
          onSetBadEater={this.onSetBadEater}
          isBadEater={this.props.isBadEater}
          onSetBadSportsMan={this.onSetBadSportsMan}
          isBadSportsMan={this.props.isBadSportsMan}
          onSetStressed={this.onSetStressed}
          isStressed={this.props.isStressed}
        />
        <button 
          onClick={this.validation}
          className="flexed column marginTop-35 paddingHorizontal-25 alignSelfCenter height-50 bg_color1_medium justifyCentered alignCenter white radius-25 width-220"
        >
          Valider
        </button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    isSmoker: state.params.isSmoker,
    isBadEater: state.params.isBadEater,
    isBadSportsMan: state.params.isBadSportsMan,
    isStressed: state.params.isStressed
  }
}

export default connect(mapStateToProps)(FirstConfig)
