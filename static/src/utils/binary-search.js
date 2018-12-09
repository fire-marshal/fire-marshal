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
 * @param valuesCallback {function} - gives value by idx
 * @param valuesLength
 * @param newValue
 * @returns {number}
 */
export function binarySearchOfCallback (valuesCallback, valuesLength, newValue) {
  let minIdx = 0
  let maxIdx = valuesLength
  while (minIdx !== maxIdx) {
    let idx = (maxIdx + minIdx) >> 1
    let inplaceValue = valuesCallback(idx)
    if (inplaceValue > newValue) {
      maxIdx = Math.max(0, idx - 1)
    } else if (inplaceValue < newValue) {
      minIdx = idx + 1
    } else {
      return Math.max(0, idx)
    }
  }

  return maxIdx
}
