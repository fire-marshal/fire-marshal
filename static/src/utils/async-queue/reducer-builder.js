/**
 * Build 2 or 3 handlers for request, received and error (optional) actions
 *
 * it should store significant information and process result before storing
 *
 * @param request
 * @param receive
 * @param (error)
 * @returns {{}}
 */
export default function asyncReducer (
  [request, receive, error = null]
) {
  const res = {
    [request]: (draft, { meta }) => {
      draft.updateAt = meta.createdAt
      draft.inProgress = true
    },

    [receive]: (draft, { meta }) => {
      draft.updateAt = meta.createdAt
      draft.inProgress = false
      draft.invalid = false
    }
  }

  if (error) {
    res[error] = (draft, { meta, payload }) => {
      draft.updateAt = meta.createdAt
      draft.error = payload.error
      draft.inProgress = false
      draft.invalid = false
    }
  }

  return res
}
