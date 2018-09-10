import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'

import alerts from './alerts'
import auth from './auth'
import challenges from './challenges'
import chats from './chats'
import freeze from './freeze'
import formFuncs from './form'
import infos from './infos'
import notifications from './notifications'
import params from './params'
import profile from './profile'
import program from './program'
import tools from './tools'
import users from './users'
import wallet from './wallet'

const reducer = combineReducers({
  alerts,
  auth,
  challenges,
  chats,
  freeze,
  form,
  formFuncs,
  infos,
  notifications,
  params,
  profile,
  program,
  tools,
  users,
  wallet
})

export default reducer
