import React from 'react'
import { connect } from 'react-redux'
import Alert from './Alert'

class ContainerAlerts extends React.Component {
  render() {
    const renderAlerts = () => {
      return this.props.alerts.map((alert) => {
        return (
          <Alert alert={alert} key={alert.id} />
        )
      })
    }
    return (
      <div className="flexed flexFill column paddingHorizontal-15 absolutePos top-60 horiz-0">
        { renderAlerts() }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    alerts: state.alerts
  }
}

export default connect(mapStateToProps)(ContainerAlerts)
