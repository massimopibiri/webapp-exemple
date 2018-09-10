import ApiClient from '../helpers/apiClient'
/* SETTINGS */
import { defaultValues } from '../globals/setting'

const LOAD_COMMENTS = 'redux/chats/LOAD_COMMENTS'
const ADD_LAST_COMMENT = 'redux/chats/ADD_LAST_COMMENT'
const OLDER_COMMENTS_SUCCESS = 'redux/chats/OLDER_COMMENTS_SUCCESS'
const NEWER_COMMENTS_SUCCESS = 'redux/chats/NEWER_COMMENTS_SUCCESS'
const ADD_TAGGED_PLAYERS = 'redux/chats/ADD_TAGGED_PLAYERS'
const RESET_TAGGED_PLAYERS = 'redux/chats/RESET_TAGGED_PLAYERS'
const LIST_FOR_HASHTAG = 'redux/chats/LIST_FOR_HASHTAG'
const LINK_CHALLENGE = 'redux/chats/LINK_CHALLENGE'
const OPEN_TAG = 'redux/chats/OPEN_TAG'
const CALL = 'redux/chats/CALL'
const CALL_NEWER = 'redux/chats/CALL_NEWER'
const CALL_SUCCESS = 'redux/chats/CALL_SUCCESS'
const CALL_FAIL = 'redux/chats/CALL_FAIL'
const CALL_NEWER_FAIL = 'redux/chats/CALL_NEWER_FAIL'

const defaultState = {
  loadingOlder: false,
  loadingNewer: true,
  comments: [],
  currentTime: null,
  allowLazy: true,
  tagPlayers: [],
  taggedPlayers: [],
  hashTagList: null,
  challengeToComment: null,
  chunck: 1,
  showTag: false
}

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case LOAD_COMMENTS:
      return {
        ...state,
        comments: action.comments,
        tagPlayers: action.tagPlayers,
        currentTime: action.currentTime
      }
    case ADD_LAST_COMMENT:
      // PREVIOUS COMMENTS EXIST
      if (
        state.comments
        && state.comments.length > 0 // if a previous comment exististed
        && action.comment
        && action.comment.length > 1 // if response from server include two comments (previous and new)
        && state.comments.map((comment) => {return comment._id}).indexOf(action.comment[1]._id) >= 0 // check if the previous comment is part of the list (infinite scoll can remove it)
      ) {
        // remove first comment before to add a new comment
        const previousComment = state.comments
        previousComment.pop()
        return {
          ...state,
          comments: [action.comment[0]].concat(previousComment),
          currentTime: action.currentTime
        }
      // IT IS THE FIRST COMMENT
      } else if (
        (!state.comments || state.comments.length === 0) // if a previous comment does not exist
        && action.comment
        && action.comment.length === 1 // if response from server include one comments (just new one)
        && state.comments.map((comment) => {return comment._id}).indexOf(action.comment[0]._id) < 0 // check if the previous comment is part of the list (infinite scoll can remove it)
      ) {
        return {
          ...state,
          comments: [action.comment[0]].concat(state.comments),
          currentTime: action.currentTime
        }
      } else {
        return {...state}
      }
    case OLDER_COMMENTS_SUCCESS:
      // do not remove previous comments
      if (action.result && action.result.data && action.result.data.comments && action.result.data.comments.length > 0 && state.comments.length <= defaultValues.nbOfCommentsPerPage) {
        return {
          ...state,
          comments: state.comments.concat(action.result.data.comments),
          currentTime: action.result.data.currentTime,
          loadingOlder: false,
          chunck: state.chunck + 1
        }
      // remove previous comments
      } else if (action.result && action.result.data && action.result.data.comments && action.result.data.comments.length > 0 && state.comments.length > defaultValues.nbOfCommentsPerPage) {
        const lastChunkOfState = state.comments.splice(defaultValues.nbOfCommentsPerPage, state.comments.length - defaultValues.nbOfCommentsPerPage)
        return {
          ...state,
          comments: lastChunkOfState.concat(action.result.data.comments),
          currentTime: action.result.data.currentTime,
          loadingOlder: false,
          loadingNewer: false,
          chunck: state.chunck + 1
        }
      } else {
        return {...state,loadingOlder: true,loadingNewer: false}
      }
    case NEWER_COMMENTS_SUCCESS:
      // do not remove previous comments
      if (action.result && action.result.data && action.result.data.comments && action.result.data.comments.length > 0 && state.comments.length <= defaultValues.nbOfCommentsPerPage) {
        return {
          ...state,
          comments: action.result.data.comments.concat(state.comments),
          currentTime: action.result.data.currentTime,
          loadingNewer: false,
          chunck: state.chunck - 1
        }
      // remove previous comments
      } else if (action.result && action.result.data && action.result.data.comments && action.result.data.comments.length > 0 && state.comments.length > defaultValues.nbOfCommentsPerPage) {
        const lastChunkOfState = state.comments
        lastChunkOfState.length = defaultValues.nbOfCommentsPerPage
        return {
          ...state,
          comments: action.result.data.comments.concat(lastChunkOfState),
          currentTime: action.result.data.currentTime,
          loadingNewer: false,
          loadingOlder: false,
          chunck: state.chunck - 1
        }
      } else {
        return {...state,loadingNewer: true,loadingOlder: false}
      }
    case ADD_TAGGED_PLAYERS:
      return {
        ...state,
        taggedPlayers: state.taggedPlayers.concat(action.player)
      }
    case RESET_TAGGED_PLAYERS:
      return {
        ...state,
        taggedPlayers: []
      }
    case LIST_FOR_HASHTAG:
      return {
        ...state,
        hashTagList: action.list
      }
    case LINK_CHALLENGE:
      return {
        ...state,
        challengeToComment: action.challenge
      }
    case CALL:
      return {
        ...state,
        loadingOlder: true
      }
    case CALL_SUCCESS:
      return {
        ...state,
        loadingOlder: false
      }
    case CALL_FAIL:
      return {
        ...state,
        loadingOlder: false
      }
    case CALL_NEWER:
      return {
        ...state,
        loadingNewer: true
      }
    case CALL_NEWER_FAIL:
      return {
        ...state,
        loadingNewer: false
      }
    case OPEN_TAG:
      return {
        ...state,
        showTag: action.bool
      }
    default:
      return state
  }
}

