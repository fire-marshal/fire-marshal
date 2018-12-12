/**
 * process each new evidence item
 *
 * @param evidence
 * @returns {{id: *}}
 */
export function processItem (evidence) {
  return {
    ...evidence,
    id: evidence._id,
    when: {
      ...evidence.when,
      estimation: new Date(evidence.when.estimation)
    }
  }
}
