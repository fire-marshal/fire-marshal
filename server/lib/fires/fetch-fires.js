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
   *
   *
   * @performance
   *
   * $ ab -n 500 http://192.168.100.13:8000/api/v1/fires
   *
   * Server Software:        nginx/1.15.5
   * Server Hostname:        192.168.100.13
   * Server Port:            8000
   *
   * Document Path:          /api/v1/fires
   * Document Length:        12518 bytes
   *
   * Concurrency Level:      1
   * Time taken for tests:   10.249 seconds
   * Complete requests:      500
   * Failed requests:        0
   * Total transferred:      6353501 bytes
   * HTML transferred:       6259000 bytes
   * Requests per second:    48.78 [#/sec] (mean)
   * Time per request:       20.498 [ms] (mean)
   * Time per request:       20.498 [ms] (mean, across all concurrent requests)
   * Transfer rate:          605.38 [Kbytes/sec] received
   *
   * Connection Times (ms)
   *               min  mean[+/-sd] median   max
   * Connect:        2    7   4.4      5      47
   * Processing:     9   14   4.9     13      68
   * Waiting:        4    9   4.9      8      66
   * Total:         13   20   6.5     19      73
   *
   * Percentage of the requests served within a certain time (ms)
   *   50%     19
   *   66%     20
   *   75%     21
   *   80%     23
   *   90%     26
   *   95%     31
   *   98%     42
   *   99%     57
   *  100%     73 (longest request)
   */

  /**
   * Extract len of response but no more than 20
   *
   * @param ctx
   * @returns {number}
   */
  function getLimit (ctx) {
    const maxLimit = 20
    let len = ctx.query.limit || maxLimit
    return Math.min(len, maxLimit)
  }

  return async (ctx, next) => {
    let fires = []
    try {
      let limit = getLimit(ctx)

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