export const openTag = (bool = false) => {
  return {
    type: OPEN_TAG,
    bool
  }
}
// save in the state the retrieved comments
export const storeComments = (comments, currentTime, tagPlayers = null) => {
  return {
    type: LOAD_COMMENTS,
    comments,
    tagPlayers,
    currentTime
  }
}
// push a comment in the end of the comments array
export const addLastComment = (comment, currentTime) => {
  return {
    type: ADD_LAST_COMMENT,
    comment,
    currentTime
  }
}

// add players to the list of tagged layers
export const addTaggedPlayers = (player) => {
  return {
    type: ADD_TAGGED_PLAYERS,
    player
  }
}

// reset the list of tagged layers
export const resetTaggedPlayers = () => {
  return {
    type: RESET_TAGGED_PLAYERS
  }
}
// store the list to show in the hashtag window
export const listForHashTag = (list) => {
  return {
    type: LIST_FOR_HASHTAG,
    list
  }
}
// link the comment to a specific challenge
export const linkChallenge = (challenge) => {
  return {
    type: LINK_CHALLENGE,
    challenge
  }
}

export const loadchats = (chunckSize) => {
  return {
    types: [CALL, CALL_SUCCESS, CALL_FAIL],
    first: () => {
      return new Promise((resolve, reject) => {
        ApiClient('jsonapi', 'GET', null, '/chats/loadchats/' + chunckSize)
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

export const fetchOlderComments = (chunckSize, chunck) => {
  return {
    types: [CALL, OLDER_COMMENTS_SUCCESS, CALL_FAIL],
    first: () => {
      return new Promise((resolve, reject) => {
        ApiClient('jsonapi', 'GET', null, '/chats/fetchOlderComments/' + chunckSize + '/' + chunck)
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

export const fetchNewerComments = (chunckSize, chunck) => {
  return {
    types: [CALL_NEWER, NEWER_COMMENTS_SUCCESS, CALL_NEWER_FAIL],
    first: () => {
      return new Promise((resolve, reject) => {
        ApiClient('jsonapi', 'GET', null, '/chats/fetchNewerComments/' + chunckSize + '/' + chunck)
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
