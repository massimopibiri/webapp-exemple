import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
/* COMPONENTS */
import Header from '../components/Header'
import Tabbar from '../components/Tabbar'
/* ACTION CREATORS */
import { authorizeFreeze } from '../reducer/challenges'
import { checkIfExists } from '../reducer/freeze'
/* IMAGES */
import cameraIcon from '../icons/cameraBig.png'
import suspectIcon from '../icons/suspectBig.png'

class IntroFreeze extends React.Component {
  constructor() {
    super()
    this.authorized = this.authorized.bind(this)
  }
  componentDidMount() {
    this.props.dispatch(checkIfExists())
    .then((result) => {
      if (result && result.data) {
        this.props.dispatch(authorizeFreeze(result.data.result))
      }
    })
    .catch((error) => {
      console.log(error)
    })
  }
  authorized() {
    return (
      <div className="flexed flexFill column alignCenter justifySpaceAround">
        <button 
          onClick={() => this.props.history.push('/freeze')}
          className="flexed alignCenter justifyCentered iconSize-200 radiusRound bg_white borderTotal7GreyMedium shadowBtn"
        >
          <img
            src={cameraIcon}
            alt="camera-icon"
            className="iconSize-70"
          />
        </button>
        <button 
          onClick={() => this.props.history.push('/suspect')}
          className="flexed alignCenter justifyCentered iconSize-200 radiusRound bg_white borderTotal7GreyMedium shadowBtn"
        >
          <img
            src={suspectIcon}
            alt="suspect-icon"
            className="iconSize-70"
          />
        </button>
      </div>
    )
  }
  render() {
    return (
      <div className="flexed flexFill column alignStretch">
        <Header back={false} right="burger" title="Lancez un freeze"/>
        { this.props.authorizeFreeze === true ?
          this.authorized()
          :
          <div className="flexed flexFill column alignStretch justifyCenter alignSelfCenter paddingVertical-10 paddingBottom-10 paddingTop-30 marginTop-80">
            <div className="flexed column paddingHorizontal-10 paddingVertical-30 marginHorizontal-20 radius-8 bg_blur">
              <p className="fontSize-15  white textCenter paddingVertical-30">Vous devez participer à un défi pour pouvoir lancer un freeze</p>
            </div>
          </div>
        }
        <Tabbar/>
      </div>
    )
  }
}
// access context.type to get the store to pass to socket.io initialization
IntroFreeze.contextTypes = {
  websocket: PropTypes.object
}

function mapStateToProps(state) {
  return {
    authorizeFreeze: state.challenges.authorizeFreeze
  }
}

export default connect(mapStateToProps)(IntroFreeze)
