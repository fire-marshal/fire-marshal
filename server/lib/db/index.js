const MongoClient = require('mongodb').MongoClient

class DB {
  constructor (config) {
    this.config = config
    this.db = null
  }

  async getDB () {
    if (this.db) {
      return this.db
    }

    const client = new MongoClient(this.config.mongo.url, {
      useNewUrlParser: true,
      authSource: 'admin'
    })
    await client.connect()
    this.db = client.db(this.config.mongo.db)
    return this.db
  }

  async getFireCollection () {
    return this.getDB().collection('fires')
  }
}

module.exports = DB
