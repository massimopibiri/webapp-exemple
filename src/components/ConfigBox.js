import React, { Component } from 'react'
import Switch from 'react-toggle-switch'

class ConfigBox extends Component {
  render() {
    return (
      <div className="flexed flexFill column alignStretch justifySpaceAround height-300 paddingHorizontal-30">
        <div className="flexed alignCenter justifySpaceBetween">
          <p className="white flexed flexFill">Vous êtes fumeur</p>
          <Switch
            onClick={() => this.props.onSetSmoker(this.props.isSmoker)}
            on={this.props.isSmoker}
            className="switcher"
          />
        </div>
        <div className="flexed alignCenter justifySpaceBetween">
          <p className="white flexed flexFill">Vous avez une mauvaise alimentation</p>
          <Switch
            onClick={() => this.props.onSetBadEater(this.props.isBadEater)}
            on={this.props.isBadEater}
            className="switcher"
          />
        </div>
        { /* <div className="flexed flexFill alignCenter">
          <p className="white">Vous ne faites pas de sport</p>
          <Switch
            onClick={() => this.props.onSetBadSportsMan(this.props.isBadSportsMan)}
            on={this.props.isBadSportsMan}
            className=""
          />
        </div>
        <div className="flexed flexFill alignCenter">
          <p className="white">Vous êtes stressé</p>
          <Switch
            onClick={() => this.props.onSetStressed(this.props.isStressed)}
            on={this.props.isStressed}
            className=""
          />
        </div> */ }
      </div>
    )
  }
}

export default ConfigBox
