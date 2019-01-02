import { expect } from 'chai'

import createRootReducers from '../../../src/reducers'
import { insertItem } from '../../../src/reducers/entities/evidences'
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
      state = reducers(state, insertItem({
        index: 0,
        item: {
          id: 0,
          title: 'title #0'
        },
        realTime: true
      }))

      const previousItems = updatesFeed.getSortedItems(state)

      // make unimportant changes
      state = reducers(state, insertItem({
        item: {
          id: 1,
          title: 'title #1'
        }
      }))

      const newItems = updatesFeed.getSortedItems(state)
      expect(previousItems).to.be.equal(newItems)
    })
  })
})
