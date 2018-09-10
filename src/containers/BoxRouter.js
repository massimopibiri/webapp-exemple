import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
// import asyncComponent from '../components/AsyncComponent'
/* to show error messages in every page */
import ContainerAlerts from '../components/Alerts/ContainerAlerts'
/* ICONS */
import loading from '../icons/loading1.gif'
/* CONTAINERS */
import SocketCont from './SocketCont'

import Account from './Account'
import Acceptance from './Acceptance'
import AllChallenges from './AllChallenges'
import Betting from './Betting'
import Bonus from './Bonus'
import Challenge from './Challenge'
import Chat from './Chat'
import ChooseTarget from './ChooseTarget'
import ConfirmFreeze from './ConfirmFreeze'
import CustomTheme from './CustomTheme'
import DestinationFreeze from './DestinationFreeze'
import DetailChallenge from './DetailChallenge'
import DetailFreeze from './DetailFreeze'
import DetailRanking from './DetailRanking'
import EndChallenge from './EndChallenge'
import FirstConfig from './FirstConfig'
import FirstExtraInfos from './FirstExtraInfos'
import Freeze from './Freeze'
import GenConfig from './GenConfig'
import IntroFreeze from './IntroFreeze'
import Infos from './Infos'
import Lasting from './Lasting'
import Main from './Main'
import Notifications from './Notifications'
import OpponentChalls from './OpponentChalls'
import Parameters from './Parameters'
import PreviewFreeze from './PreviewFreeze'
import PreviewImg from './PreviewImg'
import Ranking from './Ranking'
import SideMenu from './SideMenu'
import Slide from './Slide'
import SubThemes from './SubThemes'
import Suspect from './Suspect'
import Temporary from './Temporary'
import Theme from './Theme'
import Unknown from './Unknown'
import UploadImg from './UploadImg'
import Wallet from './Wallet'
/*
const Account = asyncComponent(() => import('./Account'))
const Acceptance = asyncComponent(() => import('./Acceptance'))
const AllChallenges = asyncComponent(() => import('./AllChallenges'))
const Betting = asyncComponent(() => import('./Betting'))
const Bonus = asyncComponent(() => import('./Bonus'))
const Challenge = asyncComponent(() => import('./Challenge'))
const Chat = asyncComponent(() => import('./Chat'))
const ChooseTarget = asyncComponent(() => import('./ChooseTarget'))
const ConfirmFreeze = asyncComponent(() => import('./ConfirmFreeze'))
const CustomTheme = asyncComponent(() => import('./CustomTheme'))
const DestinationFreeze = asyncComponent(() => import('./DestinationFreeze'))
const DetailChallenge = asyncComponent(() => import('./DetailChallenge'))
const DetailFreeze = asyncComponent(() => import('./DetailFreeze'))
const DetailRanking = asyncComponent(() => import('./DetailRanking'))
const EndChallenge = asyncComponent(() => import('./EndChallenge'))
const FirstConfig = asyncComponent(() => import('./FirstConfig'))
const FirstExtraInfos = asyncComponent(() => import('./FirstExtraInfos'))
const Freeze = asyncComponent(() => import('./Freeze'))
const GenConfig = asyncComponent(() => import('./GenConfig'))
const IntroFreeze = asyncComponent(() => import('./IntroFreeze'))
const Infos = asyncComponent(() => import('./Infos'))
const Lasting = asyncComponent(() => import('./Lasting'))
const Main = asyncComponent(() => import('./Main'))
const Notifications = asyncComponent(() => import('./Notifications'))
const OpponentChalls = asyncComponent(() => import('./OpponentChalls'))
const Parameters = asyncComponent(() => import('./Parameters'))
const PreviewFreeze = asyncComponent(() => import('./PreviewFreeze'))
const PreviewImg = asyncComponent(() => import('./PreviewImg'))
const Ranking = asyncComponent(() => import('./Ranking'))
const SideMenu = asyncComponent(() => import('./SideMenu'))
const Slide = asyncComponent(() => import('./Slide'))
const SubThemes = asyncComponent(() => import('./SubThemes'))
const Suspect = asyncComponent(() => import('./Suspect'))
const Temporary = asyncComponent(() => import('./Temporary'))
const Theme = asyncComponent(() => import('./Theme'))
const Unknown = asyncComponent(() => import('./Unknown'))
const UploadImg = asyncComponent(() => import('./UploadImg'))
const Wallet = asyncComponent(() => import('./Wallet'))
*/


