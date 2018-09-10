import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Slide from './Slide'
import SlideTxt from './SlideTxt'
import SlideChalls from './SlideChalls'
import Dots from './Dots'
// import Autoplay from './Autoplay'
import SliderLeftArrow from './SliderLeftArrow'
import SliderRightArrow from './SliderRightArrow'

// https://medium.com/@ItsMeDannyZ/build-an-image-slider-with-react-es6-264368de68e4

export default class Carousel extends Component {
  static propTypes = {
    list: PropTypes.array,
    catchPhrase: PropTypes.string,
    contentType: PropTypes.string
  }

  constructor(props) {
    super(props)
    this.state = {
      index: 0,
      translateValue: 0,
      autoplay: false
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { autoplay } = this.state

    if (autoplay && prevState.autoplay !== autoplay) {
      const xx = window.setInterval(() => {this.goToNextSlide()}, 2500)
      this.setState({interval: xx})
    } else if (!autoplay && prevState.autoplay !== autoplay) {
      const xx = window.clearInterval(this.state.interval)
      this.setState({interval: xx})
    }
  }

  handleDotClick = ii => {
    if (ii === this.state.index) {
      return null
    } else if (ii > this.state.index) {
      return this.setState((prevState, props) => {
        return {
          index: ii,
          translateValue: prevState.translateValue -(ii * this.slideWidth())
        }
      })
    } else if (ii < this.state.index) {
      this.setState((prevState, props) => {
        return {
          index: ii,
          translateValue: prevState.translateValue += ((prevState.index - ii) * (this.slideWidth())) 
        }
      })
    }
  }

  toggleAutoplay = () => this.setState((prevState, props) => { return { autoplay: !prevState.autoplay }})

  goToPreviousSlide = () => {
    if (this.state.index === 0) {
      return null
    }

    this.setState((prevState, props) => {
      return {
        translateValue: prevState.translateValue += this.slideWidth(),
        index: prevState.index -= 1
      }
    })
  }

  goToNextSlide = () => {
    if (this.state.index === this.props.list.length - 1) {
      return this.setState({
        translateValue: 0,
        index: 0
      })
    }

    this.setState((prevState, props) => {
      return {
        translateValue: prevState.translateValue -= this.slideWidth(),
        index: prevState.index += 1
      }
    })
  }

  slideWidth = () => {
    const slide = document.querySelector('.slideWidth')
    return slide.clientWidth
  }

  renderSlides = () => {
    const slides = []
    for (let ii = 0; ii < this.props.list.length; ii++) {
      if (this.props.contentType === 'challenges') {
        slides.push(<SlideChalls key={ii} nb={ii} listItem={this.props.list[ii]} task={this.props.task} nbSlides={this.props.list.length} listFunction={this.props.listFunction}/>)
      } else if (this.props.contentType === 'text') {
        slides.push(<SlideTxt key={ii} nb={ii} listItem={this.props.list[ii]} task={this.props.task} nbSlides={this.props.list.length}/>)
      } else {
        slides.push(<Slide key={ii} listItem={this.props.list[ii].url}/>)
      }
    }
    return slides
  }

  render() {
    const { index, translateValue } = this.state
    // const { index, translateValue, autoplay } = this.state
    return (
      <div className="slider">
        <div className="sliderWrapper"
          style={{
            transform: `translateX(${translateValue}px)`,
            transition: 'transform ease-out 0.45s'
          }}>
          { this.renderSlides() }
        </div>

        { /* <Autoplay toggle={this.toggleAutoplay} autoplay={autoplay} /> */ }
        { !this.props.removeDots || this.props.removeDots !== true ?
          <Dots
            index={index}
            quantity={this.props.list.length}
            dotClick={this.handleDotClick}
          />
          :
          null
        }

        <SliderLeftArrow prevSlide={this.goToPreviousSlide} />
        <SliderRightArrow nextSlide={this.goToNextSlide} />
        { this.props.catchPhrase && this.props.catchPhrase !== '' ?
          <p className="catchPhrase">" {this.props.catchPhrase} "</p>
          :
          null
        }
      </div>
    )
  }
}
