const clientAction = require('../../../../static/src/reducers/evidences-actions')

const Agent = require('./agent')

export default (state = {}, action) => {
  switch (action.type) {
    case clientAction.SUBSCRIBE_EVIDENCES:
      // TODO:
      // 1) action.meta.userId check whether we already have this user
      // if so: update her state
      // else: create new agent
      return new Agent({ userId: action.meta.userId })
    case clientAction.UNSUBSCRIBE_EVIDENCES:
  }
}
