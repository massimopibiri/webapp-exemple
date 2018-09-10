import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import createMiddleware from './clientMiddleware'
import reducer from '../reducer'

// default value of the redux state
const defaultState = {}
// const reduxRouterMiddleware = routerMiddleware(history)

export default () => {
  // putt all middlewares together
  const middlewares = [createMiddleware(), thunk]
  // create create the store
  const store = createStore(reducer, defaultState, compose(
    // Middleware only wraps the store's dispatch function
    applyMiddleware(
      ...middlewares
    )
  ))
  return store
}
