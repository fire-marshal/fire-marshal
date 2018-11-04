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
module.exports = function asyncReducer ([request, receive, error = null], processResult = res => res) {
  const res = {
    [request]: (state, action) => state.set('updateAt', action.updatedAt),
    [receive]: (state, action) => state.set('updateAt', action.updatedAt)
      .set('data', processResult(action.res))
  }

  if (error) {
    res[error] = (state, action) => state
      .set('updateAt', action.updatedAt)
      .set('error', action.error)
  }

  return res
}
