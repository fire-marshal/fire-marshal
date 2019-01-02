import { expect } from 'chai'

import createRootReducers from '../../../src/reducers'
import { insertItem } from '../../../src/reducers/entities/evidences'
import { enableRealtime } from '../../../src/reducers/ui/updates-feed'
import * as updatesFeed from '../../../src/selectors/ui/updates-feed'

const reducers = createRootReducers()

describe.skip('selectors / ui / updates-feed', () => {
  describe('#getSortedItemsRaw', () => {
    let state

    beforeEach(() => {
      state = reducers()
    })

    it('should return the same value in case when we got new entities but they are not part of sorted list', () => {
      // init state
      state = reducers(state, enableRealtime(true))
      state = reducers(state, insertItem({
        index: 0,
        item: {
          id: 0,
          title: 'title #0'
        }
      }))

      const previousIds = updatesFeed.getSortedIds(state)
      const previousItems = updatesFeed.getSortedItems(state)

      // make unimportant changes
      state = reducers(state, enableRealtime(false))
      state = reducers(state, insertItem({
        index: 1,
        item: {
          id: 1,
          title: 'title #1'
        }
      }))

      const newIds = updatesFeed.getSortedIds(state)
      const newItems = updatesFeed.getSortedItems(state)
      expect(previousIds).to.be.equal(newIds)
      expect(previousItems).to.be.equal(newItems)
    })
  })
})
