import React from 'react'
import { connect } from 'react-redux'

import { removeAlert } from '../../reducer/alerts'

const removeIc = require('./icones/remove.png')

class Alert extends React.Component {
  constructor() {
    super()
    this.onRemoveAlert = this.onRemoveAlert.bind(this)
  }
  onRemoveAlert() {
    this.props.dispatch(removeAlert(this.props.alert.id))
  }
  render() {
    return (
      <button onClick={this.onRemoveAlert}>
        { this.props.alert.kind === 'danger' ?
          <div className="flexed flexFill paddingVertical-15 paddingHorizontal-15 bg_colorRed_light borderTotal2_color1 radius-8 relativePos marginVertical-3 zIndex-1">

            { this.props.noShowRemove && this.props.noShowRemove === true ? 
            	null
            	:
	            <div className="absolutePos top-4 right-5 zIndex-2">
	              <img
	                src={removeIc}
	                className="twentyIconSize"
                  alt="remove-icon"
	              />
	            </div>
            }
            <p className="white">
              {this.props.alert.text}
            </p>
          </div>
          :
          <div className="flexed flexFill paddingHorizontal-15 paddingVertical-15 bg_color2_medium borderTotal2_color1 radius-8 relativePos zIndex-1 marginVertical-3">
            { this.props.noShowRemove && this.props.noShowRemove === true ? 
            	null
            	:
	            <div className="absolutePos top-4 right-5 zIndex-2">
	              <img
	                src={removeIc}
	                className="twentyIconSize"
                  alt="remove-icon"
	              />
	            </div>
            }
            <p className="white">
              {this.props.alert.text}
            </p>
          </div>
        }
      </button>
    );
  }
}

export default connect()(Alert);
