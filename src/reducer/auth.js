import ApiClient from '../helpers/apiClient'
/* HELPERS */
import saveToken from '../helpers/saveToken'
import logout from '../helpers/logout'

const RESET_AUTH = 'redux/auth/RESET_AUTH'
const STEP = 'redux/auth/STEP'
const STEP_SUCCESS = 'redux/auth/STEP_SUCCESS'
const STEPNEUTR_SUCCESS = 'redux/auth/STEPNEUTR_SUCCESS'
const STEP_FAIL = 'redux/auth/STEP_FAIL'

const initialState = {
  authenticated: false,
  loading: false,
  allowSocket: false,
  routerToShow: null,
  temporary: null
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case RESET_AUTH:
      return {
        ...state,
        allowSocket: false,
        authenticated: false,
        routerToShow: 'matchOn',
        temporary: '/'
      }
    case STEP:
      return {
        ...state,
        loading: true,
        authenticated: false
      }
    case STEP_SUCCESS:
      // establish if authentication is valid
      const valueAuth = action.result && action.result.token && action.result.userId && action.result.role ? true : false
      // decide what pages to show
      const allowRouter = action.result.program && action.result.program.finished && action.result.program.finished === true ? 'matchOff' : 'matchOn'
      // redirect temporary pages
      let temporary
      if (!action.result || !action.result.token || !action.result.userId || !action.result.role) {
        temporary = '/'
      } else if (action.result && !action.result.program) {
        temporary = '/temporary'
      } else if (!action.result.firstConnectionDone || action.result.firstConnectionDone === false) {
        temporary = '/firstintro'
      }
      return {
        ...state,
        loading: false,
        allowSocket: valueAuth,
        authenticated: valueAuth,
        routerToShow: allowRouter,
        temporary: temporary
      }
    case STEPNEUTR_SUCCESS:
      return {
        ...state,
      }
    case STEP_FAIL:
      return {
        ...state,
        loading: false,
        authenticated: false
      }
    default:
      return state
  }
}

// push a comment in the end of the comments array
/*
export const allowSocket = (bool) => {
  return {
    type: ALLOW_SOCKET,
    bool
  }
}
*/

// ====================================>> RETRIEVE LOST PASSWORD

export function recoverPswAct(data) {
  return {
    types: [STEP, STEPNEUTR_SUCCESS, STEP_FAIL],
    first: () => {
      return new Promise((resolve, reject) => {
        const dataFormatted = {
          email: data.email
        }
        ApiClient('data', 'POST', dataFormatted, '/auth/playerRecover')
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

// ====================================>> LOGIN

export function login(data) {
  return {
    types: [STEP, STEP_SUCCESS, STEP_FAIL],
    first: () => {
      return new Promise((resolve, reject) => {
        const dataFormatted = {
          grant_type: 'password',
          email: data.email,
          password: data.password
        }
        ApiClient('data', 'POST', dataFormatted, '/auth/authorizePlayer')
        // trigger the promise in the clientMiddleware
        .then((result) => {
          resolve(result)
        })
        .catch((error) => {
          reject(error)
        })
      })
    },
    // trigger the function after success in the clientMiddleware
    second: (result) => {
      if (
        result
        && result.token
        && result.userId
        && result.role
      ) {
        saveToken(result)
      } else {
        logout()
      }
    }
  }
}

// ====================================>> TOKEN LOGIN

export function signinWithToken() {
  return {
    types: [STEP, STEP_SUCCESS, STEP_FAIL],
    first: () => {
      return new Promise((resolve, reject) => {
        const dataFormatted = {
          type: 'password',
          attributes: {}
        }
        ApiClient('jsonapi', 'POST', dataFormatted, '/auth/signintoken')
        // trigger the promise in the clientMiddleware
        .then((result) => {
          resolve(result)
        })
        .catch((error) => {
          reject(error)
        })
      })
    },
    // trigger the function after success in the clientMiddleware
    second: (result) => {
      if (
        result
        && result.token
        && result.userId
        && result.role
      ) {
        saveToken(result)
      } else {
        logout()
      }
    }
  }
}
const resetAuth = () => {
  return {
    type: RESET_AUTH
  }
}
export function logOutAct() {
  return function (dispatch) {
    dispatch(resetAuth())
    logout()
  }
}
