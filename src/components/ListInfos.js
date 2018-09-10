import React, { Component } from 'react'

class ListInfos extends Component {
  constructor() {
    super()
    this.renderContent = this.renderContent.bind(this)
    this.content = this.content.bind(this)
    this.renderItem = this.renderItem.bind(this)
  }
  renderContent(data) {
    return (
      <div className="flexed column alignStretch justifyCentered paddingVertical-20">
        { data.title ?
          <p className="fonstSize-17 weight-700 white">{data.title}</p>
          :
          null
        }
        { data.txt ?
          <p className="fonstSize-17 white lineHeight-15">{data.txt}</p>
          :
          null
        }
      </div>
    )
  }
  content(item) {
    if (item.arg === this.props.selected) {
      return (
        <div className="flexed flexFill column alignStretch paddingHorizontal-15">
          { item.content.map(
            (single, index) => {
              return (
                <div key={single.id}>
                  { this.renderContent(single, index) }
                </div>
              )
            }
          )}
        </div>
      )
    }
    return null
  }
  renderItem(data, index) {
    return (
      <div className="flexed column alignStretch justifyCentered borderBottomGreyMedium">
        <button
          className={
            data.arg === this.props.selected
            ?
            'flexed column alignCenter justifyCentered height-80 bg_blackTrans paddingHorizontal-15'
            :
            'flexed column alignCenter justifyCentered height-80 paddingHorizontal-15'
          }
          onClick={() => this.props.selectItem(data.arg, false)}
        >
          <p className="fontSize-21 weight-700 white">{data.title}</p>
        </button>
        { this.props.show === true ?
          this.content(data)
          :
          null
        }
      </div>
    )
  }
  render() {
    return (
      <div className="flexed flexFill column alignStretch">
        <div className="flexed flexFill column alignStretch scroll_y">
          { this.props.list.map(
            (data, index) => {
              return (
                <div key={data.id}>
                  { this.renderItem(data, index) }
                </div>
              )
            }
          )}
        </div>
      </div>
    )
  }
}

export default ListInfos
