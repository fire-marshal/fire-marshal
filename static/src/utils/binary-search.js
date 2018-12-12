/**
 * Find position in sorted array
 *
 * @param {array} values
 * @param newValue
 * @returns {number}
 */
export function binarySearch (values, newValue) {
  let minIdx = 0
  let maxIdx = values.length - 1
  while (minIdx !== maxIdx) {
    let idx = (maxIdx - minIdx) >> 1
    if (values[idx] > newValue) {
      maxIdx = idx
    } else if (values[idx] < newValue) {
      minIdx = idx
    } else {
      return idx
    }
  }

  return maxIdx
}

/**
 * Find position in sorted structure, we would get values by callback
 *
 * @param comparator {function} - return diff between index value and new value
 * @param valuesLength
 * @returns {number}
 */
export function binarySearchOfCallback (comparator, valuesLength) {
  let minIdx = 0
  let maxIdx = valuesLength

  while (minIdx !== maxIdx) {
    let idx = (maxIdx + minIdx) >> 1
    let diff = comparator(idx)
    if (diff > 0) {
      maxIdx = Math.max(0, idx - 1)
    } else if (diff < 0) {
      minIdx = idx + 1
    } else {
      return idx
    }
  }

  return maxIdx
}
