import * as ReselectTools from 'reselect-tools'

import * as selectors from '../selectors'

export function reselectToolsSetup (store) {
  ReselectTools.getStateWith(() => store.getState())
  Object.values(selectors).forEach(selector => ReselectTools.registerSelectors(selector))
}
