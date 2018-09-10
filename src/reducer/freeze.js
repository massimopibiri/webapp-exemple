import ApiClient from '../helpers/apiClient'

const SUSPECT_RAISON = 'redux/freeze/SUSPECT_RAISON'
const SAVE_COMMENT = 'redux/freeze/SAVE_COMMENT'
const RESET_REASON = 'redux/freeze/RESET_REASON'
const CALL = 'redux/freeze/CALL'
const CALL_SUCCESS = 'redux/freeze/CALL_SUCCESS'
const CALL_FAIL = 'redux/freeze/CALL_FAIL'

const defaultState = {
  selected: null,
  conmment: null
}

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case SUSPECT_RAISON:
      return {
        ...state,
        selected: action.data
      }
    case SAVE_COMMENT:
      return {
        ...state,
        comment: action.txt
      }
    case RESET_REASON:
      return {
        selected: null,
        conmment: null
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

export const suspectRaison = (data) => {
  return {
    type: SUSPECT_RAISON,
    data
  }
}

export const saveComment = (txt) => {
  return {
    type: SAVE_COMMENT,
    txt
  }
}

export const resetReason = (txt) => {
  return {
    type: RESET_REASON,
    txt
  }
}

export const checkIfExists = () => {
  return {
    types: [CALL, CALL_SUCCESS, CALL_FAIL],
    first: () => {
      return new Promise((resolve, reject) => {
        ApiClient('jsonapi', 'GET', null, '/freezes/checkIfExists')
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


export const challengeToFreeze = () => {
  return {
    types: [CALL, CALL_SUCCESS, CALL_FAIL],
    first: () => {
      return new Promise((resolve, reject) => {
        ApiClient('jsonapi', 'GET', null, '/freezes/challengeToFreeze')
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
