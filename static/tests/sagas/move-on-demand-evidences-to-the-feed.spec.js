import { expect } from 'chai'
import { call, put, select } from 'redux-saga/effects'

import { clearOnDemand, insertIdsToTheFeed } from '../../src/reducers/ui/updates-feed'
import { findPlaceToInsertIds, moveOnDemandToTheFeed } from '../../src/sagas/move-on-demand-evidences-to-the-feed'
import * as updatesFeedSelector from '../../src/selectors/ui/updates-feed'
import * as evidencesSelector from '../../src/selectors/entities/evidences'

describe('sagas / move-on-demand-evidences-to-the-feed', () => {
  it('should move on demand ids to the feed', () => {
    const gen = moveOnDemandToTheFeed()
    const sortBy = ['when', 'estimation']
    const ids = [2, 4, 6]
    const indexes = ['id-1', 'id-2', 'id-3']

    expect(gen.next().value).to.be.deep.equal(
      call(findPlaceToInsertIds, sortBy)
    )

    expect(gen.next({ ids, indexes }).value).to.be.deep.equal(
      put(insertIdsToTheFeed({
        indexes, ids
      }))
    )

    expect(gen.next().value).to.be.deep.equal(
      put(clearOnDemand())
    )
  })

  it('should find place to insert ids', () => {
    const ids = ['2', '4', '6']
    const sortedIds = ['1', '3', '5', '7']
    const byIds = {
      '1': { value: 7000 },
      '2': { value: 6000 },
      '3': { value: 5000 },
      '4': { value: 4000 },
      '5': { value: 3000 },
      '6': { value: 2000 },
      '7': { value: 1000 }
    }
    const gen = findPlaceToInsertIds(['value'])

    expect(gen.next().value).to.be.deep.equal(
      select(updatesFeedSelector.getOnDemand))

    expect(gen.next(ids).value).to.be.deep.equal(
      select(updatesFeedSelector.getSortedIds))

    expect(gen.next(sortedIds).value).to.be.deep.equal(
      select(evidencesSelector.getEvidencesByIdRaw))

    const res = gen.next(byIds)

    expect(res).to.have.property('done').to.be.true

    expect(res).to.have.property('value').to.be.deep.equal({
      ids: ['2', '4', '6'],
      indexes: [1, 2, 3]
    })
  })

  it('should find place to insert (even for messed) ids', () => {
    const ids = ['4', '2', '6']
    const sortedIds = ['1', '3', '5', '7']
    const byIds = {
      '1': { value: 7000 },
      '2': { value: 6000 },
      '3': { value: 5000 },
      '4': { value: 4000 },
      '5': { value: 3000 },
      '6': { value: 2000 },
      '7': { value: 1000 }
    }
    const gen = findPlaceToInsertIds(['value'])

    expect(gen.next().value).to.be.deep.equal(
      select(updatesFeedSelector.getOnDemand))

    expect(gen.next(ids).value).to.be.deep.equal(
      select(updatesFeedSelector.getSortedIds))

    expect(gen.next(sortedIds).value).to.be.deep.equal(
      select(evidencesSelector.getEvidencesByIdRaw))

    const res = gen.next(byIds)

    expect(res).to.have.property('done').to.be.true

    expect(res).to.have.property('value').to.be.deep.equal({
      ids: ['2', '4', '6'],
      indexes: [1, 2, 3]
    })
  })
})
