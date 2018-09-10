import { animateScroll } from 'react-scroll'
/* ACTION CREATORS */
import { addAlert } from '../reducer/alerts'
import { saveSingleChallengeForce, loadChallenges, loadHorzChallenges, loadPastChallenges, saveNotifsOfChalsForce, saveFreezesOfChalsForce } from '../reducer/challenges'
import { addLastComment, listForHashTag } from '../reducer/chats'
import { loadNotifsMain, loadNotifsPers, loadNotifsAll } from '../reducer/notifications'
import { loadProfile } from '../reducer/profile'
import { markNotifs, handleNewNotifs } from '../helpers/notifs'

export default (io, dispatch, history) => {
  // const state = store.getState()
  io.on('badgeNotifs', (data) => {
    // resgister the notifications in the asyncStorage to avoid undesired tabbar badge notification
    if (data && data.listNotifsBadge && data.listNotifsBadge.length > 0) {
      const notifsForTabbar = data.listNotifsBadge.map((single) => {return {_id: single._id, date: single.date}})
      handleNewNotifs(dispatch, notifsForTabbar)
    }
  })

  /* ----------- MAIN PAGE -------------------- */

  io.on('getMainUserInfosRes', (data) => {
    dispatch(loadProfile(data.userData))
  })

  io.on('getMainChallengesRes', (data) => {
    dispatch(loadHorzChallenges(data.listChallenges))
  })

  io.on('getMainNotifsRes', (data) => {
    dispatch(loadNotifsMain(data.listNotifs))
  })

  io.on('challengePageDetailsForce', (data) => {
    dispatch(addAlert('cool', 'Félicitations, vous avez parié sur le défi'))
    // call server to update the list of challenges
    if (io) {
      io.emit('getMainForce', {})
      io.emit('allChallenges', {
        selectDef: 'current',
        switcher: 'personal',
        nb: 30
      })
    }
    // store the new data in the state
    dispatch(saveSingleChallengeForce(data))
  })
  io.on('challengePageFreezesForce', (data) => {
    dispatch(saveFreezesOfChalsForce(data))
  })
  io.on('challengePageNotifsForce', (data) => {
    dispatch(saveNotifsOfChalsForce(data))
  })
  io.on('forceAllNotifs', (data) => {
    // empty the freeze that had to be validate
    if (io) {
      io.emit('loadNotifsForce', {target: 'getMain'})
      io.emit('loadNotifsForce', {target: 'personal'})
      io.emit('loadNotifsForce', {target: 'all'})
    }
  })


  // forced to reload all lists of notifs because some news
  io.on('generalForceAll', (data) => {
    if (io) {
      io.emit('getMainForce', {})
      io.emit('allChallenges', {
        selectDef: 'current',
        switcher: 'personal',
        nb: 30
      })
      io.emit('allChallenges', {
        selectDef: 'finished',
        switcher: 'personal',
        nb: 30
      })
      io.emit('allChallenges', {
        selectDef: 'current',
        switcher: 'all',
        nb: 30
      })
      io.emit('allChallenges', {
        selectDef: 'finished',
        switcher: 'all',
        nb: 30
      })
      io.emit('loadNotifsForce', {target: 'personal'})
      io.emit('loadNotifsForce', {target: 'all'})
    }
  })

  /* ----------- CHAT PAGE -------------------- */
  // add the single last comment written
  io.on('loadchatsResForce', (data) => {
    dispatch(addLastComment(data.comment, data.currentTime))
    animateScroll.scrollToBottom({
      containerId: 'scrollPosition',
      duration: 1000
    })
  })

  io.on('getHashTagChallsRes', (data) => {
    dispatch(listForHashTag(data.listChallenges))
  })

  /* ----------- ALL CHALLENGE PAGE -------------------- */

  io.on('allChallengesRes', (data) => {
    if (data.allChallenges && data.par.selectDef === 'finished') {
      dispatch(loadPastChallenges(data.allChallenges))
    } else if (data.allChallenges && data.par.selectDef === 'current') {
      dispatch(loadChallenges(data.allChallenges))
    }
  })
  /* ----------- ACCEPTANCE PAGE -------------------- */

  io.on('acceptanceRes', (data) => {
    history.push('/')
    if (io) {
      io.emit('getMainForce', {})
      io.emit('allChallenges', {
        selectDef: 'current',
        switcher: 'all',
        nb: 30
      })
      io.emit('allChallenges', {
        selectDef: 'current',
        switcher: 'personal',
        nb: 30
      })
      io.emit('loadNotifsForce', {target: 'personal'})
      io.emit('loadNotifsForce', {target: 'all'})
    }
  })

  /* ----------- DETAIL FREEZE PAGE -------------------- */

  io.on('validateDetFreezeRes', (data) => {
    // empty the freeze that had to be validate
    this.props.history.goBack()
    dispatch(loadNotifsAll(data.notifs))
  })

  /* ----------- DETAIL NOTIFS PAGE -------------------- */

  io.on('loadNotifsRes', (data) => {
    if (data.target === 'personal') {
      dispatch(loadNotifsPers(data.notifs))
      // register the notifications in the asyncStorage to avoid undesired tabbar badge notification
      if (data && data.notifs && data.notifs.length > 0) {
        const notifsForTabbar = data.notifs.map((single) => {return {_id: single._id, date: single.date}})
        markNotifs(dispatch, notifsForTabbar, () => {})
      }
    } else if (data.target === 'all') {
      dispatch(loadNotifsAll(data.notifs))
      // register the notifications in the asyncStorage to avoid undesired tabbar badge notification
      if (data && data.notifs && data.notifs.length > 0) {
        const notifsForTabbar = data.notifs.map((single) => {return {_id: single._id, date: single.date}})
        markNotifs(dispatch, notifsForTabbar, () => {})
      }
    } else if (data.target === 'getMain') {
      dispatch(loadNotifsMain(data.notifs))
    }
  })

  io.on('loadNotifsResForce', (data) => {
    if (data.target === 'personal') {
      dispatch(loadNotifsPers(data.notifs))
    } else if (data.target === 'all') {
      dispatch(loadNotifsAll(data.notifs))
    } else if (data.target === 'getMain') {
      dispatch(loadNotifsMain(data.notifs))
    }
  })

  /* ----------- END CHALLENGE PAGE -------------------- */

  io.on('createChallengeRes', (data) => {
    dispatch(loadHorzChallenges(data.listChallenges))
    if (io) {
      io.emit('loadNotifsForce', {target: 'getMain'})
    }
    // history.push({ pathname: '/acceptance', state: { idChallenge: data._id }})
  })

  // force the update of the profile of the opponent
  io.on('forcedAll', (data) => {
    if (io) {
      io.emit('getMainForce', {})
      io.emit('allChallenges', {
        selectDef: 'current',
        switcher: 'all',
        nb: 30
      })
      io.emit('allChallenges', {
        selectDef: 'current',
        switcher: 'personal',
        nb: 30
      })
      io.emit('loadNotifsForce', {target: 'personal'})
      io.emit('loadNotifsForce', {target: 'all'})
    }
  })

  io.on('changeUserPasswordRes', (data) => {
    // show the confirmation message
    dispatch(addAlert('cool', 'Votre mot de passe a été mis à jour'))
  })

  io.on('sendSuggestionRes', (data) => {
    dispatch(addAlert('cool', 'Votre suggestion a été envoyé à l\'administrateur'))
  })

  /* ----------- TEMPORARY PAGE -------------------- */

  io.on('verifyFirstConnectionRes', (data) => {
    if (data && data.userData && !data.userData.program) {
      history.push('/temporary')
    // verify if it is the first connection for this user
    } else if (data.userData && data.userData.firstConnectionDone && data.userData.firstConnectionDone === true) {
      // redirect to main page
      history.push('/')
    } else {
      // redirect to the first configuration
      history.push('/firstintro')
    }
  })
}
