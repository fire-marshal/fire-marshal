import axios from 'axios'
import { addToQueue } from './task-queue'

/**
 * Make fetch action.
 * construct url with getUrl.
 *
 * requestAction - will be called on start
 * resultAction - will be called on finish
 *
 * @param getUrl
 * @param requestAction
 * @param resultAction
 * @param errorAction
 * @returns {function(...[*]=): function(*=)}
 */
export function fetchAction ({ getUrl, requestAction, resultAction, errorAction = null }) {
  return (payload) => dispatch => {
    dispatch(requestAction(payload))

    return addToQueue(() => {
      // fetch() is a new API for requesting server side resource.
      // Note that no cookies are sent by default, even for same-origin
      // requests (credentials: "omit"). We must explicitly turn it on.

      // temporally changed 'same-origin' to 'include' for dev purpose
      // because I'm using remote web-beta.archive.org end point from local dev env
      // which has different url and as the result 'save-original' is not enough
      // to send cookies
      const init = {}

      let url
      let urlParams = getUrl(payload)
      let crossDomain

      if (typeof urlParams === 'string') {
        url = urlParams
        crossDomain = false
      } else {
        url = urlParams.url
        crossDomain = urlParams.crossDomain
      }

      init.credentials = crossDomain ? 'include' : 'same-origin'

      return axios.get(url, init)
        .then(res => res.data)
        .catch(error => {
          errorAction && dispatch(errorAction({
            ...payload,
            error: error ? error.message : error
          }))
          return Promise.reject(error)
        })
        .then(res => dispatch(resultAction({ ...payload, res })))
    })
  }
}

export function fetchActionSimplified ({ getUrl, actions }) {
  const init = {
    getUrl,

    requestAction: (payload) => ({
      type: actions[0],
      payload: {
        inProgress: true,
        ...payload
      },
      meta: {
        createdAt: Date.now()
      }
    }),

    resultAction: (payload) => ({
      type: actions[1],
      payload: {
        inProgress: false,
        ...payload
      },
      meta: {
        createdAt: Date.now()
      }
    })
  }

  if (actions.length > 2) {
    init.errorAction = payload => ({
      type: actions[2],
      payload: {
        inProgress: false,
        ...payload
      },
      meta: {
        createdAt: Date.now()
      }
    })
  }

  return fetchAction(init)
}
