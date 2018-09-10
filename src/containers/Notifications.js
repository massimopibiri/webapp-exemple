
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
/* COMPONENTS */
import Header from '../components/Header'
import ListNotifications from '../components/ListNotifications'
import Tabbar from '../components/Tabbar'
/* ACTION CREATORS */
import { addAlert } from '../reducer/alerts'
import { selectDest, setPreviousNotifs, getNotifs, loadNotifsPers, loadNotifsAll } from '../reducer/notifications'
/* HELPERS */
import { markNotifs } from '../helpers/notifs'
/* IMAGES */
import loading from '../icons/loading1.gif'

class Notifications extends React.Component {
  constructor() {
    super()
    this.tabs = this.tabs.bind(this)
    this.onSelect = this.onSelect.bind(this)
    this.listNotifs = this.listNotifs.bind(this)
  }
  componentDidMount() {
    // load the async data of previous notifications in the redux state
    const recordedItems = localStorage.getItem('receivedNotifs')
    const temp = JSON.parse(recordedItems)
    const listRecorded = temp && temp.length > 0 ? JSON.parse(recordedItems) : []
    this.props.dispatch(setPreviousNotifs(listRecorded && listRecorded.length > 0 ? listRecorded : null))

    // ====>> load data of the page
    this.props.dispatch(selectDest(this.props.selectedTab ? this.props.selectedTab : 'Mon reseau'))
    const typeOfCall = this.props.selectedTab && this.props.selectedTab === 'Moi' ? 'personal' : 'all'

    // get notifications and load in the right state
    this.props.dispatch(getNotifs({target: typeOfCall}))
    .then((result) => {
      if (result.data.target === 'personal') {
        this.props.dispatch(loadNotifsPers(result.data.notifs))
      } else if (result.data.target === 'all') {
        this.props.dispatch(loadNotifsAll(result.data.notifs))
      }
      // register the notifications in the asyncStorage to avoid undesired tabbar badge notification
      if (result && result.data && result.data.notifs && result.data.notifs.length > 0) {
        const notifsForTabbar = result.data.notifs.map((single) => {return {_id: single._id, date: single.date}})
        markNotifs(this.props.dispatch, notifsForTabbar, () => {})
      }
    })
    .catch((error) => {
      console.log(error)
    })
  }
  onSelect(title) {
    // handle the select feedback for tabs
    this.props.dispatch(selectDest(title))
    const target = title === 'Moi' ? 'personal' : 'all'
    // load the data according to select specification
    if (this.context.websocket) {
      this.context.websocket.emit('loadNotifs', {target})    
    } else {
      this.props.dispatch(addAlert('cool', 'Veuillez recharger la page'))
    }
  }
  tabs(title) {
    // check if the item is selected to render the selected classes
    if (title === this.props.selectedTab) {
      // return the selected tag
      return (
        <div className="flexed flexFill column alignStretch justifyCentered borderBottomWhite-2 paddingVertical-15">
          <button onClick={() => this.onSelect(title)}>
            <p className="textCenter fontSize-15 white weight-400">{title}</p>
          </button>
        </div>
      )
    } else {
      // return the normal tag
      return (
        <div className="flexed flexFill column alignStretch justifyCentered paddingVertical-15">
          <button onClick={() => this.onSelect(title)}>
            <p className="textCenter fontSize-15 white weight-300">{title}</p>
          </button>
        </div>
      )
    }
  }
  listNotifs() {
    if (this.props.notifsPers && this.props.notifsPers.length > 0 && this.props.selectedTab === 'Moi') {
      return (
        <ListNotifications
          list={this.props.notifsPers}
          userId={localStorage.getItem('TrickyAppId')}
          origin='notif'
          idProgram={this.props.idProgram}
          existingList={this.props.existingList}
        />
      )
    } else if (this.props.notifsAll && this.props.notifsAll.length > 0 && this.props.selectedTab === 'Mon reseau') {      return (
        <ListNotifications
          list={this.props.notifsAll}
          userId={localStorage.getItem('TrickyAppId')}
          origin='notif'
          existingList={this.props.existingList}
        />
      )
    } else {
      return (
        <img
          className="loading"
          src={loading}
          alt="loading"
        />
      )
    }
  }
  render() {
    return (
      <div className="flexed flexFill column">
        <Header back={false} right="burger" title="Notifications"/>
        <div className="height-50 flexed alignCenter justifyCentered">
          { this.tabs('Mon reseau') }
          { this.tabs('Moi') }
        </div>
        <div className="flexed flexFill paddingHorizontal-15">
          { this.listNotifs() }
        </div>
        <Tabbar/>
      </div>
    )
  }
}
// access context.type to get the store to pass to socket.io initialization
Notifications.contextTypes = {
  websocket: PropTypes.object
}

function mapStateToProps(state) {
  return {
    idProgram: state.profile.idProgram,
    notifsAll: state.notifications.itemsAll,
    notifsPers: state.notifications.itemsPers,
    selectNot: state.notifications.selectNot,
    selectedTab: state.notifications.selectedTab,
    existingList: state.notifications.existingList,
  }
}

export default connect(mapStateToProps)(Notifications)
