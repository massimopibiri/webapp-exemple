import uuid from 'uuid'

const ADD_ALERT = 'redux/alerts/ADD_ALERT'
const REMOVE_ALERT = 'redux/alerts/REMOVE_ALERT'

const defaultState = []

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case ADD_ALERT:
      return [
        ...state,
        {
          kind: action.kind,
          text: action.text,
          id: uuid.v4()
        }
      ]
    case REMOVE_ALERT:
      return state.filter((alert) => {
        if (alert.id === action.id) {
          return false
        } else {
          return true
        }
      })
    default:
      return state
  }
}

export function addAlert (kind, text) {
  return {
    type: ADD_ALERT,
    kind,
    text
  }
}

export function removeAlert (id) {
  return {
    type: REMOVE_ALERT,
    id
  }
}
/*
export function resetAllAlert () {
  return {
    type: RESET_ALL_ALERTS
  }
}
*/

