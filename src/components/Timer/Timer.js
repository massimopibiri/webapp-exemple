import React, { Component } from 'react'
import { IntervalEnhance } from './intervalEnhance'
import { calcTime } from '../../helpers/timeFuncs'


// const TimerMixin = require('react-timer-mixin');

class Timer extends Component {
  render(){
    if (this.props.seconds > 0) {
      const timeRes = calcTime(this.props.seconds)
      const styleMain = 'weight-700 ' + this.props.textStyle
      return (
        <p className={styleMain}>{timeRes.days && timeRes.days > 0 ? timeRes.days + ':' : null}{timeRes.hours > 9 ? timeRes.hours : '0' + timeRes.hours}:{timeRes.minutes > 9 ? timeRes.minutes : '0' + timeRes.minutes}:{timeRes.seconds > 9 ? timeRes.seconds : '0' + timeRes.seconds}</p>
      )
    } else {
      return (
        <p className={'weight-700 ' + this.props.textStyle}>Terminé</p>
      )
    }
  }
  _countdown() {
    let timer = function () {
    	let time
      time = this.state.time - 1
      this.setState({time: time})
      if (time > 0) {
        this.setTimeout(timer, 1000) // every second
      } else {
        this.setState({time: 0})
      }
    }
    this.setTimeout(timer.bind(this), 1000)
  }
}

export default IntervalEnhance(Timer)
