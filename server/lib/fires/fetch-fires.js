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
   * Document Length:        6352 bytes
   *
   * Concurrency Level:      1
   * Time taken for tests:   7.985 seconds
   * Complete requests:      500
   * Failed requests:        8
   *    (Connect: 0, Receive: 0, Length: 8, Exceptions: 0)
   * Non-2xx responses:      8
   * Total transferred:      3220153 bytes
   * HTML transferred:       3126440 bytes
   * Requests per second:    62.61 [#/sec] (mean)
   * Time per request:       15.971 [ms] (mean)
   * Time per request:       15.971 [ms] (mean, across all concurrent requests)
   * Transfer rate:          393.81 [Kbytes/sec] received
   *
   * Connection Times (ms)
   *               min  mean[+/-sd] median   max
   * Connect:        3    6  12.4      5     278
   * Processing:     4   10   4.9      9      84
   * Waiting:        3    8   4.8      7      83
   * Total:          7   16  15.3     14     337
   *
   * Percentage of the requests served within a certain time (ms)
   *   50%     14
   *   66%     15
   *   75%     16
   *   80%     17
   *   90%     19
   *   95%     21
   *   98%     28
   *   99%     39
   *  100%    337 (longest request)
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

    await next()
    ctx.type = 'json'
    ctx.body = fires
  }
}