const PrivateRoute = ({component: Component, authed, routerToShow, temporary, ...rest}) => {
  return (
    <Route
      {...rest}
      render={
        (props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: temporary, state: {from: props.location}}} />
      }
    />
  )
}
const AccountRoute = ({component: Component, authed, routerToShow, temporary, ...rest}) => {
  let defineRedirect
  if (temporary) {
    defineRedirect = temporary
  } else if (routerToShow && routerToShow === 'matchOff') {
    defineRedirect = '/chat'
  } else {
    defineRedirect = '/home'
  }
  return (
    <Route
      {...rest}
      render={
        (props) => authed === true
        ? <Redirect to={{pathname: defineRedirect, state: {from: props.location}}} />
        : <Component {...props} />
      }
    />
  )
}

class BoxRouter extends Component {
  constructor() {
    super()
    this.renderRouter = this.renderRouter.bind(this)
  }
  renderRouter() {
    // if the program is finished
    if (this.props.routerToShow && this.props.routerToShow === 'matchOff') {
      return (
        <Switch>
          <AccountRoute exact path='/' component={Account} authed={this.props.authenticated} routerToShow={this.props.routerToShow} temporary={this.props.temporary}/>
          <PrivateRoute exact path='/bonus' component={Bonus} authed={this.props.authenticated} routerToShow={this.props.routerToShow} temporary={this.props.temporary}/>
          <PrivateRoute exact path='/chat' component={Chat} authed={this.props.authenticated} routerToShow={this.props.routerToShow} temporary={this.props.temporary}/>
          <PrivateRoute exact path='/detailchallenge' component={DetailChallenge} authed={this.props.authenticated} routerToShow={this.props.routerToShow} temporary={this.props.temporary}/>
          <PrivateRoute exact path='/detailFreeze' component={DetailFreeze} authed={this.props.authenticated} routerToShow={this.props.routerToShow} temporary={this.props.temporary}/>
          <PrivateRoute exact path='/detailRanking' component={DetailRanking} authed={this.props.authenticated} routerToShow={this.props.routerToShow} temporary={this.props.temporary}/>
          <PrivateRoute exact path='/firstconfig' component={FirstConfig} authed={this.props.authenticated} routerToShow={this.props.routerToShow} temporary={this.props.temporary}/>
          <PrivateRoute exact path='/firstExtraInfos' component={FirstExtraInfos} authed={this.props.authenticated} routerToShow={this.props.routerToShow} temporary={this.props.temporary}/>
          <PrivateRoute exact path='/firstintro' component={Slide} authed={this.props.authenticated} routerToShow={this.props.routerToShow} temporary={this.props.temporary}/>
          <PrivateRoute exact path='/genConfig' component={GenConfig} authed={this.props.authenticated} routerToShow={this.props.routerToShow} temporary={this.props.temporary}/>
          <PrivateRoute exact path='/infos' component={Infos} authed={this.props.authenticated} routerToShow={this.props.routerToShow} temporary={this.props.temporary}/>
          <AccountRoute exact path='/lost' component={Account} authed={this.props.authenticated} routerToShow={this.props.routerToShow} temporary={this.props.temporary}/>
          <PrivateRoute exact path='/notifications' component={Notifications} authed={this.props.authenticated} routerToShow={this.props.routerToShow} temporary={this.props.temporary}/>
          <PrivateRoute exact path='/parameters' component={Parameters} authed={this.props.authenticated} routerToShow={this.props.routerToShow} temporary={this.props.temporary}/>
          <PrivateRoute exact path='/previewImg' component={PreviewImg} authed={this.props.authenticated} routerToShow={this.props.routerToShow} temporary={this.props.temporary}/>
          <PrivateRoute exact path='/ranking' component={Ranking} authed={this.props.authenticated} routerToShow={this.props.routerToShow} temporary={this.props.temporary}/>
          <PrivateRoute exact path='/sidemenu' component={SideMenu} authed={this.props.authenticated} routerToShow={this.props.routerToShow} temporary={this.props.temporary}/>
          <PrivateRoute exact path='/temporary' component={Temporary} authed={this.props.authenticated} routerToShow={this.props.routerToShow} temporary={this.props.temporary}/>
          <PrivateRoute exact path='/uploadImg' component={UploadImg} authed={this.props.authenticated} routerToShow={this.props.routerToShow} temporary={this.props.temporary}/>
          <PrivateRoute exact path='/wallet' component={Wallet} authed={this.props.authenticated} routerToShow={this.props.routerToShow} temporary={this.props.temporary}/>
          <PrivateRoute component={Unknown} authed={this.props.authenticated} routerToShow={this.props.routerToShow} temporary={this.props.temporary}/>
        </Switch>
      )
    // if the program is playing or waiting to start
    } else if (this.props.routerToShow && this.props.routerToShow === 'matchOn') {
      return (
        <Switch>
          <AccountRoute exact path='/' component={Account} authed={this.props.authenticated} routerToShow={this.props.routerToShow} temporary={this.props.temporary}/>
          <PrivateRoute exact path='/acceptance' component = {Acceptance} authed={this.props.authenticated} routerToShow={this.props.routerToShow} temporary={this.props.temporary}/>
          <PrivateRoute exact path='/allchallenges' component = {AllChallenges} authed={this.props.authenticated} routerToShow={this.props.routerToShow} temporary={this.props.temporary}/>
          <PrivateRoute exact path='/betting' component = {Betting} authed={this.props.authenticated} routerToShow={this.props.routerToShow} temporary={this.props.temporary}/>
          <PrivateRoute exact path='/bonus' component = {Bonus} authed={this.props.authenticated} routerToShow={this.props.routerToShow} temporary={this.props.temporary}/>
          <PrivateRoute exact path='/challenge' component = {Challenge} authed={this.props.authenticated} routerToShow={this.props.routerToShow} temporary={this.props.temporary}/>
          <PrivateRoute exact path='/chat' component = {Chat} authed={this.props.authenticated} routerToShow={this.props.routerToShow} temporary={this.props.temporary}/>
          <PrivateRoute exact path='/choosetarget' component = {ChooseTarget} authed={this.props.authenticated} routerToShow={this.props.routerToShow} temporary={this.props.temporary}/>
          <PrivateRoute exact path='/confirmfreeze' component = {ConfirmFreeze} authed={this.props.authenticated} routerToShow={this.props.routerToShow} temporary={this.props.temporary}/>
          <PrivateRoute exact path='/customtheme' component = {CustomTheme} authed={this.props.authenticated} routerToShow={this.props.routerToShow} temporary={this.props.temporary}/>
          <PrivateRoute exact path='/destinationfreeze' component = {DestinationFreeze} authed={this.props.authenticated} routerToShow={this.props.routerToShow} temporary={this.props.temporary}/>
          <PrivateRoute exact path='/detailchallenge' component = {DetailChallenge} authed={this.props.authenticated} routerToShow={this.props.routerToShow} temporary={this.props.temporary}/>
          <PrivateRoute exact path='/detailFreeze' component = {DetailFreeze} authed={this.props.authenticated} routerToShow={this.props.routerToShow} temporary={this.props.temporary}/>
          <PrivateRoute exact path='/detailRanking' component = {DetailRanking} authed={this.props.authenticated} routerToShow={this.props.routerToShow} temporary={this.props.temporary}/>
          <PrivateRoute exact path='/endchallenge' component = {EndChallenge} authed={this.props.authenticated} routerToShow={this.props.routerToShow} temporary={this.props.temporary}/>
          <PrivateRoute exact path='/firstconfig' component = {FirstConfig} authed={this.props.authenticated} routerToShow={this.props.routerToShow} temporary={this.props.temporary}/>
          <PrivateRoute exact path='/firstExtraInfos' component = {FirstExtraInfos} authed={this.props.authenticated} routerToShow={this.props.routerToShow} temporary={this.props.temporary}/>
          <PrivateRoute exact path='/firstintro' component = {Slide} authed={this.props.authenticated} routerToShow={this.props.routerToShow} temporary={this.props.temporary}/>
          <PrivateRoute exact path='/freeze' component = {Freeze} authed={this.props.authenticated} routerToShow={this.props.routerToShow} temporary={this.props.temporary}/>
          <PrivateRoute exact path='/genConfig' component={GenConfig} authed={this.props.authenticated} routerToShow={this.props.routerToShow} temporary={this.props.temporary}/>
          <PrivateRoute exact path='/home' component = {Main} authed={this.props.authenticated} routerToShow={this.props.routerToShow} temporary={this.props.temporary}/>
          <PrivateRoute exact path='/infos' component={Infos} authed={this.props.authenticated} routerToShow={this.props.routerToShow} temporary={this.props.temporary}/>
          <PrivateRoute exact path='/introfreeze' component={IntroFreeze} authed={this.props.authenticated} routerToShow={this.props.routerToShow} temporary={this.props.temporary}/>
          <PrivateRoute exact path='/lasting' component={Lasting} authed={this.props.authenticated} routerToShow={this.props.routerToShow} temporary={this.props.temporary}/>
          <AccountRoute exact path='/lost' component={Account} authed={this.props.authenticated} routerToShow={this.props.routerToShow} temporary={this.props.temporary}/>
          <PrivateRoute exact path='/notifications' component={Notifications} authed={this.props.authenticated} routerToShow={this.props.routerToShow} temporary={this.props.temporary}/>
          <PrivateRoute exact path='/opponentChalls' component={OpponentChalls} authed={this.props.authenticated} routerToShow={this.props.routerToShow} temporary={this.props.temporary}/>
          <PrivateRoute exact path='/parameters' component={Parameters} authed={this.props.authenticated} routerToShow={this.props.routerToShow} temporary={this.props.temporary}/>
          <PrivateRoute exact path='/previewfreeze' component={PreviewFreeze} authed={this.props.authenticated} routerToShow={this.props.routerToShow} temporary={this.props.temporary}/>
          <PrivateRoute exact path='/previewImg' component={PreviewImg} authed={this.props.authenticated} routerToShow={this.props.routerToShow} temporary={this.props.temporary}/>
          <PrivateRoute exact path='/ranking' component={Ranking} authed={this.props.authenticated} routerToShow={this.props.routerToShow} temporary={this.props.temporary}/>
          <PrivateRoute exact path='/sidemenu' component={SideMenu} authed={this.props.authenticated} routerToShow={this.props.routerToShow} temporary={this.props.temporary}/>
          <PrivateRoute exact path='/subtheme' component={SubThemes} authed={this.props.authenticated} routerToShow={this.props.routerToShow} temporary={this.props.temporary}/>
          <PrivateRoute exact path='/suspect' component={Suspect} authed={this.props.authenticated} routerToShow={this.props.routerToShow} temporary={this.props.temporary}/>
          <PrivateRoute exact path='/temporary' component={Temporary} authed={this.props.authenticated} routerToShow={this.props.routerToShow} temporary={this.props.temporary}/>
          <PrivateRoute exact path='/theme' component={Theme} authed={this.props.authenticated} routerToShow={this.props.routerToShow} temporary={this.props.temporary}/>
          <PrivateRoute exact path='/uploadImg' component={UploadImg} authed={this.props.authenticated} routerToShow={this.props.routerToShow} temporary={this.props.temporary}/>
          <PrivateRoute exact path='/wallet' component={Wallet} authed={this.props.authenticated} routerToShow={this.props.routerToShow} temporary={this.props.temporary}/>
          <PrivateRoute component={Unknown} authed={this.props.authenticated} routerToShow={this.props.routerToShow} temporary={this.props.temporary}/>
        </Switch>
      )
    // if we do not have the token, render auth router
    } else if (!this.props.routerToShow && localStorage && !localStorage.getItem('TrickyAppToken')) {
      return (
        <Switch>
          <Route exact path='/' component={Account}/>
          <Route exact path='/lost' component={Account}/>
          <Route component={Unknown}/>
        </Switch>
      )
    // if we have the token, wait for verification
    } else {
      return (
        <div className="flexed flexFill column alignCenter justifyCentered">
          <img
            className="loading"
            alt="loading-icon"
            src={loading}
          />
        </div>
      )
    }
  }
  render() {
    return (
      <div className="flexed flexFill column maxWidth over_hidden fullWidth alignSelfCenter relativePos">
        <SocketCont letSocket={this.props.routerToShow && this.props.history && this.props.history.location && this.props.history.location.pathname && this.props.history.location.pathname !== '/' && this.props.history.location.pathname !== '/lost' ? true : false}>
          { this.renderRouter() }
        </SocketCont> 
        <ContainerAlerts/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    routerToShow: state.auth.routerToShow,
    temporary: state.auth.temporary
  }
}

export default withRouter(connect(mapStateToProps)(BoxRouter))