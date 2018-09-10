import React, { Component } from 'react'
import { connect } from 'react-redux'
import Picker from 'react-mobile-picker'
/* COMPONENTS */
import Header from '../components/Header'
/* ACTION CREATORS */
import { checkpoints } from '../reducer/program'
/* LISTS */
import { pickerBettingValues } from '../globals/challengeLists'
/* HELPERS */
import { limitPointRange } from '../helpers/program'
/* IMAGES */
import loading from '../icons/loading1.gif'

class Betting extends Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      valueGroups: null,
      optionGroups: null
    }
  }
  componentDidMount() {
    // ===============>>> SEND
    if (this.props.location && this.props.location.state && this.props.location.state.selOpponent && this.props.location.state.selTheme && this.props.location.state.selSubTheme && this.props.location.state.selTime) {
      this.props.dispatch(checkpoints({opponentId: this.props.location.state.selOpponent._id}))
      .then((result) => {
        const list = result && result.data && result.data.points ? limitPointRange(pickerBettingValues, result.data.points) : null
        if (list && list.limit && list.limit.length > 0) {
          this.setState(prevState => {
            return {
              optionGroups: list,
              valueGroups: {limit: list.limit[0]}
            }
          }) 
        }
      })
      .catch((error) => {
        console.log(error)
      })
    } else {
      this.props.history.push('/')
    }
  }
  handleChange = (name, value) => {
    this.setState(({valueGroups}) => ({
      valueGroups: {
        ...valueGroups,
        [name]: value
      }
    }))
  }
  selectPoints(fielded) {
    const index = pickerBettingValues.map((val) => {return val.name}).indexOf(this.state.valueGroups.limit)
    const data = {
      idProgram: this.props.location.state.idProgram,
      selOpponent: this.props.location.state.selOpponent,
      selTheme: this.props.location.state.selTheme,
      selSubTheme: this.props.location.state.selSubTheme,
      selTime: this.props.location.state.selTime,
      selPoints: pickerBettingValues[index].val,
      fielded
    }
    this.props.history.push({ pathname: '/endchallenge', state: data })
  }
  render() {
    return (
      <div className="flexed flexFill column">
        { this.props.location && this.props.location.state && this.props.location.state.idProgram && this.props.location.state.selOpponent && this.props.location.state.selTheme && this.props.location.state.selSubTheme ?
          <Header back={true} backTarget={{ pathname: '/lasting', state: { idProgram: this.props.location.state.idProgram, selOpponent: this.props.location.state.selOpponent, selTheme: this.props.location.state.selTheme, selSubTheme: this.props.location.state.selSubTheme}}} right="remove" title="Combien vous pariez ?"/>
          :
          null
        }
        <div className="flexed flexFill column alignStretch justifyCentered">
          { this.state.valueGroups && this.state.optionGroups ?
            <div className="bg_white">
              <Picker
                optionGroups={this.state.optionGroups}
                valueGroups={this.state.valueGroups}
                onChange={this.handleChange}
              />
            </div>
            :
            <img
              className="loading"
              alt="loading-icon"
              src={loading}
            />
          }
          { this.state.valueGroups && this.state.optionGroups ?
            <div className="flexed justifySpaceAround">
              <button
                onClick={() => this.selectPoints('for')}
                className="shadowBtn bg_color1_medium paddingVertical-15 white radius-25 marginTop-25 width-120 fontSize-15 weight-700 uppercase"
              >
                Pour
              </button>
              <button
                onClick={() => this.selectPoints('againts')}
                className="shadowBtn bg_color1_medium paddingVertical-15 white radius-25 marginTop-25 width-120 fontSize-15 weight-700 uppercase"
              >
                Contre
              </button>
            </div>
            :
            null
          }
        </div>
      </div>
    )
  }
}

export default connect()(Betting)
