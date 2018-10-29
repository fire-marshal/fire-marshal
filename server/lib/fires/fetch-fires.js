module.exports = (config) => {
  /**
   * @swagger
   * /api/v1/fires:
   *   get:
   *     description: Returns list of fires around
   *     responses:
   *       200:
   *         description: list of fires
   *           content:
   *             application/json:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Fire'
   */
  return async (ctx, next) => {
    // TODO: fetch actual fires
    await next()
    ctx.type = 'json'
    ctx.body = ['fire1', 'fire2']
  }
}
