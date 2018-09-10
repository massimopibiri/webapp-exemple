import React, { Component } from 'react'
import { connect } from 'react-redux'
import Picker from 'react-mobile-picker'
/* COMPONENTS */
import Header from '../components/Header'
/* ACTION CREATORS */
import { checklimit } from '../reducer/program'
/* LISTS */
import { pickerLastingValues } from '../globals/challengeLists'
/* HELPERS */
import { limitTimeRange } from '../helpers/program'
/* IMAGES */
import loading from '../icons/loading1.gif'

class Lasting extends Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      valueGroups: null,
      optionGroups: null
    }
  }
  componentDidMount() {
    // ===============>>> SEND => check if the opponent is engaged in some of the subthemes
    if (this.props.location && this.props.location.state && this.props.location.state.selOpponent && this.props.location.state.selTheme && this.props.location.state.selSubTheme) {
      this.props.dispatch(checklimit())
      .then((result) => {
        const list = result && result.data && result.data.timeRemaining && result.data.timeRemaining > 0 ? limitTimeRange(pickerLastingValues, result.data.timeRemaining) : null
        if (list && list.last && list.last.length > 0) {
          this.setState(prevState => {
            return {
              optionGroups: list,
              valueGroups: {last: list.last[0]}
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
  // Update the value in response to user picking event
  handleChange (name, value) {
    this.setState(({valueGroups}) => ({
      valueGroups: {
        ...valueGroups,
        [name]: value
      }
    }))
  }
  selectLast() {
    const index = pickerLastingValues.map((val) => {return val.name}).indexOf(this.state.valueGroups.last)
    const data = {
      idProgram: this.props.location.state.idProgram,
      selOpponent: this.props.location.state.selOpponent,
      selTheme: this.props.location.state.selTheme,
      selSubTheme: this.props.location.state.selSubTheme,
      selTime: pickerLastingValues[index].val
    }
    this.props.history.push({ pathname: '/betting', state: data })
  }
  render() {
    return (
      <div className="flexed flexFill column">
        { this.props.location && this.props.location.state && this.props.location.state.idProgram && this.props.location.state.selOpponent && this.props.location.state.selTheme ?
          <Header back={true} backTarget={{ pathname: '/subtheme', state: { idProgram: this.props.location.state.idProgram, selOpponent: this.props.location.state.selOpponent, selTheme: this.props.location.state.selTheme}}} right="remove" title="Combien de temps ?"/>
          :
          null
        }
        <div className="flexed flexFill column alignStretch justifyCentered">
          { this.state.valueGroups && this.state.optionGroups ?
            <div className="bg_white">
              <Picker
                valueGroups={this.state.valueGroups}
                optionGroups={this.state.optionGroups}
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
            <div className="flexed column alignCenter">
              <button
                onClick={() => this.selectLast()}
                className="shadowBtn bg_color1_medium paddingVertical-15 white radius-25 marginTop-25 width-120 fontSize-15 weight-700 uppercase"
              >
                Parier
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

export default connect()(Lasting)
