import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
/* COMPONENTS */
import BoxRouter from './BoxRouter'
/* ACTION CREATORS */
import { signinWithToken /*, allowSocket */ } from '../reducer/auth'
/* HELPERS */
import { handleNewNotifs } from '../helpers/notifs'
// import { setRouter } from '../reducer/tools'
/* HELPERS */
// import { handleNewNotifs } from '../helpers/notifs'
// import logout from '../helpers/logout'

// let deferredPrompt

class App extends Component {
  constructor() {
    super()
    this.state = {
      isOffline: false
    }
  }
  componentDidMount() {
    // ===>> handle offline message
    function updateOnlineStatus(event) {
      if (navigator.onLine) {
        this.setState({isOffline: true})
      } else {
        this.setState({isOffline: false})
      }
    }
    window.addEventListener('online', updateOnlineStatus)
    window.addEventListener('offline', updateOnlineStatus)

    //  ===>> show AddToHomeScreen prompt
    //  ==> DOCUMENTATION ==> https://developers.google.com/web/fundamentals/app-install-banners/
    //  ==> other DOC ==> https://love2dev.com/blog/beforeinstallprompt/
    //  ==> good extra doc ==> https://developer.mozilla.org/en-US/Apps/Progressive/Add_to_home_screen
    /*
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault()
      // Stash the event so it can be triggered later.
      deferredPrompt = e
      // Notify the user they can add to home screen
      btnAdd.style.display = 'block'
    })
    */

    // ===>> listen to the interraction of the user
    /*
    btnAdd.addEventListener('click', (e) => {
      // hide our user interface that shows our A2HS button
      btnAdd.style.display = 'none'
      // Show the prompt
      deferredPrompt.prompt()
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice
      .then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt')
        } else {
          console.log('User dismissed the A2HS prompt')
        }
        deferredPrompt = null;
      })
    })
    */
    // =========>> TOKEN VERIFICATION (at first mount if token is in localStorage and verification was yet not achieved)
    if (localStorage && localStorage.getItem('TrickyAppToken') && !this.props.routerToShow) {
      this.props.dispatch(signinWithToken())
      .then((result) => {
        // show nb not readen notifs in badge tabbar
        const notifsForTabbar = result.listNotifs.map((single) => {return {_id: single._id, date: single.date}})
        handleNewNotifs(this.props.dispatch, notifsForTabbar)
      })

    }
  }
  render() {
    return (
      <div className="flexed generalBox bg_gradiant">
        <BoxRouter/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    routerToShow: state.auth.routerToShow
  }
}

export default withRouter(connect(mapStateToProps)(App))
