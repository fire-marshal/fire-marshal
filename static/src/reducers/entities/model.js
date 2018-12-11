/**
 * process each new item
 *
 * @param item
 * @returns {{id: *}}
 */
export function processItem (item) {
  return {
    ...item,
    id: item._id,
    when: {
      ...item.when,
      estimation: new Date(item.when.estimation)
    }
  }
}
