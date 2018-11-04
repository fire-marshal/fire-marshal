const MongoClient = require('mongodb').MongoClient

module.exports = (config) => {
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
    const client = new MongoClient(config.mongo.url, {
      useNewUrlParser: true,
      authSource: 'admin'
    })
    try {
      await client.connect()
      const db = client.db(config.mongo.db)
      const fireCollection = await db.collection('fires')
      fires = await fireCollection.find({}).toArray()
      await client.close()
    } catch (err) {
      console.error(err)
      console.log(err.stack)
    }

    // TODO: fetch actual fires
    await next()
    ctx.type = 'json'
    ctx.body = fires // ['fire1', 'fire2']
  }
}
