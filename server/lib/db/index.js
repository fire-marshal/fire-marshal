const _ = require('lodash')
const MongoClient = require('mongodb').MongoClient

class DB {
  constructor (config) {
    this.config = config
    this.db = null
    this.getDB = _.memoize(this.getDB)
  }

  async getDB () {
    const client = new MongoClient(this.config.mongo.url, {
      useNewUrlParser: true,
      authSource: 'admin'
    })
    await client.connect()
    return client.db(this.config.mongo.db)
  }

  async getFireCollection () {
    return this.getDB().collection('fires')
  }
}

module.exports = DB
