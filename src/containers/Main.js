import React, { Component } from 'react'
import { connect } from 'react-redux'
/* COMPONENTS */
import Header from '../components/Header'
import ListChallengesHorizontal from '../components/ListChallengesHorizontal'
import ListNotifications from '../components/ListNotifications'
import Tabbar from '../components/Tabbar'
/* ACTION CREATORS */
import { setPreviousNotifs, loadNotifsMain } from '../reducer/notifications'
import { getMain, loadProfile } from '../reducer/profile'
import { loadHorzChallenges } from '../reducer/challenges'
/* HELPERS */
import { handleNewNotifs } from '../helpers/notifs'
/* IMAGES */
// import defaultUser from '../icons/user.png'
import btnChallenge from '../icons/plusBtn.png'
// import fond from '../icons/fond.png'
// import logo from '../icons/logoSmall.png'
import right from '../icons/right-spec.png'

// const patternStyle = {backgroundImage: `url(${pattern})`, backgroundSize: '80px'}

class Main extends Component {
  constructor() {
    super()
    this.listFunction = this.listFunction.bind(this)
  }
  componentDidMount() {
    /*
    // ===============>>> REDIRECTIONS BECAUSE THE PUSH NOTIFICATIONS

    // redirect to the specific challenge if a push notification is pressed
    if (this.props.actionPush && this.props.actionPush === 'pendingChallenge' && this.props.extraData) {
      await Actions.acceptance({ idChallenge: this.props.extraData });

    } else if (this.props.actionPush && this.props.actionPush === 'goToChallenge' && this.props.extraData) {
      await Actions.dettchallenge({ idChallenge: this.props.extraData });

    } else if (this.props.actionPush && this.props.actionPush === 'launchChallenge') {
      await Actions.challenge({ idProgram: this.props.idProgram });

    } else if (this.props.actionPush && this.props.actionPush === 'goToGains') {
      await Actions.shopMain();

    } else if (this.props.actionPush && this.props.actionPush === 'goToWallet') {
      await Actions.walletMain();

    }
    // reset the push notification action to avoid redirecting again 
    await this.props.dispatch(resetPushNotifAction())
    */
    this.props.dispatch(getMain())
    .then((result) => {
      if (result && result.data && result.data.userData) {
        this.props.dispatch(loadProfile(result.data.userData))
        this.props.dispatch(loadHorzChallenges(result.data.listChallenges))
        this.props.dispatch(loadNotifsMain(result.data.listNotifs))
      }
      if (result && result.data && result.data.listNotifsBadge) {
        const notifsForTabbar = result.data.listNotifsBadge.map((single) => {return {_id: single._id, date: single.date}})
        handleNewNotifs(this.props.dispatch, notifsForTabbar)
      }
    })
    .catch((error) => {
      console.log(error)
    })

    // ===============>>> retrieve and inject previous notifications
    if (localStorage && localStorage.getItem('receivedNotifs')) {
      const recordedItems = localStorage.getItem('receivedNotifs')
      const temp = JSON.parse(recordedItems)
      const listRecorded = temp && temp.length > 0 ? temp : []
      this.props.dispatch(setPreviousNotifs(listRecorded && listRecorded.length > 0 ? listRecorded : null))
    }

  }
  listFunction(data) {
    if (localStorage.getItem('TrickyAppId') === data.opponent && data.match === false && data.confirmed !== true) {
      this.props.history.push({ pathname: '/acceptance', state: { idChallenge: data._id }}) // to retrieve in fommowing page like : -> this.props.location.state.idChallenge
    } else {
      this.props.history.push({ pathname: '/detailchallenge', state: { idChallenge: data._id } }) // to retrieve in fommowing page like : -> this.props.location.state.idChallenge
    }
  }
  render() {
    return (
      <div className="flexed flexFill column">
        <Header back={false} right="burger" title={'Bienvenu-e ' + this.props.firstName + ' !'}/>
        <div className="flexed flexFill column alignStretch">
          <div className="scroll_y">
            { /* <img
              src={fond}
              style={styles.fond}
              alt="background-img"
            /> */ }
            <div className="over_hidden flexed alignStretch marginTop-45 paddingHorizontal-15">
              <button
                onClick={() => {this.props.history.push({ pathname: '/detailranking', state: {arg: 'program'} })}}
                className="width-50per"
              >
                <div className="flexed column justifyStart minWidth-90">
                  <p className="lineBreak textLeft fontSize-13 marginTop-10 white">MES TRICKS <span>DU MOIS</span></p>
                  <p className="textLeft fontSize-17 marginBottom-10 white weight-700">
                    { this.props.score ? this.props.score : '---' }
                    <span className="fontSize-15 marginTop-10">Ts</span>
                  </p>
                </div>
              </button>
              <button
                onClick={() => {this.props.history.push({ pathname: '/wallet', state: {origin: '/home'} })}}
                className="width-50per"
              >
                <div className="flexed column alignEnd justifyStart minWidth-90">
                  <p className="lineBreak textRight uppercase fontSize-13 marginTop-10 white">Réussite <span>dans mes défis</span></p>
                  <p className="textRight uppercase fontSize-17 marginBottom-10 flexed alignSelfEnd textRight white weight-700">
                    {this.props.achieve}
                    <span className="">%</span>
                  </p>
                </div>
              </button>
            </div>

            { /* BTN to start a new challenge */ }
            <div className="flexed justifyCentered">
              <button
                onClick={() => {
                  this.props.history.push({ pathname: '/challenge', state: { idProgram: this.props.idProgram } })
                }}
                className="over_hidden marginTop--35"
              >
                <img
                  src={btnChallenge}
                  alt="btn-challenge"
                  className="iconSize-140"
                />
              </button>
            </div>
            <p className="white uppercase textCenter marginTop-6 weight-300">Lancer un défi !</p>

            {/* CHALLENGES */}
            <div className="paddingTop-30 flexed column alignStretch">
              <div className="flexed justifySpaceBetween paddingHorizontal-15">
                {/* go to complete list of challenges */}
                <p className="white uppercase fontSize-12">Mes défis en cours</p>
                <button
                  className="borderBottomColor-2"
                  onClick={() => {
                    this.props.history.push('/allchallenges')
                  }}
                >
                  <p className="fontSize-12 white">Tous les défis</p>
                </button>
              </div>

              {/* show the 5 most recent CHALLENGES in the carousel */}
              { !this.props.mychallenges || this.props.mychallenges.length <= 0 ?
                <div className="flexed column alignStretch justifyCentered paddingTop-10 paddingBottom-10 paddingHorizontal-15">
                  <div className="flexed column paddingHorizontal-10 radius-8 bg_blur">
                    <p className="fontSize-15 paddingVertical-40 white textCenter">Vous n'avez pas de défis en cours</p>
                  </div>
                </div>
                :
                <ListChallengesHorizontal userId={localStorage.getItem('TrickyAppId')} list={this.props.mychallenges} listFunction={this.listFunction} avoidMarginTop={false}/>
              }
            </div>

            { /* BTN BET */ }
            <div className="flexed alignStretch column marginTop-35 marginBottom-15 paddingHorizontal-15">
              <p className="textCenter fontSize-13"><span className="white uppercase">Allez voir les défis de vos collegues !</span></p>
              <button
                onClick={() => {
                  this.props.history.push({ pathname: '/allchallenges', state: {configuration: 'toBet'} })
                }}
                className="shadowBtn marginTop-6 bg_color1_medium height-80 radius-15 flexed alignCenter justifyCentered white fontSize-26"
              >
                Miser
                <img
                  src={right}
                  alt="right-arrow"
                  className="twentyIconSize marginLeft-15"
                />
              </button>
            </div>

            {/* NOTIFICATIONS */}
            <div className="paddingTop-30 flexed column alignStretch paddingHorizontal-15">
              <div className="flexed justifySpaceBetween">
                {/* go to complete list of challenges */}
                <p className="white uppercase fontSize-12">Les dernières activités</p>
                <button
                  className="borderBottomColor-2"
                  onClick={() => {
                    this.props.history.push('/notifications')
                  }}
                >
                  <p className="fontSize-12 white">Toutes mes activités</p>
                </button>
              </div>
              {/* show the 5 most recent NOTIFICATIONS in the carousel */}
              { !this.props.existingList || !this.props.myactivities || this.props.myactivities.length <= 0 ?
                <div className="flexed column alignStretch justifyCentered paddingTop-10 paddingBottom-10 fullWidth">
                  <div className="flexed column paddingHorizontal-10 radius-8 bg_blur">
                    <p className="fontSize-17 paddingVertical-40 white textCenter">Vous n'avez pas encore d'activités</p>
                  </div>
                </div>
                :
                <ListNotifications
                  list={this.props.myactivities}
                  userId={localStorage.getItem('TrickyAppId')}
                  origin='main'
                  idProgram={this.props.idProgram}
                  existingList={this.props.existingList}
                />
              }
            </div>
            
          </div>
        </div>
        <Tabbar/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    firstName: state.profile.firstName,
    familyName: state.profile.familyName,
    email: state.profile.email,
    idProgram: state.profile.idProgram,
    score: state.profile.score,
    achieve: state.profile.achieve,
    mychallenges: state.challenges.listHorz,
    myactivities: state.notifications.itemsMain,
    existingList: state.notifications.existingList,
    actionPush: state.tools.actionPush,
    extraData: state.tools.extraData
  }
}

export default connect(mapStateToProps)(Main)