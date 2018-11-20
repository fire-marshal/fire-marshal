const faker = require('faker')

const evidences = require('../../../../common/models/evidences')

const actions = require('./actions')

/**
 * We should monitor sources of fire events
 * and notify user once we found something.
 *
 * Sources:
 * - MongoDB
 * - (?) Kafka
 */

class EvidencesAgent {
  constructor (ctx, db) {
    this._db = db
    this._ctx = ctx
    this._gotNewItem = this._gotNewItem.bind(this)
  }

  _gotNewItem () {
    console.log('got new item and send back to user!')
    this._ctx.dispatch(actions.add(
      evidences.generateFakeItem(faker))
    )
  }

  start (payload) {
    // TODO: start generate wildfire evidences
    this.id = setInterval(this._gotNewItem, 5000)
  }

  stop () {
    // TODO: stop generate wildfire evidences
    clearInterval(this.id)
  }
}

module.exports = EvidencesAgent
