import React, { Component } from 'react'
import { connect } from 'react-redux'
import Webcam from 'react-webcam'
import uuid from 'uuid'
/* COMPONENTS */
import Header from '../components/Header'
/* HELPERS */
import { dataURLtoBlob } from '../helpers/toolFuncs'
/* IMAGES */
import upload from '../icons/upload.png'

const userAgent = window.navigator.userAgent

class Freeze extends Component {
  goToPreview(file) {
    let toSend
    // launched from a DetailChallenge page
    if (this.props.location && this.props.location.state && this.props.location.state.challenge && this.props.location.state.challenge._id) { // for the freeze lauched from DettChallenge
      toSend = {
        challenge: this.props.location.state.challenge,
        userId: localStorage.getItem('TrickyAppId'),
        file
      }
    // launched from tabbar
    } else {
      toSend = {
        file
      }
    }
    this.props.history.push({ pathname: '/previewfreeze', state: toSend})
  }
  setRef = (webcam) => {
    this.webcam = webcam
  }
  takePicture = () => {
    const screenShot = this.webcam.getScreenshot()
    const file = {
      uri: dataURLtoBlob(screenShot),
      url: screenShot,
      name: uuid.v4() + '.jpeg',
      type: 'image/jpeg'
    }
    this.goToPreview(file)
  }

  uploadImg(event) {
    const reader = new FileReader()
    reader.readAsDataURL(event.target.files[0])
    reader.onload = (ev) => {
      const file = {
        uri: dataURLtoBlob(ev.target.result),
        url: ev.target.result,
        name: uuid.v4() + '.jpeg',
        type: 'image/jpeg'
      }
      this.goToPreview(file)
    }
  }

  render() {
    // parameters of the camera
    const videoConstraints = {
      facingMode: 'environment',
    }
    return (
      <div className="flexed flexFill column alignStretch">
        { this.props.location && this.props.location.state && this.props.location.state.challenge && this.props.location.state.challenge._id ?
          <Header back={true} right="remove" backTarget={{ pathname: '/detailchallenge', state: { idChallenge: this.props.location.state.challenge._id}}} title="Freeze"/>
          :
          <Header back={true} right="remove" title="Freeze"/>
        }
        <div className="flexed flexFill relativePos">
          <Webcam
            className="imgFillParent"
            audio={false}
            screenshotQuality={0.6}
            ref={this.setRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
          />
          <button
            className="shadowBtn zIndex-2 iconSize-70 radiusRound borderTotal7White absoluteHorCenter bottom-60"
            onClick={() => this.takePicture()}
          />
          { !/Android/.test(userAgent) ?
            <label
              htmlFor="input"
              className="shadowBtn radiusRound bg_color1_blur zindex-1 over_hidden flexed alignCenter justifyCentered iconSize-40 top-30 right-30 white absolutePos"
            >
              <input
                type="file"
                id="input"
                className="hide"
                onChange={(event) => this.uploadImg(event)}
              />
              <img
                className="iconSize-20 zindex-3"
                src={upload}
                alt="upload"
              />
            </label>
            :
            null
          }
        </div>
      </div>
    )
  }
}
export default connect()(Freeze)

