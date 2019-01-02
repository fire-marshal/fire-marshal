import { connectRouter } from 'connected-react-router'
import { combineReducers } from 'redux'

import entities from './entities'
import ui from './ui'

export default (history) => combineReducers({
  entities,
  router: history && connectRouter(history),
  ui
})
