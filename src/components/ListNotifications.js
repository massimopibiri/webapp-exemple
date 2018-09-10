import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
/* HELPERS */
import { markSingleNotif, timerNotifs } from '../helpers/notifs'
/* IMAGES */
import tabac from '../icons/tabacBtnSmall.png'
import sport from '../icons/sportBtnSmall.png'
import food from '../icons/foodBtnSmall.png'
import relax from '../icons/relaxBtnSmall.png'
import defaultUser from '../icons/avatar.png'

class ListNotifications extends Component {
  constructor() {
    super()
    this.renderContent = this.renderContent.bind(this)
    this.bonus = this.bonus.bind(this)
    this.selfDetector = this.selfDetector.bind(this)
    this.basicContent = this.basicContent.bind(this)
    this.state ={
      existingList: []
    }
  }

  // change the state everytime the list is updated just to force the component to re-render
  handleRefresh() {
    this.setState({refreshState: !this.state.refreshState})
  }
  bonus(bonus) {
    return (
      <span className="textLeft fontSize-15 marginLeft-10 black">et vous avez gagné un bonus de <span className="fontSize-15 weight-700">{bonus} Tricks !</span></span>
    )
  }
  // function to replace the name with a subject
  selfDetector(userId, referenceId, firstName, familyName) {
    if (userId === referenceId) {
      return 'vous'
    } else {
      return firstName + ' ' + familyName
    }
  }
  basicContent(rowData, imgAdapted, innerBox, iconToDisplay) {

    if (rowData.action === 'pendingChallenge' && rowData.opponent === localStorage.getItem('TrickyAppId')) {

      // ---------------------- informs the opponent of a pending Challenge ----------------//
      return (
        <div className={innerBox}>
          <div className={imgAdapted}>
            <img
              src={rowData.playerImage ? rowData.playerImage : defaultUser}
              alt="thumb"
              className="imgFillParent"
            />
          </div>
          <div className="flexed column flexFill relativePos">
            <div className="absolutePos top-4 left-10 twentyfiveIconSize radiusRound zIndex-3 over_hidden">
              <img src={iconToDisplay} alt="thumb" className="imgFillParent"/>
            </div>
            <p className="textLeft weight-700 fontSize-12 marginBottom-5 greyDark paddingLeft-10 uppercase">{timerNotifs(rowData.currentTime, rowData.date)} :</p>
            <p className="textLeft fontSize-15 marginLeft-10">
              <span className="fontSize-15 weight-700">{rowData.playerFamilyName}</span> vous a <span className="fontSize-15 weight-700">défié</span>
            </p>
            <p className="textLeft fontSize-15 marginLeft-10">Acceptez ou refusez le defi !</p>
          </div>
        </div>
      )
    } else if ((rowData.action === 'chalAccepted' || rowData.action === 'chalMatched') && rowData.player !== localStorage.getItem('TrickyAppId')) {

    // ---------------------- informs the opponent of a pending Challenge ----------------//

      return (
        <div className={innerBox}>
          <div className={imgAdapted}>
            <img
              src={rowData.playerImage ? rowData.playerImage : defaultUser}
              alt="thumb"
              className="imgFillParent"
            />
          </div>
          <div className="flexed column flexFill relativePos">
            <div className="absolutePos top-4 left-10 twentyfiveIconSize radiusRound zIndex-3 over_hidden"><img src={iconToDisplay} alt="thumb" className="imgFillParent"/></div>
            <p className="textLeft weight-700 fontSize-12 marginBottom-5 greyDark paddingLeft-10 uppercase uppercase">{timerNotifs(rowData.currentTime, rowData.date)} :</p>
            {!this.props.currentChallengeId && rowData.opponent !== localStorage.getItem('TrickyAppId') && rowData.player !== localStorage.getItem('TrickyAppId') ?
              <div className="flexed column flexFill relativePos">
                <p className="textLeft fontSize-15 marginLeft-10">
                  <span className="fontSize-15 weight-700">{rowData.playerFirstName} {rowData.playerFamilyName}</span> a défié <span className="fontSize-15 weight-700">{rowData.opponentFirstName} {rowData.opponentFamilyName}</span>
                </p>
                <p className="textLeft fontSize-12 marginTop-10 color-1 weight-700 flexed alignSelfEnd textRight uppercase">Rejoindre le défi...</p>
              </div>
              :
              null
            }
            {!this.props.currentChallengeId && rowData.player === localStorage.getItem('TrickyAppId') ?
              <p className="textLeft fontSize-15 marginLeft-10">
                <span className="fontSize-15 weight-700">Vous</span> avez lancé ce défié {rowData.preference} <span className="fontSize-15 weight-700">{rowData.opponentFirstName} {rowData.opponentFamilyName}</span>
              </p>
              :
              null
            }
            {!this.props.currentChallengeId && rowData.opponent === localStorage.getItem('TrickyAppId') ?
              <p className="textLeft fontSize-15 marginLeft-10">
                Vous avez <span className="fontSize-15 weight-700">{rowData.action === 'chalAccepted' ? 'accepté' : 'relancé'}</span> le défi de <span className="fontSize-15 weight-700">{rowData.playerFirstName} {rowData.playerFamilyName}</span>
              </p>
              :
              null
            }
            {this.props.currentChallengeId && this.props.currentChallengeId === rowData.challengeId && rowData.opponent !== localStorage.getItem('TrickyAppId') && rowData.player !== localStorage.getItem('TrickyAppId') ?
              <p className="textLeft fontSize-15 marginLeft-10">
                <span className="fontSize-15 weight-700">{rowData.playerFirstName} {rowData.playerFamilyName}</span> a lancé ce défi contre <span className="fontSize-15 weight-700">{rowData.opponentFirstName} {rowData.opponentFamilyName}</span>
              </p>
              :
              null
            }
            
            {this.props.currentChallengeId && this.props.currentChallengeId === rowData.challengeId && rowData.opponent === localStorage.getItem('TrickyAppId') ?
              <p className="textLeft fontSize-15 marginLeft-10">
                Vous avez <span className="fontSize-15 weight-700">{rowData.action === 'chalAccepted' ? 'accepté' : 'relancé'}</span> ce défi lancé par <span className="fontSize-15 weight-700">{rowData.playerFirstName} {rowData.playerFamilyName}</span>
              </p>
              :
              null
            }
            
            {this.props.currentChallengeId && this.props.currentChallengeId === rowData.challengeId && rowData.player === localStorage.getItem('TrickyAppId') ?
              <p className="textLeft fontSize-15 marginLeft-10">
                Vous avez <span className="fontSize-15 weight-700">lancé</span> ce défi contre <span className="fontSize-15 weight-700">{rowData.opponentFirstName} {rowData.opponentFamilyName}</span>
              </p>
              :
              null
            }

            {rowData.bonus && rowData.bonus > 0 && rowData.opponent === localStorage.getItem('TrickyAppId') ?
              this.bonus(rowData.bonus)
              :
              null
            }
          </div>
        </div>
      )
    } else if ((rowData.action === 'chalAccepted'  || rowData.action === 'chalMatched') && rowData.player === localStorage.getItem('TrickyAppId')) {
  

    // ---------------------- informs the opponent of a pending Challenge ----------------//

      return (
        <div className={innerBox}>
          <div className={imgAdapted}>
            <img
              src={rowData.opponentImage ? rowData.opponentImage : defaultUser}
              alt="thumb"
              className="imgFillParent"
            />
          </div>
          <div className="flexed column flexFill relativePos">
            <div className="absolutePos top-4 left-10 twentyfiveIconSize radiusRound zIndex-3 over_hidden"><img src={iconToDisplay} alt="thumb" className="imgFillParent"/></div>
            <p className="textLeft weight-700 fontSize-12 marginBottom-5 greyDark paddingLeft-10 uppercase uppercase">{timerNotifs(rowData.currentTime, rowData.date)} :</p>
            <p className="textLeft fontSize-15 marginLeft-10">
              Le défi que vous avez lancé à <span className="fontSize-15 weight-700">{rowData.opponentFirstName} {rowData.opponentFamilyName}</span> a été <span className="fontSize-15 weight-700">{rowData.action === 'chalAccepted' ? 'accepté' : 'relancé'}</span>
            </p>
          </div>
        </div>
      )
     } else if (rowData.action === 'bet') {

    // ---------------------- informs the opponent of a pending Challenge ----------------//


      let formattedPreference
      if (rowData.preference === 'both') {
        formattedPreference = 'sur les deux concurrents'
      } else if (rowData.preference === 'for') {
        formattedPreference = 'pour'
      } else if (rowData.preference === 'against') {
        formattedPreference = 'contre'
      }
      return (
        <div className={innerBox}>
          <div className={imgAdapted}>
            { rowData.bettor === localStorage.getItem('TrickyAppId') ?
              <img
                src={rowData.opponentImage ? rowData.opponentImage : defaultUser}
                alt="thumb"
                className="imgFillParent"
              />
              :
              <img
                src={rowData.bettorImage ? rowData.bettorImage : defaultUser}
                alt="thumb"
                className="imgFillParent"
              />
            }
          </div>
          <div className="flexed column flexFill relativePos">
            <div className="absolutePos top-4 left-10 twentyfiveIconSize radiusRound zIndex-3"><img src={iconToDisplay} alt="thumb" className="imgFillParent"/></div>
            <p className="textLeft weight-700 fontSize-12 marginBottom-5 greyDark paddingLeft-10 uppercase uppercase">{timerNotifs(rowData.currentTime, rowData.date)} :</p>
            { rowData.bettor === localStorage.getItem('TrickyAppId') && !this.props.currentChallengeId ?
              <p className="textLeft fontSize-15 marginLeft-10">Vous venez de miser <span className="fontSize-15 weight-700">{rowData.amount ? rowData.amount : '--'} Tricks</span> {formattedPreference} dans le défi entre <span className="fontSize-15 weight-700">{this.selfDetector(localStorage.getItem('TrickyAppId'), rowData.player, rowData.playerFirstName, rowData.playerFamilyName)}</span> et <span className="fontSize-15 weight-700">{this.selfDetector(localStorage.getItem('TrickyAppId'), rowData.opponent, rowData.opponentFirstName, rowData.opponentFamilyName)}</span></p>
              :
              null
            }
            { rowData.bettor !== localStorage.getItem('TrickyAppId') && !this.props.currentChallengeId ?
              <div className="flexed column flexFill relativePos">
                <p className="textLeft fontSize-15 marginLeft-10"><span className="fontSize-15 weight-700">{rowData.bettorFirstName} {rowData.bettorFamilyName}</span> vient de miser <span className="fontSize-15 weight-700">{rowData.amount ? rowData.amount : '--'} Tricks</span> {formattedPreference} dans le défi entre <span className="fontSize-15 weight-700">{this.selfDetector(localStorage.getItem('TrickyAppId'), rowData.player, rowData.playerFirstName, rowData.playerFamilyName)}</span> et <span className="fontSize-15 weight-700">{this.selfDetector(localStorage.getItem('TrickyAppId'), rowData.opponent, rowData.opponentFirstName, rowData.opponentFamilyName)}</span></p>
                <p className="textLeft fontSize-12 marginTop-10 color-1 weight-700 flexed alignSelfEnd textRight uppercase">Découvrir sa mise...</p>
              </div>
              :
              null
            }
            { rowData.bettor === localStorage.getItem('TrickyAppId') && this.props.currentChallengeId && this.props.currentChallengeId === rowData.challengeId ?
              <p className="textLeft fontSize-15 marginLeft-10">Vous venez de miser <span className="fontSize-15 weight-700">{rowData.amount ? rowData.amount : '--'} Tricks</span> {formattedPreference} dans ce défi </p>
              :
              null
            }
            { rowData.bettor !== localStorage.getItem('TrickyAppId') && this.props.currentChallengeId && this.props.currentChallengeId === rowData.challengeId ?
              <p className="textLeft fontSize-15 marginLeft-10"><span className="fontSize-15 weight-700">{rowData.bettorFirstName} {rowData.bettorFamilyName}</span> vient de miser <span className="fontSize-15 weight-700">{rowData.amount ? rowData.amount : '--'} Tricks</span> {formattedPreference} dans ce défi</p>
              :
              null
            }
            {rowData.bonus && rowData.bonus > 0 && rowData.bettor === localStorage.getItem('TrickyAppId') ?
              this.bonus(rowData.bonus)
              :
              null
            }
          </div>
        </div>
      )
    } else if (rowData.action === 'freeze') {

    // ---------------------- informs the opponent of a pending Challenge ----------------//

      return (
        <div className={innerBox}>
          <div className={imgAdapted}>
            <img
              src={rowData.image ? rowData.image : defaultUser}
              alt="thumb"
              className="imgFillParent"
            />
          </div>
          { rowData.freezer !== localStorage.getItem('TrickyAppId') ?
            <div className="flexed column flexFill relativePos">
              <div className="absolutePos top-4 left-10 twentyfiveIconSize radiusRound zIndex-3 over_hidden"><img src={iconToDisplay} alt="thumb" className="imgFillParent"/></div>
              <p className="textLeft weight-700 fontSize-12 marginBottom-5 greyDark paddingLeft-10 uppercase uppercase">{timerNotifs(rowData.currentTime, rowData.date)} :</p>
              <p className="textLeft fontSize-17 marginLeft-10">
                <span className="fontSize-15 color-2 weight-700">FREEZE - </span>

                { rowData.freezer === localStorage.getItem('TrickyAppId') && !this.props.currentChallengeId ?
                  <span className="fontSize-15 marginLeft-10"><span className="fontSize-15 weight-700">Vous</span> avez freezé <span className="fontSize-15 weight-700">{rowData.accusedFirstName} {rowData.accusedFamilyName}</span> dans le défi entre <span className="fontSize-15 weight-700">{this.selfDetector(localStorage.getItem('TrickyAppId'), rowData.player, rowData.playerFirstName, rowData.playerFamilyName)}</span> et <span className="fontSize-15 weight-700">{this.selfDetector(localStorage.getItem('TrickyAppId'), rowData.opponent, rowData.opponentFirstName, rowData.opponentFamilyName)}</span></span>
                  :
                  null
                }
                { rowData.accused === localStorage.getItem('TrickyAppId') && !this.props.currentChallengeId ?
                  <span className="fontSize-15 marginLeft-10"><span className="fontSize-15 weight-700">{rowData.freezerFirstName} {rowData.freezerFamilyName}</span> vous a freezé  dans le défi entre <span className="fontSize-15 weight-700">{this.selfDetector(localStorage.getItem('TrickyAppId'), rowData.player, rowData.playerFirstName, rowData.playerFamilyName)}</span> et <span className="fontSize-15 weight-700">{this.selfDetector(localStorage.getItem('TrickyAppId'), rowData.opponent, rowData.opponentFirstName, rowData.opponentFamilyName)}</span></span>
                  :
                  null
                }
                { rowData.accused !== localStorage.getItem('TrickyAppId') && rowData.freezer !== localStorage.getItem('TrickyAppId') && !this.props.currentChallengeId ?
                  <span className="fontSize-15 marginLeft-10"><span className="fontSize-15 weight-700">{rowData.freezerFirstName} {rowData.freezerFamilyName}</span> a freezé <span className="fontSize-15 weight-700">{rowData.accusedFirstName} {rowData.accusedFamilyName}</span> dans le défi entre <span className="fontSize-15 weight-700">{this.selfDetector(localStorage.getItem('TrickyAppId'), rowData.player, rowData.playerFirstName, rowData.playerFamilyName)}</span> et <span className="fontSize-15 weight-700">{this.selfDetector(localStorage.getItem('TrickyAppId'), rowData.opponent, rowData.opponentFirstName, rowData.opponentFamilyName)}</span></span>
                  :
                  null
                }
                { rowData.freezer === localStorage.getItem('TrickyAppId') && this.props.currentChallengeId && this.props.currentChallengeId === rowData.challengeId ?
                  <span className="fontSize-15 marginLeft-10"><span className="fontSize-15 weight-700">Vous</span> avez freezé <span className="fontSize-15 weight-700">{rowData.accusedFirstName} {rowData.accusedFamilyName}</span> dans ce défi.</span>
                  :
                  null
                }
                { rowData.accused === localStorage.getItem('TrickyAppId') && this.props.currentChallengeId && this.props.currentChallengeId === rowData.challengeId ?
                  <span className="fontSize-15 marginLeft-10"><span className="fontSize-15 weight-700">{rowData.freezerFirstName} {rowData.freezerFamilyName}</span> vous a freezé  dans ce défi.</span>
                  :
                  null
                }
                { rowData.accused !== localStorage.getItem('TrickyAppId') && rowData.freezer !== localStorage.getItem('TrickyAppId') && this.props.currentChallengeId && this.props.currentChallengeId === rowData.challengeId ?
                  <span className="fontSize-15 marginLeft-10"><span className="fontSize-15 weight-700">{rowData.freezerFirstName} {rowData.freezerFamilyName}</span> a freezé <span className="fontSize-15 weight-700">{rowData.accusedFirstName} {rowData.accusedFamilyName}</span> dans ce défi.</span>
                  :
                  null
                }
                {rowData.bonus && rowData.bonus > 0 ?
                  this.bonus(rowData.bonus)
                  :
                  null
                }
              </p>
              { (!rowData.used || rowData.used !== true) && rowData.freezer !== localStorage.getItem('TrickyAppId') ?
                <p className="fontSize-12 marginTop-10 color-1 weight-700 flexed alignSelfEnd textRight uppercase">Voir le freeze...</p>
                :
                <p className="fontSize-12 marginTop-10 color-1 weight-700 flexed alignSelfEnd textRight uppercase">Revoir le freeze...</p>
              }
            </div>
            :
            <div className="flexed column flexFill relativePos">
              <p className="weight-700 fontSize-12 marginLeft-10 marginBottom-5 greyDark paddingLeft-10 uppercase">{timerNotifs(rowData.currentTime, rowData.date)} :</p>
              <div>
                <p className="textLeft fontSize-17 marginLeft-10"><span className="fontSize-15 color-2 weight-700">FREEZE - </span><span className="fontSize-15 weight-700">Vous</span> avez freezé <span className="fontSize-15 weight-700">{rowData.accusedFirstName} {rowData.accusedFamilyName}</span> dans le défi entre <span className="fontSize-15 weight-700">{this.selfDetector(localStorage.getItem('TrickyAppId'), rowData.player, rowData.playerFirstName, rowData.playerFamilyName)}</span> et <span className="fontSize-15 weight-700">{this.selfDetector(localStorage.getItem('TrickyAppId'), rowData.opponent, rowData.opponentFirstName, rowData.opponentFamilyName)}</span></p>
                <p className="fontSize-12 marginTop-10 color-1 weight-700 textRight uppercase">Revoir le freeze...</p>
              </div>
            </div>
          }
        </div>
      )
    } else if (rowData.action === 'suspect') {

    // ---------------------- informs the opponent of a pending Challenge ----------------//

      return (
        <div className={innerBox}>
          <div className={imgAdapted}>
            <img
              src={rowData.freezerImage ? rowData.freezerImage : defaultUser}
              alt="thumb"
              className="imgFillParent"
            />
          </div>
          { rowData.freezer !== localStorage.getItem('TrickyAppId') ?
            <div className="flexed column flexFill relativePos">
              <div className="absolutePos top-4 left-10 twentyfiveIconSize radiusRound zIndex-3 over_hidden"><img src={iconToDisplay} alt="thumb" className="imgFillParent"/></div>
              <p className="textLeft weight-700 fontSize-12 marginBottom-5 greyDark paddingLeft-10 uppercase uppercase">{timerNotifs(rowData.currentTime, rowData.date)} :</p>
              { rowData.accused === localStorage.getItem('TrickyAppId') && !this.props.currentChallengeId ?
                <p className="textLeft fontSize-15 marginLeft-10">
                  <span className="fontSize-15 color-2 weight-700">SUSPICION - </span><span className="fontSize-15 weight-700">{rowData.freezerFirstName} {rowData.freezerFamilyName} vous suspecte :</span> "{rowData.suspectReason}"{"\n"}
                  Cela concerne le défi entre <span className="fontSize-15 weight-700">{this.selfDetector(localStorage.getItem('TrickyAppId'), rowData.player, rowData.playerFirstName, rowData.playerFamilyName)}</span> et <span className="fontSize-15 weight-700">{this.selfDetector(localStorage.getItem('TrickyAppId'), rowData.opponent, rowData.opponentFirstName, rowData.opponentFamilyName)}</span>
                </p>
                :
                null
              }
              { rowData.freezer === localStorage.getItem('TrickyAppId') && !this.props.currentChallengeId ?
                <p className="textLeft fontSize-15 marginLeft-10">
                  <span className="fontSize-15 color-2 weight-700">SUSPICION - </span><span className="fontSize-15 weight-700">Vous avez suspecté {rowData.accusedFirstName} {rowData.accusedFamilyName} :</span> "{rowData.suspectReason}"{"\n"}
                  Cela concerne le défi entre <span className="fontSize-15 weight-700">{this.selfDetector(localStorage.getItem('TrickyAppId'), rowData.player, rowData.playerFirstName, rowData.playerFamilyName)}</span> et <span className="fontSize-15 weight-700">{this.selfDetector(localStorage.getItem('TrickyAppId'), rowData.opponent, rowData.opponentFirstName, rowData.opponentFamilyName)}</span>
                </p>
                :
                null
              }
              { rowData.freezer !== localStorage.getItem('TrickyAppId') && rowData.accused !== localStorage.getItem('TrickyAppId') && !this.props.currentChallengeId ?
                <p className="textLeft fontSize-15 marginLeft-10">
                  <span className="fontSize-15 color-2 weight-700">SUSPICION - </span><span className="fontSize-15 weight-700">{rowData.freezerFirstName} {rowData.freezerFamilyName} suspecte {rowData.accusedFirstName} {rowData.accusedFamilyName} :</span> "{rowData.suspectReason}"{"\n"}
                  Cela concerne le défi entre <span className="fontSize-15 weight-700">{this.selfDetector(localStorage.getItem('TrickyAppId'), rowData.player, rowData.playerFirstName, rowData.playerFamilyName)}</span> et <span className="fontSize-15 weight-700">{this.selfDetector(localStorage.getItem('TrickyAppId'), rowData.opponent, rowData.opponentFirstName, rowData.opponentFamilyName)}</span>
                </p>
                :
                null
              }
              { rowData.accused === localStorage.getItem('TrickyAppId') && this.props.currentChallengeId && this.props.currentChallengeId === rowData.challengeId ?
                <p className="textLeft fontSize-15 marginLeft-10">
                  <span className="fontSize-15 color-2 weight-700">SUSPICION - </span><span className="fontSize-15 weight-700">{rowData.freezerFirstName} {rowData.freezerFamilyName} vous suspecte :</span> "{rowData.suspectReason}"{"\n"}
                  Cela concerne le défi entre <span className="fontSize-15 weight-700">{this.selfDetector(localStorage.getItem('TrickyAppId'), rowData.player, rowData.playerFirstName, rowData.playerFamilyName)}</span> et <span className="fontSize-15 weight-700">{this.selfDetector(localStorage.getItem('TrickyAppId'), rowData.opponent, rowData.opponentFirstName, rowData.opponentFamilyName)}</span>
                </p>
                :
                null
              }
              { rowData.freezer === localStorage.getItem('TrickyAppId') && this.props.currentChallengeId && this.props.currentChallengeId === rowData.challengeId ?
                <p className="textLeft fontSize-15 marginLeft-10">
                  <span className="fontSize-15 color-2 weight-700">SUSPICION - </span><span className="fontSize-15 weight-700">Vous avez suspecté {rowData.accusedFirstName} {rowData.accusedFamilyName} :</span> "{rowData.suspectReason}"{"\n"}
                  Cela concerne le défi entre <span className="fontSize-15 weight-700">{this.selfDetector(localStorage.getItem('TrickyAppId'), rowData.player, rowData.playerFirstName, rowData.playerFamilyName)}</span> et <span className="fontSize-15 weight-700">{this.selfDetector(localStorage.getItem('TrickyAppId'), rowData.opponent, rowData.opponentFirstName, rowData.opponentFamilyName)}</span>
                </p>
                :
                null
              }
              { rowData.freezer !== localStorage.getItem('TrickyAppId') && rowData.accused !== localStorage.getItem('TrickyAppId') && this.props.currentChallengeId && this.props.currentChallengeId === rowData.challengeId ?
                <p className="textLeft fontSize-15 marginLeft-10">
                  <span className="fontSize-15 color-2 weight-700">SUSPICION - </span><span className="fontSize-15 weight-700">{rowData.freezerFirstName} {rowData.freezerFamilyName} suspecte {rowData.accusedFirstName} {rowData.accusedFamilyName} :</span> "{rowData.suspectReason}"{"\n"}
                  Cela concerne le défi entre <span className="fontSize-15 weight-700">{this.selfDetector(localStorage.getItem('TrickyAppId'), rowData.player, rowData.playerFirstName, rowData.playerFamilyName)}</span> et <span className="fontSize-15 weight-700">{this.selfDetector(localStorage.getItem('TrickyAppId'), rowData.opponent, rowData.opponentFirstName, rowData.opponentFamilyName)}</span>
                </p>
                :
                null
              }
            </div>
            :
            <div className="flexed column flexFill relativePos">
              <p className="textLeft weight-700 fontSize-12 marginBottom-5 greyDark paddingLeft-10 uppercase uppercase">{timerNotifs(rowData.currentTime, rowData.date)} :</p>
              <p className="textLeft fontSize-15 marginLeft-10"><span className="fontSize-15 color-2 weight-700">SUSPICION - </span><span className="fontSize-15 weight-700">Vous</span> avez suspecté <span className="fontSize-15 weight-700">{rowData.accusedFirstName} {rowData.accusedFamilyName}</span> dans le défi entre <span className="fontSize-15 weight-700">{this.selfDetector(localStorage.getItem('TrickyAppId'), rowData.player, rowData.playerFirstName, rowData.playerFamilyName)}</span> et <span className="fontSize-15 weight-700">{this.selfDetector(localStorage.getItem('TrickyAppId'), rowData.opponent, rowData.opponentFirstName, rowData.opponentFamilyName)}</span></p>
            </div>
          }
        </div>
      )
    } else if (rowData.action === 'challengeFreezed' || rowData.action === 'challengeReactivated') {

    // ---------------------- informs the opponent of a pending Challenge ----------------//

      return (
        <div className={innerBox}>
          <div className={imgAdapted}>
            <img
              src={rowData.opponentImage ? rowData.opponentImage : defaultUser}
              alt="thumb"
              className="imgFillParent"
            />
          </div>
          <div className="flexed column flexFill relativePos">
            <div className="absolutePos top-4 left-10 twentyfiveIconSize radiusRound zIndex-3 over_hidden"><img src={iconToDisplay} alt="thumb" className="imgFillParent"/></div>
            <p className="textLeft weight-700 fontSize-12 marginBottom-5 greyDark paddingLeft-10 uppercase uppercase">{timerNotifs(rowData.currentTime, rowData.date)} :</p>
            { rowData.action === 'challengeFreezed' ?
              <div className="flexed column flexFill relativePos">
                <p className="textLeft fontSize-15 marginLeft-10">
                  Le défi entre <span className="fontSize-15 weight-700">{this.selfDetector(localStorage.getItem('TrickyAppId'), rowData.player, rowData.playerFirstName, rowData.playerFamilyName)}</span> et <span className="fontSize-15 weight-700">{this.selfDetector(localStorage.getItem('TrickyAppId'), rowData.opponent, rowData.opponentFirstName, rowData.opponentFamilyName)}</span> est terminé suite au freeze fait par <span className="fontSize-15 weight-700">{this.selfDetector(localStorage.getItem('TrickyAppId'), rowData.freezer, rowData.freezerFirstName, rowData.freezerFamilyName)}</span>{"\n"}
                  { rowData.bonus && rowData.bonus > 0 && rowData.freezer === localStorage.getItem('TrickyAppId') ?
                    <span>Car votre freeze a été validé, vous avez gagné un bonus de <span className="fontSize-15 weight-700">{rowData.bonus} Tricks</span>. {"\n"}</span>
                    :
                    <span>qui remporte <span className="fontSize-15 weight-700">{rowData.bonus} Tricks</span> grace à son Freeze qui vient d'être validé !{"\n"}</span>
                  }
                </p>
                { this.props.origin !== 'chall' ?
                  <p className="textLeft fontSize-12 marginTop-10 color-1 weight-700 flexed alignSelfEnd textRight uppercase">Allez voir le resultat des gagnants !</p>
                  :
                  null
                }
              </div>
              :
              <div className="flexed column flexFill relativePos">
                <p className="textLeft fontSize-15 marginLeft-10">
                  Le défi entre <span className="fontSize-15 weight-700">{this.selfDetector(localStorage.getItem('TrickyAppId'), rowData.player, rowData.playerFirstName, rowData.playerFamilyName)}</span> et <span className="fontSize-15 weight-700">{this.selfDetector(localStorage.getItem('TrickyAppId'), rowData.opponent, rowData.opponentFirstName, rowData.opponentFamilyName)}</span> est reactivé car le freeze fait par <span className="fontSize-15 weight-700">{this.selfDetector(localStorage.getItem('TrickyAppId'), rowData.freezer, rowData.freezerFirstName, rowData.freezerFamilyName)}</span> n'a pas été validé
                </p>
                <p className="fontSize-12 marginTop-10 color-1 weight-700 flexed alignSelfEnd textRight uppercase">Les paris sont re-ouverts !</p>
              </div>
            }
          </div>
        </div>
      )
    } else if (rowData.action === 'challFinished') {

    // ---------------------- informs the opponent of a pending Challenge ----------------//

      return (
        <div className={innerBox}>
          <div className={imgAdapted}>
            <img
              src={rowData.opponentImage ? rowData.opponentImage : defaultUser}
              alt="thumb"
              className="imgFillParent"
            />
          </div>
          <div className="flexed column flexFill relativePos">
            <div className="absolutePos top-4 left-10 twentyfiveIconSize radiusRound zIndex-3 over_hidden"><img src={iconToDisplay} alt="thumb" className="imgFillParent"/></div>
            <p className="textLeft weight-700 fontSize-12 marginBottom-5 greyDark paddingLeft-10 uppercase uppercase">{timerNotifs(rowData.currentTime, rowData.date)} :</p>
            <p className="textLeft fontSize-15 marginLeft-10">
              Le défi entre <span className="fontSize-15 weight-700">{this.selfDetector(localStorage.getItem('TrickyAppId'), rowData.player, rowData.playerFirstName, rowData.playerFamilyName)}</span> et <span className="fontSize-15 weight-700">{this.selfDetector(localStorage.getItem('TrickyAppId'), rowData.opponent, rowData.opponentFirstName, rowData.opponentFamilyName)}</span> est terminé
            </p>
            { this.props.origin !== 'chall' ?
              <p className="textLeft fontSize-15 marginLeft-10">Allez voir le resultat des gagnants !</p>
              :
              null
            }
          </div>
        </div>
      )
    }
  }
  // render the list - selectNotif alows to select the tab to show the right content
  renderContent(rowData) {
    let baseColor
    let borderColor
    let iconToDisplay
    let itemColor
    // let itemSuspictionColor
    // give a differente backgroundColor to the notifications already clicked
    let index
    if (this.props.existingList && this.props.existingList.length > 0) {
      index = this.props.existingList.map((single) => {return single._id}).indexOf(rowData._id)
    }
    // display the right icon according to the theme
    switch (rowData.theme) {
      case 'tabac':
        iconToDisplay = tabac
        break
      case 'sport':
        iconToDisplay = sport
        break
      case 'nutrition':
        iconToDisplay = food
        break
      case 'relax':
        iconToDisplay = relax
        break
      case 'custom':
        iconToDisplay = relax
        break
      default: iconToDisplay = tabac
    }
    // display the right back color according to the argument
    switch (rowData.action) {
      case 'bet':
      case 'chalAccepted':
      case 'chalMatched':
      case 'challengeReactivated':
      case 'pendingChallenge':
        // give the right color to the board
        baseColor = 'bg_color3_medium'
        borderColor = 'borderTotal3Color3_medium'

        // give the right color to clicked notifs
        if (
          (
            index >= 0
            && this.props.existingList
            && this.props.existingList[index]
            && this.props.existingList[index].clicked
            && this.props.existingList[index].clicked === true
          )
          ||
          ((
            rowData.action === 'chalAccepted'
            || rowData.action === 'chalMatched'
            || rowData.action === 'pendingChallenge'
            ) && rowData.player === localStorage.getItem('TrickyAppId')
          )
          ||
          (rowData.action === 'pendingChallenge' && rowData.used === true)
        ) {
          itemColor = 'bg_color3_extralight'
        } else {
          itemColor = 'bg_white'
        }
        break
      case 'challengeFreezed':
      case 'challFinished':
        // give the right color to the board
        baseColor = 'bg_color4_light'
        borderColor = 'borderTotal3Color4_light'
        // give the right color to clicked notifs
        if (
          index >= 0
          && this.props.existingList
          && this.props.existingList[index]
          && this.props.existingList[index].clicked
          && this.props.existingList[index].clicked === true
        ) {
          itemColor = 'bg_color4_extralight'
        } else {
          itemColor = 'bg_white'
        }
        break
      case 'avatar':
      case 'chalRefused':
      case 'endStage':
      case 'endProgram':
      case 'tagPlayer':
        // give the right color to the board
        baseColor = 'bg_color2_medium'
        borderColor = 'borderTotal3Color2_medium'
        // give the right color to clicked notifs
        if (
          (
            index >= 0
            && this.props.existingList
            && this.props.existingList[index]
            && this.props.existingList[index].clicked
            && this.props.existingList[index].clicked === true
          )
          || rowData.action === 'chalRefused'
          || rowData.action === 'endStage'
          || rowData.action === 'endProgram'
        ) {
          itemColor = 'bg_color2_light'
        } else {
          itemColor = 'bg_white'
        }
        break
      case 'onBoardingWelcome':
      case 'onBoarding1':
      case 'onBoarding2':
      case 'morningIncentive':
        // give the right color to the board
        baseColor = 'bg_color5_medium'
        borderColor = 'borderTotal3Color5_medium'
        // give the right color to clicked notifs
        if (
          (
            index >= 0
            && this.props.existingList
            && this.props.existingList[index]
            && this.props.existingList[index].clicked
            && this.props.existingList[index].clicked === true
          )
          || rowData.action === 'onBoarding2'
        ) {
          itemColor = 'bg_color5_light'
        } else {
          itemColor = 'bg_white'
        }
        break
      case 'freeze':
      case 'suspect':
        // give the right color to the board
        baseColor = 'bg_color1_medium'
        borderColor = 'borderTotal2_color1_medium'
        // give the right color to clicked notifs
        if (
          (
            index >= 0
            && this.props.existingList
            && this.props.existingList[index]
            && this.props.existingList[index].clicked
            && this.props.existingList[index].clicked === true
          )
          || rowData.action === 'suspect'
        ) {
          itemColor = 'bg_color1_light'
        } else {
          itemColor = 'bg_white'
        }
        break
      default:
        baseColor = 'bg_color1_medium'
        borderColor = 'border border_color1_medium'
    }
    const fondAdapted = 'flexed column alignStretch justifyCentered radius-8 marginBottom-10 ' + baseColor
    const imgAdapted = 'iconSize-40 radiusRound marginBottom-5 relativePos over_hidden zIndex-3 ' + borderColor
    const innerBox = 'flexed flexFill alignCenter justifySpaceBetween marginVertical-1 marginHorizontal-10 paddingVertical-10 paddingHorizontal-10 ' + itemColor

    // make the notification clickable when it is not in a challenge detail
    if (rowData.action === 'pendingChallenge' && rowData.player === localStorage.getItem('TrickyAppId')) {

    // ---------------------- informs the challenger of the pending Challenge he made ----------------//

      return (
        <div
          className={fondAdapted}
        >
          <div className={innerBox}>
            <div className={imgAdapted}>
              <img
                src={rowData.opponentImage ? rowData.opponentImage : defaultUser}
                alt="thumb"
                className="imgFillParent"
              />
            </div>
            <div className="flexed column flexFill relativePos">
              <div className="absolutePos top-4 left-10 twentyfiveIconSize radiusRound zIndex-3 over_hidden"><img src={iconToDisplay} alt="thumb" className="imgFillParent"/></div>
              <p className="textLeft weight-700 fontSize-12 marginBottom-5 greyDark paddingLeft-10 uppercase">{timerNotifs(rowData.currentTime, rowData.date)} :</p>
              <p className="textLeft fontSize-15 marginLeft-10">
                Vous avez defié <span className="fontSize-15 weight-700">{rowData.opponentFirstName} {rowData.opponentFamilyName}</span>
              </p>
              {rowData.bonus && rowData.bonus > 0 ?
                this.bonus(rowData.bonus)
                :
                null
              }
              <p className="textLeft fontSize-15 marginLeft-10">Votre défi attend d'être accepté</p>
            </div>
          </div>
        </div>
      )

    // pending challenges wher the user is opponent and the challenge is not older that the time limit for validation
    } else if (rowData.action === 'pendingChallenge' && (rowData.currentTime - new Date(rowData.date).getTime()) > rowData.oldMax) {

    // ---------------------- informs the opponent of a pending Challenge ----------------//

      return (
        <div
          className={fondAdapted}
        >
          <div className={innerBox}>
            <div className={imgAdapted}>
              <img
                src={rowData.playerImage ? rowData.playerImage : defaultUser}
                alt="thumb"
                className="imgFillParent"
              />
            </div>
            <div className="flexed column flexFill relativePos">
              <div className="absolutePos top-4 left-10 twentyfiveIconSize radiusRound zIndex-3 over_hidden"><img src={iconToDisplay} alt="thumb" className="imgFillParent"/></div>
              <p className="textLeft weight-700 fontSize-12 marginBottom-5 greyDark paddingLeft-10 uppercase">{timerNotifs(rowData.currentTime, rowData.date)} :</p>
              <p className="textLeft fontSize-15 marginLeft-10">
                Le défi que <span className="fontSize-15 weight-700">{rowData.playerFirstName} {rowData.playerFamilyName}</span> vous a lancé ne peut plus être accepté car le temps limite a été dépassé.
              </p>
            </div>
          </div>
        </div>
      )
    } else if (rowData.action === 'avatar') {

    // ---------------------- informs the player of the bonus avatar ----------------//

      return (
        <button
          className={fondAdapted}
          onClick={() => {
            markSingleNotif(rowData._id, rowData.date, () => {
              // this.props.history.push('/bonusMain')
            })
          }}
        >
          <div className={innerBox}>
            <div className={imgAdapted}>
              <img
                src={rowData.playerImage ? rowData.playerImage : defaultUser}
                alt="thumb"
                className="imgFillParent"
              />
            </div>
            <div className="flexed column flexFill relativePos">
              <p className="textLeft weight-700 fontSize-12 marginLeft-10 marginBottom-5 greyDark uppercase">{timerNotifs(rowData.currentTime, rowData.date)} :</p>
              <p className="textLeft fontSize-15 marginLeft-10">
                <span className="fontSize-15 weight-700">Vous</span> venez d'enregistrer votre avatar{"\n"}
                {rowData.bonus && rowData.bonus > 0 ?
                  this.bonus(rowData.bonus)
                  :
                  null
                }
              </p>
            </div>
          </div>
        </button>
      )
    } else if (rowData.action === 'tagPlayer') {

    // ---------------------- informs the player of a tag ----------------//

      return (
        <button
          className={fondAdapted}
          onClick={() => {
            markSingleNotif(rowData._id, rowData.date, () => {
              this.props.history.push('/chat')
            })
          }}
        >
          <div className={innerBox}>
            <div className={imgAdapted}>
              <img
                src={rowData.playerImage ? rowData.playerImage : defaultUser}
                alt="thumb"
                className="imgFillParent"
              />
            </div>
            <div className="flexed column flexFill relativePos">
              <p className="textLeft weight-700 fontSize-12 marginLeft-10 marginBottom-5 greyDark uppercase">{timerNotifs(rowData.currentTime, rowData.date)} :</p>
              <p className="textLeft fontSize-15 marginLeft-10">
                { rowData.challengeId ?
                  <span><span className="fontSize-15 weight-700">Vous</span> avez été taggué par <span className="fontSize-15 weight-700">{rowData.playerFirstName} {rowData.playerFamilyName}</span> dans une discussion en cours.</span>
                  :
                  <span><span className="fontSize-15 weight-700">{rowData.playerFirstName} {rowData.playerFamilyName}</span> vous a taggué dans une discussion en cours.</span>
                }
              </p>
            </div>
          </div>
        </button>
      )
    } else if (rowData.action === 'onBoardingWelcome') {

    // ---------------------- welcome message ----------------//

      return (
        <button
          className={fondAdapted}
          onClick={() => {
            markSingleNotif(rowData._id, rowData.date, () => {
              // this.props.history.push({ pathname: '/tutorial', state: { format: 'tuto' }})
            })
          }}
        >
          <div className={innerBox}>
            <div className={imgAdapted}>
              <img
                src={rowData.playerImage ? rowData.playerImage : defaultUser}
                alt="thumb"
                className="imgFillParent"
              />
            </div>
            <div className="flexed column flexFill relativePos">
              <p className="textLeft fontSize-15 marginLeft-10">
                <span className="fontSize-15 weight-700">Bienvenue sur Tricky !</span> Êtes-vous prêt à relever les défis ?
              </p>
              <p className="textLeft fontSize-12 marginTop-10 color-1 weight-700 flexed alignSelfEnd textRight uppercase">Besoin d\'aide ?</p>
            </div>
          </div>
        </button>
      )
    } else if (rowData.action === 'onBoarding1') {

    // ---------------------- incentive tue user to launch a challenge ----------------//

      return (
        <button
          className={fondAdapted}
          onClick={() => {
            markSingleNotif(rowData._id, rowData.date, () => {
              this.props.history.push({ pathname: '/challenge', state: { idProgram: this.props.idProgram, origin: this.props.location.pathname }})
            })
          }}
        >
          <div className={innerBox}>
            <div className={imgAdapted}>
              <img
                src={rowData.playerImage ? rowData.playerImage : defaultUser}
                alt="thumb"
                className="imgFillParent"
              />
            </div>
            <div className="flexed column flexFill relativePos">
              <p className="textLeft fontSize-15 marginLeft-10">
                <span className="fontSize-15 weight-700">Lancez</span> votre premier défi à un collègue, et tentez de doubler votre mise !
              </p>
              <p className="textLeft fontSize-12 marginTop-10 color-1 weight-700 flexed alignSelfEnd textRight uppercase">Je commence !</p>
            </div>
          </div>
        </button>
      )
    } else if (rowData.action === 'onBoarding2') {

    // ---------------------- incentive tue user to launch a challenge ----------------//

      return (
        <div
          className={fondAdapted}
        >
          <div className={innerBox}>
            <div className={imgAdapted}>
              <img
                src={rowData.playerImage ? rowData.playerImage : defaultUser}
                alt="thumb"
                className="imgFillParent"
              />
            </div>
            <div className="flexed column flexFill relativePos">
              <p className="textLeft fontSize-15 marginLeft-10">
                <span className="fontSize-15 weight-700">Sur Tricky</span> en lançant des défis à vos collègues vous les incitez à prendre soin de leur santé.{"\n"}
                Si vous misez bien vous gagnez des points qui pourront être convertibles en <span className="fontSize-15 weight-700">chèque cadeau</span> !
              </p>
            </div>
          </div>
        </div>
      )
    } else if (rowData.action === 'morningIncentive') {

    // ---------------------- incentive tue user to launch a challenge ----------------//

      return (
        <button
          className={fondAdapted}
          onClick={() => {
            markSingleNotif(rowData._id, rowData.date, () => {
              this.props.history.push({ pathname: '/challenge', state: { idProgram: this.props.idProgram, origin: this.props.location.pathname }})
            })
          }}
        >
          <div className={innerBox}>
            <div className={imgAdapted}>
              <img
                src={rowData.playerImage ? rowData.playerImage : defaultUser}
                alt="thumb"
                className="imgFillParent"
              />
            </div>
            <div className="flexed column flexFill relativePos">
              <p className="textLeft fontSize-15 marginLeft-10">
                <span className="fontSize-15 weight-700">Bonjour {rowData.playerFirstName},</span> aujourd'hui tu as {rowData.amount ? rowData.amount : '--'} Tricks soit XXX Euros à la fin de cette partie !
              </p>
              <p className="textLeft fontSize-12 marginTop-10 color-1 weight-700 flexed alignSelfEnd textRight uppercase">J'augmente mes Tricks...</p>
            </div>
          </div>
        </button>
      )
    } else if (rowData.action === 'chalRefused') {

    // ---------------------- informs the opponent of a pending Challenge ----------------//

      return (
        <div
          className={fondAdapted}
        >
          <div className={innerBox}>
            <div className={imgAdapted}>
              <img
                src={rowData.playerImage ? rowData.playerImage : defaultUser}
                alt="thumb"
                className="imgFillParent"
              />
            </div>
            <div className="flexed column flexFill relativePos">
              <div className="absolutePos top-4 left-10 twentyfiveIconSize radiusRound zIndex-3 over_hidden"><img src={iconToDisplay} alt="thumb" className="imgFillParent"/></div>
              <p className="textLeft weight-700 fontSize-12 marginBottom-5 greyDark paddingLeft-10 uppercase">{timerNotifs(rowData.currentTime, rowData.date)} :</p>
              { localStorage.getItem('TrickyAppId') === rowData.player ?
                <p className="textLeft fontSize-15 marginLeft-10"><span className="fontSize-15 weight-700">{this.selfDetector(localStorage.getItem('TrickyAppId'), rowData.opponent, rowData.opponentFirstName, rowData.opponentFamilyName)}</span> a réfusé le défi que vous avez lancé</p>
                :
                null
              }
              { localStorage.getItem('TrickyAppId') === rowData.opponent ?
                <p className="textLeft fontSize-15 marginLeft-10"><span className="fontSize-15 weight-700">Vous</span> avez réfusé le défi lancé par {this.selfDetector(localStorage.getItem('TrickyAppId'), rowData.player, rowData.playerFirstName, rowData.playerFamilyName)}</p>
                :
                null
              }
            </div>
          </div>
        </div>
      )
    } else if (rowData.action === 'endStage') {

    // ---------------------- informs the opponent of a pending Challenge ----------------//

      return (
        <div
          className={fondAdapted}
        >
          <div className={innerBox}>
            <div className={imgAdapted}>
              <img
                src={rowData.playerImage ? rowData.playerImage : defaultUser}
                alt="thumb"
                className="imgFillParent"
              />
            </div>
            <div className="flexed column flexFill relativePos">
              <p className="textLeft weight-700 fontSize-12 marginLeft-10 marginBottom-5 greyDark uppercase">{timerNotifs(rowData.currentTime, rowData.date)} :</p>
              <p className="textLeft fontSize-15 marginLeft-10">
                <span className="fontSize-15 weight-700">Congratulations !</span> La premiere partie du jeu est <span className="fontSize-15 weight-700">terminée</span>{"\n"}
                Vos Tricks ont été réinitialisés et votre gagne calculé.{"\n"}
                Allez voir dans la <span className="fontSize-15 weight-700">page boutique</span> le montant que vous avez <span className="fontSize-15 weight-700">gagné !</span>
              </p>
            </div>
          </div>
        </div>
      )
    } else if (rowData.action === 'endProgram') {

    // ---------------------- informs the opponent of a pending Challenge ----------------//

      return (
        <div
          className={fondAdapted}
        >
          <div className={innerBox}>
            <div className={imgAdapted}>
              <img
                src={rowData.playerImage ? rowData.playerImage : defaultUser}
                alt="thumb"
                className="imgFillParent"
              />
            </div>
            <div className="flexed column flexFill relativePos">
              <p className="textLeft weight-700 fontSize-12 marginLeft-10 marginBottom-5 greyDark uppercase">{timerNotifs(rowData.currentTime, rowData.date)} :</p>
              <p className="textLeft fontSize-15 marginLeft-10">
                <span className="fontSize-15 weight-700">Congratulations !</span> Le programme du jeu est arrivé à sa <span className="fontSize-15 weight-700">fin.</span>{"\n"}
                Votre gagne final a été calculé.{"\n"}
                Allez voir dans la <span className="fontSize-15 weight-700">page boutique</span> le montant que vous avez <span className="fontSize-15 weight-700">gagné !</span>
              </p>
            </div>
          </div>
        </div>
      )

    // assign a clickable or not clickable container
    } else if (
      this.props.notClickable
      && this.props.notClickable === true
      && (rowData.action !== 'freeze' && rowData.action !== 'suspect')
    ) {
      return (
        <div
          className={fondAdapted}
        >
          { this.basicContent(rowData, imgAdapted, innerBox, iconToDisplay) }
        </div>
      )
    } else if (rowData.action === 'pendingChallenge' && rowData.used === true) {
      return (
        <div
          className={fondAdapted}
        >
          { this.basicContent(rowData, imgAdapted, innerBox, iconToDisplay) }
        </div>
      )
    } else if (rowData.action !== 'freeze' && rowData.action !== 'suspect') {
      return (
        <button
          className={fondAdapted}
          onClick={() => {
            markSingleNotif(rowData._id, rowData.date, () => {
              if (rowData.action === 'pendingChallenge') {
                this.props.history.push({ pathname: '/acceptance', state: { idChallenge: rowData.challengeId, origin: this.props.location.pathname } })
              } else {
                this.props.history.push({ pathname: '/detailchallenge', state: { idChallenge: rowData.challengeId, origin: this.props.location.pathname } })
              }
            })
          }}
        >
          { this.basicContent(rowData, imgAdapted, innerBox, iconToDisplay) }
        </button>
      )

    } else if (rowData.action === 'freeze' || rowData.action === 'suspect') {
      return (
        <button
          className={fondAdapted}
          onClick={() => {
            // markSingleNotif(rowData._id, rowData.date, () => {
              if (rowData.action === 'freeze') {
                // check if the freeze as been already jugged
                this.props.history.push({
                  pathname: '/detailFreeze',
                  state: {
                    idFreeze: rowData.freezeId,
                    freezer: rowData.freezer,
                    accusedId: rowData.accused,
                    idChallenge: rowData.challengeId,
                    freezeConfirmation: rowData.used,
                    image: rowData.image,
                    comment: rowData.comment ? rowData.comment : null,
                    origin: this.props.location.pathname
                  }
                })

              } else if (rowData.action === 'pendingChallenge') {
                this.props.history.push({ pathname: '/acceptance', state: { idChallenge: rowData.challengeId, origin: this.props.location.pathname } })
              } else {
                this.props.history.push({ pathname: '/detailchallenge', state: { idChallenge: rowData.challengeId, origin: this.props.location.pathname } })
              }
            // })
          }}
        >
          { this.basicContent(rowData, imgAdapted, innerBox, iconToDisplay) }
        </button>
      )
    }
  }
  render() {
    return (
      <div className="flexed flexFill column marginTop-15 alignStretch scroll_y">
        {this.props.list.map(
          (notif) => {
            return (
              <div key={notif._id} className="flexed column alignStretch noShrink">
                { this.renderContent(notif) }
              </div>
            )
          }
        )}
      </div>
    )
  }
}

export default withRouter(ListNotifications)
