import React from 'react'
/* IMAGES */
import avatar from '../icons/avatar.png'

class ParticipationSummary extends React.Component {
  constructor() {
    super()
    this.renderContent = this.renderContent.bind(this)
  }
  renderContent(data) {
    let role
    const indexChallenger = this.props.list.map((single) => {return single.fielded}).indexOf('challenger')
    const indexOpponent = this.props.list.map((single) => {return single.fielded}).indexOf('opponent')

    if (data.fielded === 'opponent' && indexChallenger < 0 && data._id === this.props.userId) { // opponent did not start a match
      role = 'j\'ai été défié'
    } 
    else if (data.fielded === 'opponent' && indexChallenger < 0) {
      role = 'a été défié'
    } 
    else if (data.fielded === 'opponent' && indexChallenger >= 0 && data._id === this.props.userId) {
      role = 'j\'ai été défié(e) et j\'ai relancé'
    } 
    else if (data.fielded === 'opponent' && indexChallenger >= 0) {
      role = 'a été défié(e) et a relancé'
    } 
    else if (data.fielded === 'challenger' && indexChallenger < 0 && data._id === this.props.userId) {
      role = 'j\'ai défié'
    } 
    else if (data.fielded === 'challenger' && indexChallenger < 0) {
      role = 'a défié'
    } 
    else if (data.fielded === 'challenger' && indexChallenger >= 0 && data._id === this.props.userId) {
      role = 'j\'ai défié(e) et j\'ai été relancé'
    } 
    else if (data.fielded === 'challenger' && indexChallenger >= 0) {
      role = 'a défié et a été relancé(e)'
    } 
    else if (data.fielded === 'againts' && indexChallenger < 0 && data._id === this.props.userId) {
      role = 'j\'ai misé pour la défaite'
    } 
    else if (data.fielded === 'againts' && indexChallenger < 0) {
      role = 'a misé pour la défaite'
    } 
    else if (data.fielded === 'againts' && indexChallenger >= 0 && data._id === this.props.userId) {
      role = 'j\'ai misé pour ' + this.props.list[indexChallenger].firstName
    } 
    else if (data.fielded === 'againts' && indexChallenger >= 0) {
      role = 'a misé pour ' + this.props.list[indexChallenger].firstName
    } 
    else if (data.fielded === 'both' && data._id === this.props.userId) {
      role = 'j\'ai misé pour la victoire des deux'
    } 
    else if (data.fielded === 'both') {
      role = 'a misé pour la victoire des deux'
    } 
    else if (data.fielded === 'for' && indexChallenger < 0 && data._id === this.props.userId) {
      role = 'j\'ai misé pour la réussite'
    } 
    else if (data.fielded === 'for' && indexChallenger < 0) {
      role = 'a misé pour la réussite'
    } 
    else if (data.fielded === 'for' && indexChallenger >= 0 && data._id === this.props.userId) {
      role = 'j\'ai misé pour ' + this.props.list[indexOpponent].firstName
    } 
    else if (data.fielded === 'for' && indexChallenger >= 0) {
      role = 'a misé pour ' + this.props.list[indexOpponent].firstName
    } 
    else {
      role = ''
    }
    return (
      <div className="flexed alignCenter paddingVertical-10 bg_blackTrans marginBottom-2">
        <img
          src={data.image ? data.image : avatar}
          alt="avatar"
          className="iconSize-40 border borderWidth-4 border_color_7 radiusRound marginLeft-20 marginRight-10"
        />
        <div className="flexed flexFill column justifyCentered">
          { data._id === this.props.userId ?
            <p className="white fontSize-15"><span className="weight-700">MOI</span></p>
            :
            <p className="white fontSize-15">{data.firstName} {data.familyName}</p>
          }
          <p className="white fontSize-12 weight-300"><span className="weight-700">{role}</span></p>
        </div>
        <div className="flexed column alignEnd justifyCentered paddingRight-20 paddingLeft-10">
          <p className="fontSize-23 white weight-700">{data.amount}</p>
          <p className="fontSize-10 white weight-300">TRICKS</p>
        </div>
        <div className="flexed column alignEnd justifyCentered paddingRight-20 paddingLeft-10">
          <p className="fontSize-23 white weight-700">{data.score}</p>
          <p className="fontSize-10 white weight-300">TRICKS</p>
        </div>
      </div>
    )
  }
  render() {
    return (
      <div className="flexed flexFill column alignStretch justifyCentered">
        { this.props.list.map(
          (single) => {
            return(
              <div key={single._id}>
                { this.renderContent(single) }
              </div>
            )
          }
        )}
      </div>
    )
  }
}

export default ParticipationSummary
