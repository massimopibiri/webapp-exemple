import ApiClient from '../helpers/apiClient'

const STORE_WALLET_SUCCESS = 'redux/wallet/STORE_WALLET_SUCCESS'
// const TOTAL_AMOUNT = 'redux/wallet/TOTAL_AMOUNT'
// const PLAYERS_AND_SCORE = 'redux/wallet/PLAYERS_AND_SCORE'
const STORE_SHOP = 'redux/wallet/STORE_SHOP'
const STORE_CASH = 'redux/wallet/STORE_CASH'
const CALL = 'redux/wallet/CALL'
const CALL_FAIL = 'redux/wallet/CALL_FAIL'

const defaultState = {
  data: null,
  gain: null,
  byMonth: [],
  score: null,
  done: null,
  stagesRef: null,
  totalBudget: null,
  currentPrice: null,
  programStatus: null,
  totalNbPlayers: null,
  price: {}
}

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case STORE_WALLET_SUCCESS:
      return {
        ...state,
        price: action.result.data.programGen.price,
        program: action.result.data.programGen.program,
        programStatus: action.result.data.programGen.programStatus,
        totalAmount: action.result.data.scoreAndAmount.totalAmount,
        currentScore: action.result.data.scoreAndAmount.currentScore,
        players: action.result.data.listUsers,
        totalScore: action.result.data.totalScore
      }
    case STORE_SHOP:
      return {
        ...state,
        gain: action.data.wallet.gain,
        products: action.data.products
      }
    case STORE_CASH:
      return {
        ...state,
        stagesRef: action.data.stagesRef,
        totalBudget: action.data.totalBudget,
        currentPrice: action.data.currentPrice,
        programStatus: action.data.programStatus,
        totalNbPlayers: action.data.totalNbPlayers
       }
    case CALL:
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
/*
export const storeWallet = (data) => {
  return {
    type: STORE_WALLET,
    data
  }
}

export const totalAmount = (data) => {
  return {
    type: TOTAL_AMOUNT,
    data
  }
}
export const playersAndScore = (data) => {
  return {
    type: PLAYERS_AND_SCORE,
    data
  }
}
*/

export const storeShop = (data) => {
  return {
    type: STORE_SHOP,
    data
  }
}

export const storeCash = (data) => {
  return {
    type: STORE_CASH,
    data
  }
}

export const loadWallet = (chunckSize) => {
  return {
    types: [CALL, STORE_WALLET_SUCCESS, CALL_FAIL],
    first: () => {
      return new Promise((resolve, reject) => {
        ApiClient('jsonapi', 'GET', null, '/wallet/loadWallet')
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
