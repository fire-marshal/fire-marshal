import { expect } from 'chai'

import getBounce from '../../../src/utils/map/get-bounce'

describe('utils / map / #get-bounce', () => {
  it('should return null if we pass nothing', () => {
    expect(getBounce()).to.be.null
  })

  it('should return bounce for list of points', () => {
    expect(getBounce([
      [1, 3],
      [4, 2],
      [2, 5]
    ])).to.be.deep.equal([
      [1, 2],
      [4, 5]
    ])
  })
})
