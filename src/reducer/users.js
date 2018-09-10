import ApiClient from '../helpers/apiClient'

const LOAD_USERS = 'redux/users/LOAD_USERS'
const LOAD_USERS_SUCCESS = 'redux/users/LOAD_USERS_SUCCESS'
const LOAD_CATEGORIES_SUCCESS = 'redux/users/LOAD_CATEGORIES_SUCCESS'
const SELECT_ARG = 'redux/users/SELECT_ARG'
const SHOW_DETT = 'redux/users/SHOW_DETT'
const CALL = 'redux/users/CALL'
const CALL_SUCCESS = 'redux/users/CALL_SUCCESS'
const CALL_FAIL = 'redux/users/CALL_FAIL'

const initialState = {
  users: null,
  error: null,
  services: [],
  starting: null,
  lasting: null,
  show: true,
  arg: null
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_USERS:
      return {
        users: action.data
      }
    case LOAD_USERS_SUCCESS:
      return {
        users: action.result.data.listUsers
      }
    case LOAD_CATEGORIES_SUCCESS:
      return {
        ...state,
        starting: action.result.data.starting,
        lasting: action.result.data.lasting,
        services: action.result.data.services
      }
    case SELECT_ARG:
      return {
        ...state,
        arg: action.arg
      }
    case SHOW_DETT:
      return {
        ...state,
        show: !action.show
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
export const loadAllPlayers = (data) => {
  return {
    type: LOAD_USERS,
    data
  }
}
export const selectArg = (arg) => {
  return {
    type: SELECT_ARG,
    arg
  }
}

export const showDett = (show) => {
  return {
    type: SHOW_DETT,
    show
  }
}

export const getServices = (chunckSize) => {
  return {
    types: [CALL, LOAD_CATEGORIES_SUCCESS, CALL_FAIL],
    first: () => {
      return new Promise((resolve, reject) => {
        ApiClient('jsonapi', 'GET', null, '/players/getServices')
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

export const selectedPlayers = (arg, subArg = null) => {
  return {
    types: [CALL, LOAD_USERS_SUCCESS, CALL_FAIL],
    first: () => {
      return new Promise((resolve, reject) => {
        ApiClient('jsonapi', 'GET', null, '/players/selectedPlayers/' + arg + '/' + subArg)
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
