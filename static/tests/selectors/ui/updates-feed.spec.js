import { expect } from 'chai'

import Immutable from 'immutable'

import * as updatesFeed from '../../../src/selectors/ui/updates-feed'

describe.skip('selectors / ui / updates-feed', () => {
  describe('#getSortedItemsRaw', () => {
    it('should return the same value in case when we got new entities but they are not part of sorted list', () => {
      // TODO: mock state
      const state = Immutable.fromJS({})
      const previousItems = updatesFeed.getSortedItems(state)
      const newItems = updatesFeed.getSortedItems(state)
      expect(previousItems).to.be.equal(newItems)
    })
  })
})
