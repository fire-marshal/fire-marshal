import { expect } from 'chai'

import { binarySearchOfCallback } from '../../src/utils/binary-search'

const naturalNumbers = value => idx => {
  if (idx < 0) {
    throw new Error('negative idx')
  }
  return idx - value
}

describe('utils', () => {
  describe('binary-search', () => {
    describe('#binarySearchOfCallback', () => {
      it('should return 0 for empty array', () => {
        const idx = binarySearchOfCallback(naturalNumbers(2.5), 0)
        expect(idx).to.be.equal(0)
      })

      it('should return last + 1 idx for item which bigger than any in array', () => {
        const idx = binarySearchOfCallback(naturalNumbers(2.5), 2)
        expect(idx).to.be.equal(2)
      })

      it('should set at the middle if values lays at the middle of values', () => {
        // 0,1,2,    3,4
        //        2.5
        const idx = binarySearchOfCallback(naturalNumbers(2.5), 5)
        expect(idx).to.be.equal(3)
      })

      it('should set at the zero for item which smaller than any in array', () => {
        const idx = binarySearchOfCallback(naturalNumbers(-1), 5)
        expect(idx).to.be.equal(0)
      })

      it('should set at the zero for item which equal to the 1st item in a values', () => {
        const idx = binarySearchOfCallback(naturalNumbers(0), 5)
        expect(idx).to.be.equal(0)
      })
    })
  })
})
