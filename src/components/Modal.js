/* eslint-disable import/first */
import React, { Component } from 'react'

class Modal extends Component {
  render() {
    // Render nothing if the "show" prop is false
    if (this.props.show && this.props.show === 'hashTag') {
      return (
        <div
          onClick={() => this.props.onClose('none')}
          className="absolutePos horiz-0 vert-0 flexed flexFill zIndex-2 bg_blackTrans paddingVertical-75 paddingHorizontal-25"
        >
          <div className="radius-20 flexed flexFill column alignStretch paddingVertical-30 paddingHorizontal-15 relativePos bg_color1_medium borderTotal2_color1_extralight">
            { /* CROSS ICON */ }
              <span
                className="absolutePos right--15 top--23 crossIcon"
                onClick={() => this.props.onClose('none')}
              >
                <span/>
              </span>
            { /* --------- */ }
            {this.props.children}
          </div>
        </div>
      )
    }
    return null
  }
}

export default Modal
