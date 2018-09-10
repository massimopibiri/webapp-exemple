import React from 'react'
/* IMAGES */
import avatar from '../icons/avatar.png'

class ListRanking extends React.Component {
  constructor() {
    super()
    this.renderContent = this.renderContent.bind(this)
  }
  renderContent(data, index) {
    const position = parseInt(index, 10) + 1;
    return (
      <div className="flexed alignCenter height-80 bg_blackTrans borderTopGreyMedium paddingHorizontal-15">
        <div className="width-45 flexed column alignStretch">
          <div className="flexed alignStretch">
            <p className="fontSize-23 weight-700 white">{position}</p>
            <p className="fontSize-12 weight-400 white"> {position === 1 ? 'er' : 'éme'}</p>
          </div>
        </div>
        <div className="flexed flexFill alignCenter">
          <img
            src={data.image ? data.image : avatar}
            alt="avatar"
            className="iconSize-40 borderTotal4Color7 radiusRound marginLeft-5 marginRight-10"
          />
          <div className="flexed flexFill column justifyCentered">
            { data._id === this.props.userId ?
              <p className="white fontSize-15"><span className="weight-700">MOI</span></p>
              :
              <p className="white fontSize-15">{data.firstName} {data.familyName}</p>
            }
          </div>
        </div>
        <div className="flexed alignCenter justifyEnd">
          { this.props.origin !== 'challengeDett' ?
            <p className="fontSize-17 borderRight1White paddingRight-5 white">{Math.floor((data.score / this.props.totalScore) * 1000) / 10}%</p>
            :
            null
          }
          <div className="flexed column alignEnd justifyCentered paddingLeft-10">
            <p className="fontSize-23 white weight-700">{data.score}</p>
            <p className="fontSize-10 white weight-300">TRICKS</p>
          </div>
        </div>
      </div>
    )
  }
  render() {
    return (
      <div className="flexed flexFill column alignStretch justifyCentered">
        { !this.props.currentScore && this.props.origin !== 'challengeDett' ?
          <p className="white textCenter paddingVertical-30">Vous n'avez pas encore joué dans la partie</p>
          :
          null
        }
        { this.props.list.map(
          (single, index) => {
            return(
              <div key={single._id}>
                { this.renderContent(single,index) }
              </div>
            )
          }
        )}
      </div>
    )
  }
}

export default ListRanking
