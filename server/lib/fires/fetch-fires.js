module.exports = (config, app) => {
  /**
   * @swagger
   * /api/v1/fires:
   *   get:
   *     description: Returns list of fires around
   *
   *     parameters:
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

  return async (ctx, next) => {
    let fires = []
    try {
      let limit = _getLimit(ctx)

      const fireCollection = await app.db.collection('fires')
      fires = await fireCollection
        .find({})
        .sort({ 'when.exactlyAt': -1 })
        .limit(limit)
        .toArray()
    } catch (err) {
      console.error(err)
      console.log(err.stack)
    }

    await next()
    ctx.type = 'json'
    ctx.body = fires
  }
}
