const namespace = require('../../package').name

const actionTypes = {
  SUBSCRIBE_EVIDENCES: `${namespace}/EVIDENCES.SUBSCRIBE`,
  UNSUBSCRIBE_EVIDENCES: `${namespace}/EVIDENCES.UNSUBSCRIBE`
}

module.exports = {
  actionTypes,

  /**
   * subscribe evidences
   *
   * @param payload
   * @returns {{type: string, payload: *, meta: {createdAt: number, socket: boolean}}}
   */
  subscribeEvidences: (payload) => ({
    type: actionTypes.SUBSCRIBE_EVIDENCES,
    payload,
    meta: {
      createdAt: Date.now(),
      socket: true,
    }
  }),

  /**
   * unsubscribe evidences
   *
   * @returns {{type: string, meta: {createdAt: number, socket: boolean}}}
   */
  unsubscribeEvidences: () => ({
    type: actionTypes.UNSUBSCRIBE_EVIDENCES,
    meta: {
      createdAt: Date.now(),
      socket: true,
    }
  })
}
