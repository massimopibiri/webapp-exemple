import React, { Component } from 'react'
import { connect } from 'react-redux'
/* COMPONENTS */
import Header from '../components/Header'
import ListInfos from '../components/ListInfos'
/* LISTS */
import { faq } from '../globals/faq'
/* ACTION CREATORS */
import { selectInfo, showInfo } from '../reducer/infos'

class Infos extends Component {
  constructor() {
    super()
    this.select = this.select.bind(this)
  }
  select(arg, forceOpen) {
    this.props.dispatch(selectInfo(arg))
    if (this.props.show === false) {
      this.props.dispatch(showInfo(true))
    } else if (arg === this.props.arg && this.props.show === true && forceOpen === false) {
      this.props.dispatch(showInfo(false))
    }
  }
  render() {
    return (
      <div className="flexed flexFill column alignStretch">
        <Header back={true} right="remove" title="paramètres"/>
        <div className="flexed flexFill column alignStretch justifyStart">
          <ListInfos
            list={faq}
            selectItem={this.select}
            selected={this.props.arg}
            show={this.props.show}
            // argToDisplay={this.props.argToDisplay}
            // idToDisplay={this.props.idToDisplay}
          />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    show: state.infos.show,
    arg: state.infos.arg

  }
}

export default connect(mapStateToProps)(Infos)
