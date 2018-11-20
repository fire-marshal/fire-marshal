const packageName = require('../../package').name

const namespace = `${packageName}/redux-middleware`

const actionTypes = {
  CONNECT: `${namespace}/CONNECT`
}

const connect = () => ({
  type: actionTypes.CONNECT
})

module.exports = {
  actionTypes,
  connect
}
