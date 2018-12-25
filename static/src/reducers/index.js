import { connectRouter } from 'connected-react-router/immutable'
import { combineReducers } from 'redux-immutable'

import entities from './entities'
import ui from './ui'

export default (history) => combineReducers({
  entities,
  router: connectRouter(history),
  ui
})
