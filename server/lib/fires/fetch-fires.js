module.exports = (config) => {
  /**
   * @swagger
   * /api/v1/fires:
   *   get:
   *     description: Returns the fires
   *     responses:
   *       200:
   *         description: hello world
   */
  return async (ctx, next) => {
    // TODO: fetch actual fires
    await next()
    ctx.type = 'json'
    ctx.body = ['fire1', 'fire2']
  }
}
