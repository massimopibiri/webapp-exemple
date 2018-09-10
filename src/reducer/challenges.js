import ApiClient from '../helpers/apiClient'

const LOAD_CHALLENGES = 'redux/challenges/LOAD_CHALLENGES'
const LOAD_CHALLENGES_SUCCESS = 'redux/challenges/LOAD_CHALLENGES_SUCCESS'
// const RESET_CHALLENGES = 'redux/challenges/RESET_CHALLENGES'
const LOAD_PAST_CHALLENGES = 'redux/challenges/LOAD_PAST_CHALLENGES'
const LOAD_HORZ_CHALLENGES = 'redux/challenges/LOAD_HORZ_CHALLENGES'
const LOAD_SINGLE_SUCCESS = 'redux/challenges/LOAD_SINGLE_SUCCESS'
const LOAD_SINGLE_FORCE = 'redux/challenges/LOAD_SINGLE_FORCE'
const LOAD_FREEZES_FORCE = 'redux/challenges/LOAD_FREEZES_FORCE'
const LOAD_NOTIFS_FORCE = 'redux/challenges/LOAD_NOTIFS_FORCE'
const SELECT_DEF = 'redux/challenges/SELECT_DEF'
const CHANGE_SWITCHER = 'redux/challenges/CHANGE_SWITCHER'
const AUTHORIZE_FREEZE = 'redux/challenges/AUTHORIZE_FREEZE'
const SELECT_FIELD = 'redux/challenges/SELECT_FIELD'
const CHALLENGES_ENGAGED_SUCCESS = 'redux/challenges/CHALLENGES_ENGAGED_SUCCESS'
const AUTHORIZED_THEMES_SUCCESS = 'redux/challenges/AUTHORIZED_THEMES_SUCCESS'
const CALL = 'redux/challenges/CALL'
const CALL_SUCCESS = 'redux/challenges/CALL_SUCCESS'
const CALL_FAIL = 'redux/challenges/CALL_FAIL'

const defaultState = {
  list: [],
  listPast: [],
  listHorz: [],
  data: {},
  freezes: [],
  notifs: [],
  selectDef: 'Défis en cours',
  switcher: true,
  authorizeFreeze: true,
  dataPicker: null,
  showPicker: false,
  showctas: false,
  where: 'horiz',
  listChallenges: undefined,
  showSubThemes: false,
  loaded: false,
  authorizeCustom: false,
  authorizeTabac: false,
  authorizeFood: false,
  authorizeSport: false,
  authorizeRelax: false
}

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case LOAD_CHALLENGES:
      return {
        ...state,
        list: action.data,
        where: 'current',
        loaded: true
      }
    case LOAD_CHALLENGES_SUCCESS:
      return {
        ...state,
        list: action.result.data.allChallenges,
        where: 'current',
        loaded: true
      }
    /*
    case RESET_CHALLENGES:
      return {
        ...state,
        list: [],
        loaded: false
      }
    */
    case LOAD_PAST_CHALLENGES:
      return {
        ...state,
        listPast: action.data,
        where: 'past',
        loaded: true
      }
    case LOAD_HORZ_CHALLENGES:
      return {
        ...state,
        listHorz: action.data,
        where: 'horiz'
      }
    case LOAD_SINGLE_SUCCESS:
      return {
        ...state,
        data: action.result.data.challenge,
        freezes: action.result.data.freezes,
        notifs: action.result.data.notifs
      }
    case LOAD_SINGLE_FORCE: // force the app to reload comments if the user is in the right page
      // check if the users is situated in the right page before forcing the reload
      if (state.data._id === action.data.challengeId) {
        return {
          ...state,
          data: action.data
        }
      } else {
        return state
      }
    case LOAD_FREEZES_FORCE: // force the app to reload comments if the user is in the right page
      // check if the users is situated in the right page before forcing the reload
      if (state.data._id === action.data.challengeId) {
        return {
          ...state,
          freezes: action.data.cont
        }
      } else {
        return state
      }
    case LOAD_NOTIFS_FORCE: // force the app to reload comments if the user is in the right page
      // check if the users is situated in the right page before forcing the reload
      if (state.data._id === action.data.challengeId) {
        return {
          ...state,
          notifs: action.data.cont
        }
      } else {
        return state
      }
    case SELECT_DEF:
      return {
        ...state,
        selectDef: action.title
      }
    case CHANGE_SWITCHER:
      return {
        ...state,
        switcher: !action.data
      }
    case AUTHORIZE_FREEZE:
      return {
        ...state,
        authorizeFreeze: action.data
      }
    case SELECT_FIELD:
      return {
        ...state,
        fieldOfTheBet: action.data,
        showPicker: !action.show
      }
    case CHALLENGES_ENGAGED_SUCCESS:
      return {
        ...state,
        listChallenges: action.result.data.listChallenges,
        showSubThemes: true
      }
    case AUTHORIZED_THEMES_SUCCESS:
      return {
        ...state,
        authorizeCustom: action.result.data.company.authorizeCustom,
        authorizeTabac: action.result.data.company.authorizeTabac,
        authorizeFood: action.result.data.company.authorizeFood,
        authorizeSport: action.result.data.company.authorizeSport,
        authorizeRelax: action.result.data.company.authorizeRelax
      }
    case CALL:
      return {
        ...state,
      }
    case CALL_SUCCESS:
      return {
        ...state,
      }
    case CALL_FAIL:
      return {
        ...state,
      }
    default:
      return state
  }
}

