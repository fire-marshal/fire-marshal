import { expect } from 'chai'
import { call, put, select } from 'redux-saga/effects'

import { clearOnDemand, insertIdsToTheFeed } from '../../src/reducers/ui/updates-feed'
import { findPlaceToInsertIds, moveOnDemandToTheFeed } from '../../src/sagas/move-on-demand-evidences-to-the-feed'
import * as updatesFeedSelector from '../../src/selectors/ui/updates-feed'

describe('sagas / move-on-demand-evidences-to-the-feed', () => {
  it('should move on demand ids to the feed', () => {
    const gen = moveOnDemandToTheFeed()
    const ids = [1, 2, 3]
    const sortBy = ['when', 'estimation']
    const indexes = ['id-1', 'id-2', 'id-3']

    expect(gen.next().value).to.be.deep.equal(
      select(updatesFeedSelector.getOnDemand)
    )

    expect(gen.next(ids).value).to.be.deep.equal(
      call(findPlaceToInsertIds, ids, sortBy)
    )

    expect(gen.next(indexes).value).to.be.deep.equal(
      put(insertIdsToTheFeed({
        indexes, ids
      }))
    )

    expect(gen.next().value).to.be.deep.equal(
      put(clearOnDemand())
    )
  })
})
