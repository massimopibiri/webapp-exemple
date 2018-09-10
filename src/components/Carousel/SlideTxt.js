import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
/* IMAGES */
// import logo from '../../icons/logoBig.png'
// import fond from '../../icons/city.png'
// import sparkling from '../../icons/fond.png'
import ecran_2 from '../../icons/Ecran_2.png'
import ecran_3 from '../../icons/Ecran_3.png'
import ecran_4 from '../../icons/Ecran_4.png'
import ecran_5 from '../../icons/Ecran_5.png'

class SlideTxt extends Component {
  constructor() {
    super()
    this.imgToDisplay = this.imgToDisplay.bind(this)
    this.singleSlide = this.singleSlide.bind(this)
  }
  imgToDisplay(nb) {
    switch (nb) {
      case 1:
        return ecran_2
      case 2:
        return ecran_3
      case 3:
        return ecran_4
      case 4:
        return ecran_5
      default:
        return ecran_2
    }
  }
  singleSlide (data) {
    if (data.id >=  0 &&  data.id < 5) {
      return (
        <div className="fullWidth fullHeight over_hidden">
          <div className="fullWidth height-150">
            <h2 className="fontSize-21 textCenter white marginTop-35 paddingHorizontal-30">{data.id + '/' + this.props.nbSlides} <span className="weight-700">{data.txt_1}</span></h2>
            <p className="white fontSize-17 textCenter marginVertical-10 paddingHorizontal-30">{data.txt_2}</p>
          </div>
          <img src={this.imgToDisplay(data.id)} alt="tutorial-img" className="sliderImg"/>
        </div>
      ) 
    } else if (data.id >= 0 && data.id === 5 && this.props.task && this.props.task === 'firstintro') {
      return(
        <div className="fullHeight flexed column alignStretch justifyCentered paddingHorizontal-40">
          <h2 className="fontSize-21 textCenter white marginTop-35"><span className="weight-700">{data.txt_1}</span></h2>
          <button
            onClick={() => this.props.history.push('/firstExtraInfos')}
            className="height-50 bg_color1_medium flexed column justifyCentered alignCenter paddingHorizontal-30 radius-25 marginTop-25 white"
          >
            C'est parti
          </button>
        </div>
      )
    }
    return null
  }
  render() {
    return (
      <div className="slide slideWidth relativePos bg_gradiant over_hidden">
        { this.singleSlide(this.props.listItem) }
      </div>
    )
  }
}

export default withRouter(SlideTxt)
