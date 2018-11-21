const packageName = require('../../../package').name
// const serverVersion = require('../../../package').version

const namespace = `${packageName}/evidences`

const actionTypes = {
  ADD: `${namespace}/ADD`
}

const add = (payload) => ({
  type: actionTypes.ADD,
  payload
})

module.exports = {
  actionTypes,
  add
}
