import React, { Component } from 'react'
/* SETTINGS */
import { defaultValues } from '../globals/setting'

let lastScrollTop = 0

export let withInfiniteScroll = ComposedComponent => class extends Component {
  constructor() {
    super()
    this.onScroll = this.onScroll.bind(this)
    this.state= {
      boxHeight: 0,
      direction: 'up'
    }
  }
  componentDidMount() {
    window.addEventListener('scroll', this.onScroll, true)
    this.setState({boxHeight: document.getElementById('commentsBox').offsetHeight})
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, true)
  }

  onScroll = () => {
    // console.log(document.getElementById('scrollPosition').scrollTop)
    // console.log(document.getElementById('scrollPosition').scrollHeight - this.state.boxHeight - 300)
    // establish direction
    const st = window.pageYOffset || document.getElementById('scrollPosition').scrollTop
    if (this.props.loadingNewer === false && st > lastScrollTop){
       // downscroll
       this.setState({direction: 'down'})
    } else {
       // upscroll
       this.setState({direction: 'up'})
    }
    lastScrollTop = st <= 0 ? 0 : st

    // fetch new data when missing half page
    if (
      this.state.direction === 'up'
      && document.getElementById('scrollPosition').scrollTop <= (this.state.boxHeight / 2)
      && this.props.list
      && this.props.list.length >= defaultValues.nbOfCommentsPerPage
      && this.props.loadingOlder === false
    ) {
      this.props.fetchOlderData()

    } else if (
      this.state.direction === 'down'
      && document.getElementById('scrollPosition').scrollTop >= (document.getElementById('scrollPosition').scrollHeight - this.state.boxHeight - (this.state.boxHeight / 2))
      && this.props.list
      && this.props.list.length >= defaultValues.nbOfCommentsPerPage
      && this.props.loadingNewer === false
    ) {
      this.props.fetchNewerData()
    }
  }

  render() {
    return <ComposedComponent {...this.props} />
  }
}
