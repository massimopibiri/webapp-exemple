export default function clientMiddleware() {
  return ({dispatch, getState}) => {
    return next => action => {
      if (typeof action === 'function') {
        return action(dispatch, getState)
      }

      const { first, types, second, ...rest } = action // eslint-disable-line no-redeclare
      if (!first) {
        return next(action)
      }

      const [REQUEST, SUCCESS, FAILURE] = types
      next({...rest, type: REQUEST})

      const actionPromise = first()
      actionPromise.then(
        (result) => {
          if (second && result) {
            second(result)
          }
          next({...rest, result, type: SUCCESS})
        },
        (error) => next({...rest, error, type: FAILURE})
      ).catch((error)=> {
        console.error('MIDDLEWARE ERROR:', error)
        next({...rest, error, type: FAILURE})
      })
      return actionPromise
    }
  }
}
