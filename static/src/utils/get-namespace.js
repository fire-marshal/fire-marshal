import packageJSON from '../../package'

/**
 * get current app namespace
 */
module.exports = function getReduxNamespace () {
  return packageJSON.name
}
