import packageJSON from '../../package'

/**
 * get current app namespace
 */
export default function getReduxNamespace () {
  return packageJSON.name
}
