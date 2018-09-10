// import axios from 'axios'
import getUrl from './getUrl'

// AJAX CALLS -> https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#updating-to-new-releases
// FETCH DOC -> https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
// PROBLEMS WITH FETCH -> https://medium.com/@thejasonfile/fetch-vs-axios-js-for-making-http-requests-2b261cdd3af5

// how to use FETCH with PROXY

export default (cType = null, method = 'POST', data = {}, path) => {
  return new Promise((resolve, reject) => {
    // set the correct contentType
    let contentType

    if (cType === 'jsonapi') {
      contentType = 'application/vnd.api+json'
    } else if (cType === 'data') {
      contentType = 'application/json'
    }

    // set authorization token
    let authToken
    if (localStorage && localStorage.getItem('TrickyAppToken')) {
      authToken = 'bearer ' + localStorage.getItem('TrickyAppToken')
    }

    // set data object
    const dataToSend = cType === 'jsonapi' ? {data} : data

    const urlToUse = getUrl(path)
    
    let parameters
    if (method === 'POST') {
      parameters = {
        method: method,
        mode: 'cors',
        headers: {
          'Authorization': authToken,
          'Content-Type': contentType
        },
        body: JSON.stringify(dataToSend)
      } 
    } else {
      parameters = {
        method: method,
        mode: 'cors',
        headers: {
          'Authorization': authToken,
          'Content-Type': contentType
        }
      } 
    }

    // fire the call
    return fetch(urlToUse, parameters)
    .then(response => {
      // extract the serialized response to avoid error on empty responses
      return response.text()
    })
    .then((data) => {
      // check if the response is convertable json and eventually convert
      resolve(data ? JSON.parse(data) : {})
    })
    .catch((error) => {
      reject(error)
    })
  })
}
