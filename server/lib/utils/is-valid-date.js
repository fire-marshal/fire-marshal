/**
 * Is Valid Date
 *
 * @param d
 * @returns {boolean}
 */
module.exports = function isValidDate (d) {
  return d instanceof Date && !isNaN(d)
}
