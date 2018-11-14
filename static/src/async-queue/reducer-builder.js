import Immutable from 'immutable'

/**
 * Build 2 or 3 handlers for request, received and error (optional) actions
 *
 * it should store significant information and process result before storing
 *
 * @param request
 * @param receive
 * @param (error)
 * @param processResult
 * @returns {{}}
 */
module.exports = function asyncReducer ([request, receive, error = null], processResult = Immutable.fromJS) {
  const res = {
    [request]: (state, { meta }) => state
      .set('updateAt', meta.createdAt)
      .set('inProgress', true),

    [receive]: (state, { meta, payload }) => state
      .set('updateAt', meta.createdAt)
      .set('data', processResult(payload.res, state.get('data')))
      .set('inProgress', false)
      .set('invalid', false)
  }

  if (error) {
    res[error] = (state, { meta, payload }) => state
      .set('updateAt', meta.createdAt)
      .set('error', Immutable.fromJS(payload.error))
      .set('inProgress', false)
      .set('invalid', false)
  }

  return res
}
