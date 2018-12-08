import { combineReducers } from 'redux-immutable'

import evidences from './evidences'
import updatesFeed from './updates-feed'

export default combineReducers({
  evidences,
  updatesFeed
})
