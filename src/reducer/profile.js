import ApiClient from '../helpers/apiClient'

const SELECT_TAB = 'redux/profile/SELECT_TAB'
const LOAD_PROFILE = 'redux/profile/LOAD_PROFILE'
// const LOAD_STATS = 'redux/profile/LOAD_STATS'
// const LOAD_SCORE = 'redux/profile/LOAD_SCORE'
const IMAGE_PROFILE = 'redux/profile/IMAGE_PROFILE'
const SET_THEME = 'redux/profile/SET_THEME'
const SET_THEME_SUCCESS = 'redux/profile/SET_THEME_SUCCESS'
const SET_THEME_FAIL = 'redux/profile/SET_THEME_FAIL'
const CALL = 'redux/profile/CALL'
const CALL_SUCCESS = 'redux/profile/CALL_SUCCESS'
const CALL_FAIL = 'redux/profile/CALL_FAIL'
const PERMISSION_SUCCESS = 'redux/profile/PERMISSION_SUCCESS'
const STORE_BONUS_SUCCESS = 'redux/profile/STORE_BONUS_SUCCESS'
const STORE_SCORE = 'redux/profile/STORE_SCORE'

const defaultState = {
  selected: 'theme1',
	firstName: '',
	familyName: '',
  email: null,
	picture: '',
	company: '',
	service: '',
	idProgram: null,
	score: '',
	gain: '',
  isSmoker: false,
  isBadEater: false,
  isBadSportsMan: false,
  isStressed: false,
	mychallenges: [],
	gainByMonth: [],
	stats: [],
  nbWellAchieved: 0,
  tabacoTheme: {},
  sportTheme: {},
  foodTheme: {},
  relaxTheme: {},
  byStage: [],
  s3auth: null
}

export default function reducer(state = defaultState, action) {
	switch (action.type) {
    case SELECT_TAB:
      return {
        selected: action.data
      }
		case LOAD_PROFILE:
			return {
				...state,
        firstName: action.data.firstName,
        familyName: action.data.familyName,
        email: action.data.email,
        picture: action.data.image,
        company: action.data.idCompany,
        service: action.data.relatedService,
        idProgram: action.data.idProgram,
        score: action.data.score,
        gain: action.data.gain,
        isSmoker: action.data.isSmoker,
        isBadEater: action.data.isBadEater,
        isBadSportsMan: action.data.isBadSportsMan,
        isStressed: action.data.isStressed,
        gainByMonth: action.data.gainByMonth,
        achieve: action.data.achieve
			}
    /*
		case LOAD_STATS:
			return {
				...state,
        nbWellAchieved: action.stats.nbWellAchieved,
        tabacoTheme: action.stats.tabacoTheme,
        sportTheme: action.stats.sportTheme,
        foodTheme: action.stats.foodTheme,
        relaxTheme: action.stats.relaxTheme,
        byStage: action.stats.byStage,
			}
		case LOAD_SCORE:
			return {
				...state,
				score: action.score
			}
    */
    case IMAGE_PROFILE:
      return {
        ...state,
        imgProfile: action.img
      }
    case SET_THEME:
      return {
        ...state,
      }
    case SET_THEME_SUCCESS:
      return {
        ...state,
      }
    case SET_THEME_FAIL:
      return {
        ...state,
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
    case PERMISSION_SUCCESS:
      return {
        ...state,
        s3auth: action.result.data
      }
    case STORE_BONUS_SUCCESS:
      return {
        ...state,
        score: action.result.data.score,
        done: action.result.data.firstActions
      }
    case STORE_SCORE:
      return {
        ...state,
        score: action.score
      }
		default:
			return state
	}
}

export const loadProfile = (data) => { // OK
  return {
    type: LOAD_PROFILE,
    data
  }
}

export const storeScore = (score) => { // OK
  return {
    type: STORE_SCORE,
    score
  }
}
/*
export const loadStats = (stats) => {
  return {
    type: LOAD_STATS,
    stats
  }
}
export const loadScore = (score) => {
  return {
    type: LOAD_SCORE,
    score
  }
}
*/

export const imageProfile = (img) => {
  return {
    type: IMAGE_PROFILE,
    img
  }
}

export function selectTab(data) {
  return {
    type: SELECT_TAB,
    data
  }
}

// ====================================>> SET PREFERENCES

export function setThemes(data) {
  return {
    types: [SET_THEME, SET_THEME_SUCCESS, SET_THEME_FAIL],
    first: () => {
      return new Promise((resolve, reject) => {
        const dataFormatted = {
          type: 'players',
          attributes: {
            isSmoker: data.isSmoker,
            isBadEater: data.isBadEater,
            isBadSportsMan: data.isBadSportsMan,
            isStressed: data.isStressed
          }
        }
        ApiClient('jsonapi', 'POST', dataFormatted, '/players/setThemes')
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

// ====================================>> SAVE AVATAR

export function setAvatar(urlToSave) {
  return {
    types: [CALL, CALL_SUCCESS, CALL_FAIL],
    first: () => {
      return new Promise((resolve, reject) => {
        const dataFormatted = {
          type: 'players',
          attributes: {
            file: urlToSave
          }
        }
        ApiClient('jsonapi', 'POST', dataFormatted, '/players/setAvatar')
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

export const getMain = () => {
  return {
    types: [CALL, CALL_SUCCESS, CALL_FAIL],
    first: () => {
      return new Promise((resolve, reject) => {
        ApiClient('jsonapi', 'GET', null, '/players/getMain')
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

// get temporary access authorization from AmazonS3
export const getTemporaryAuthorization = () => {
  return {
    types: [CALL, PERMISSION_SUCCESS, CALL_FAIL],
    first: () => {
      return new Promise((resolve, reject) => {
        ApiClient('jsonapi', 'GET', null, '/players/getTemporaryAuthorization')
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

// save phone number in the server
export const savePhoneNumber = (number) => {
  return {
    types: [CALL, CALL_SUCCESS, CALL_FAIL],
    first: () => {
      return new Promise((resolve, reject) => {
        ApiClient('jsonapi', 'GET', null, '/players/savePhoneNumber/' + number)
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

export const currentScore = () => {
  return {
    types: [CALL, STORE_BONUS_SUCCESS, CALL_FAIL],
    first: () => {
      return new Promise((resolve, reject) => {
        ApiClient('jsonapi', 'GET', null, '/players/currentScore')
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
