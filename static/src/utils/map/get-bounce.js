export default function getBounce (items) {
  if (!items || items.length === 0) {
    return null
  }

  return items.reduce((bounce, item) => {
    bounce[0][0] = Math.min(bounce[0][0], item[0])
    bounce[0][1] = Math.min(bounce[0][1], item[1])
    bounce[1][0] = Math.max(bounce[1][0], item[0])
    bounce[1][1] = Math.max(bounce[1][1], item[1])
    return bounce;
  }, [[Number.MAX_VALUE, Number.MAX_VALUE], [-Number.MAX_VALUE, -Number.MAX_VALUE]])
}
