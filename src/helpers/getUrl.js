export default (path) => {
  // const scheme = process.env.NODE_ENV === 'production' ? 'https' : 'http'
  // const hostURL = scheme + '://' + process.env.REACT_APP_API_HOST + ':' + process.env.REACT_APP_API_PORT
  // const hostURL = process.env.REACT_APP_API_HOST
  const adjustedPath = path[0] !== '/' ? '/' + path : path
  // const hostURL = scheme + '://' + process.env.REACT_APP_API_HOST + ':' + process.env.REACT_APP_API_PORT
  // return  'https://tricky-api-release.herokuapp.com' + adjustedPath
  // const finalUrl = process.env.REACT_APP_API_HOST + adjustedPath
  const finalUrl = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_API_HOST + adjustedPath : '/api' + adjustedPath

  return  finalUrl
}
