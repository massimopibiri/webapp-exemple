/* eslint-disable import/first */
import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import './index.css'
import configureStore from './store'
import registerServiceWorker from './registerServiceWorker'
// import { unregister } from './registerServiceWorker'
import App from './containers/App'

ReactDOM.render(
  <Provider store={configureStore()}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
, document.getElementById('root'))

registerServiceWorker()
// unregister()