export function selectField (data, show) {
  return {
    type: SELECT_FIELD,
    data,
    show
  }
}

export function selectDef(title) {
  return {
    type: SELECT_DEF,
    title
  }
}


export function changeSwitch (data) {
  return {
    type: CHANGE_SWITCHER,
    data
  }
}
/*
export function saveSingleChallenge (data) {
  return {
    type: LOAD_SINGLE,
    data
  }
}
*/

export function saveSingleChallengeForce (data) {
  return {
    type: LOAD_SINGLE_FORCE,
    data
  }
}
/*
export function saveFreezesOfChals (freezes) {
  return {
    type: LOAD_FREEZES,
    freezes
  }
}
*/
export function saveFreezesOfChalsForce (data) {
  return {
    type: LOAD_FREEZES_FORCE,
    data
  }
}
/*
export function saveNotifsOfChals (notifs) {
  return {
    type: LOAD_NOTIFS,
    notifs
  }
}
*/
export function saveNotifsOfChalsForce (data) {
  return {
    type: LOAD_NOTIFS_FORCE,
    data
  }
}
export function loadPastChallenges (data) {
  return {
    type: LOAD_PAST_CHALLENGES,
    data
  }
}
export function loadHorzChallenges (data) {
  return {
    type: LOAD_HORZ_CHALLENGES,
    data
  }
}
/*
export function resetChallenges () {
  return {
    type: RESET_CHALLENGES
  }
}

*/
export function loadChallenges (data) {
  return {
    type: LOAD_CHALLENGES,
    data
  }
}
export const authorizeFreeze = (data) => {
  return {
    type: AUTHORIZE_FREEZE,
    data
  }
}

export const getAllPlayers = (data) => {
  return {
    types: [CALL, CALL_SUCCESS, CALL_FAIL],
    first: () => {
      return new Promise((resolve, reject) => {
        ApiClient('jsonapi', 'GET', null, '/challenges/getAllPlayers/' + data.idProgram)
        // trigger the promise in the clientMiddleware
        .then((result) => {
          resolve(result)
        })
        .catch((error) => {
          reject(error)
        })
      })
    }
  }
}

export const autorizedThemes = (data) => {
  return {
    types: [CALL, AUTHORIZED_THEMES_SUCCESS, CALL_FAIL],
    first: () => {
      return new Promise((resolve, reject) => {
        ApiClient('jsonapi', 'GET', null, '/challenges/autorizedThemes')
        // trigger the promise in the clientMiddleware
        .then((result) => {
          resolve(result)
        })
        .catch((error) => {
          reject(error)
        })
      })
    }
  }
}

export const checkIfOppEngaged = (data) => {
  return {
    types: [CALL, CHALLENGES_ENGAGED_SUCCESS, CALL_FAIL],
    first: () => {
      return new Promise((resolve, reject) => {
        ApiClient('jsonapi', 'GET', null, '/challenges/checkIfOppEngaged/' + data.idProgram + '/' + data.selOpponent)
        // trigger the promise in the clientMiddleware
        .then((result) => {
          resolve(result)
        })
        .catch((error) => {
          reject(error)
        })
      })
    }
  }
}

export const challengeLoadSingle = (data) => {
  return {
    types: [CALL, LOAD_SINGLE_SUCCESS, CALL_FAIL],
    first: () => {
      return new Promise((resolve, reject) => {
        ApiClient('jsonapi', 'GET', null, '/challenges/challengeLoadSingle/' + data.idChallenge)
        // trigger the promise in the clientMiddleware
        .then((result) => {
          resolve(result)
        })
        .catch((error) => {
          reject(error)
        })
      })
    }
  }
}

export const opponentChallenges = (data) => {
  return {
    types: [CALL, LOAD_CHALLENGES_SUCCESS, CALL_FAIL],
    first: () => {
      return new Promise((resolve, reject) => {
        ApiClient('jsonapi', 'GET', null, '/challenges/opponentChallenges/' + data.opponent + '/' + data.theme)
        // trigger the promise in the clientMiddleware
        .then((result) => {
          resolve(result)
        })
        .catch((error) => {
          reject(error)
        })
      })
    }
  }
}

export const getAllChallenges = (data) => {
  return {
    types: [CALL, CALL_SUCCESS, CALL_FAIL],
    first: () => {
      return new Promise((resolve, reject) => {
        ApiClient('jsonapi', 'GET', null, '/challenges/allChallenges/' + data.selectDef + '/' + data.switcher + '/' + data.nb)
        // trigger the promise in the clientMiddleware
        .then((result) => {
          resolve(result)
        })
        .catch((error) => {
          reject(error)
        })
      })
    }
  }
}
