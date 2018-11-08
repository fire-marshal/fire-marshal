const isValidDate = require('../utils/is-valid-date')

module.exports = (config, app) => {
  /**
   * @swagger
   * /api/v1/fires:
   *   get:
   *     description: Returns list of fires around
   *
   *     parameters:
   *        - in: query
   *          name: start_date
   *          schema:
   *            type: string
   *            format: date
   *          description: >
   *            The Start date for the list of items
   *
   *        - in: query
   *          name: limit
   *          schema:
   *            type: integer
   *            minimum: 0
   *            maximum: 20
   *            default: 20
   *          description: The numbers of items to return
   *
   *     responses:
   *       200:
   *         description: list of fires
   *
   *         content:
   *           application/json:
   *             type: array
   *             items:
   *               $ref: '#/components/schemas/Fire'
   */

  /**
   * Extract len of response but no more than 20
   *
   * @private
   * @param ctx
   * @returns {number}
   */
  function _getLimit (ctx) {
    const maxLimit = 20
    let len = ctx.query.limit || maxLimit
    return Math.min(len, maxLimit)
  }

  function _getStartDate (ctx) {
    return new Date(ctx.query.start_date)
  }

  return async (ctx, next) => {
    let items = []
    let total = 0
    try {
      let limit = _getLimit(ctx)
      let startDate = _getStartDate(ctx)

      const fireCollection = await app.db.collection('fires')

      // construct modngodb request
      let query = {}

      if (isValidDate(startDate)) {
        query = { ...query, 'when.estimation': { '$lt': startDate } }
      }

      let cursor = fireCollection
        .find(query)
        .sort({ 'when.estimation': -1 })
        .limit(limit)

        // What is more efficient for MongoDB?
        // [1] serial
        // @performance: 134.121 [ms]
        // items = await cursor.toArray()
        // total = await cursor.count()

        // [2] parallel
        // @performance: 95.222 [ms]
      ;[items, total] = await Promise.all([
        cursor.toArray(),
        cursor.count()
      ])
    } catch (err) {
      console.error(err)
      console.log(err.stack)
    }

    await next()
    ctx.type = 'json'
    ctx.body = {
      total,
      items
    }
  }
}
