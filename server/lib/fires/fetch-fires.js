module.exports = (config, app) => {
  /**
   * @swagger
   * /api/v1/fires:
   *   get:
   *     description: Returns list of fires around
   *     responses:
   *       200:
   *         description: list of fires
   *         content:
   *           application/json:
   *             type: array
   *             items:
   *               $ref: '#/components/schemas/Fire'
   */
  return async (ctx, next) => {
    let fires = []
    try {
      const fireCollection = await app.db.collection('fires')
      fires = await fireCollection
        .find({})
        .sort({ 'when.exactlyAt': -1 })
        .limit(10)
        .toArray()
    } catch (err) {
      console.error(err)
      console.log(err.stack)
    }

    // TODO: fetch actual fires
    await next()
    ctx.type = 'json'
    ctx.body = fires
  }
}
