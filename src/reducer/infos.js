const SELECT_INFO = 'redux/infos/SELECT_INFO'
const SHOW_INFO = 'redux/infos/SHOW_INFO'

const defaultState = {
  show: false,
  arg: 'tabac'
}

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case SELECT_INFO:
      return {
        ...state,
        arg: action.arg
      }
    case SHOW_INFO:
      return {
        ...state,
        show: action.show
      }
    default:
      return state
  }
}

export function selectInfo(arg) {
  return {
    type: SELECT_INFO,
    arg
  }
}

export function showInfo(show) {
  return {
    type: SHOW_INFO,
    show
  }
}
