const _ = require('lodash')
const MongoClient = require('mongodb').MongoClient

class DB {
  constructor (config) {
    this._config = config
    this._memoizedCollections = new Map()

    this.getDB = _.memoize(this.getDB)
  }

  async getDB () {
    const client = new MongoClient(this._config.mongo.url, {
      useNewUrlParser: true,
      authSource: 'admin'
    })
    await client.connect()
    return client.db(this._config.mongo.db)
  }

  async collection (name) {
    if (this._memoizedCollections.has(name)) {
      return this._memoizedCollections.get(name)
    }

    const col = await (await this.getDB()).collection(name)
    this._memoizedCollections.set(name, col)
    return col
  }
}

module.exports = DB
