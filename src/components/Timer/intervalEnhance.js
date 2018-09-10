import React from 'react'

export let IntervalEnhance = ComposedComponent => class extends React.Component {
  static displayName = 'ComponentEnhancedWithIntervalHOC'
  constructor(props) {
    super(props)
    this.state = {
      seconds: this.props.time > 0 ? this.props.time : 0,
    }
  }
  componentDidMount() {
    this.interval = setInterval(this.tick.bind(this), 1000)
  }
  componentWillUnmount() {
    clearInterval(this.interval)
  }
  tick() {
    if (this.state.seconds > 0) {
      this.setState({
        seconds: this.state.seconds - 1
      })
    }
  }
  render() {
    return <ComposedComponent {...this.props} {...this.state} />;
  }
}
