import { expect } from 'chai'

import createSelectorPrecise from '../../src/utils/reselector-precise'

describe('utils/reselector-precise', () => {
  it('should recalculate value when new arguments do not pass validator', () => {
    const selector = createSelectorPrecise(
      state => state.ids,
      state => state.byId,
      (ids, byId) => ids.map(a => byId[a])
    )(([idsLast, byIdLast], [ids, byId]) => idsLast === ids)

    const state = {
      ids: ['a'],
      byId: {
        a: { total: 'aaa' }
      }
    }
    const stateWithNewById = {
      ...state,
      byId: {
        ...state.byId,
        b: { total: 'bbb' }
      }
    }
    const stateWithNewByIdAndIds = {
      ...stateWithNewById,
      ids: stateWithNewById.ids.concat(['b'])
    }

    expect(selector(state)).to.be.equal(selector(stateWithNewById))
    expect(selector(state)).to.be.not.equal(selector(stateWithNewByIdAndIds))
  })
})
