const DB = require('../lib/db')
const config = require('../lib/config')

async function fakeCollections (config) {
  const db = new DB(config)
  await Promise.all([fakeFireCollection(db)])
}

async function fakeFireCollection (db) {
  // use data from https://en.wikipedia.org/wiki/Conflagration

  console.log('fake fire collection')
  const col = await db.collection('fires')
  const r = await col.insertMany(require('./fixtures/fires.json'))
  console.log('r', r)
  return r.insertedCount
}

fakeCollections(config).then((count) => {
  console.log('done', count)
  process.exit(0)
}, (err) => {
  console.error('fail', err)
  process.exit(1)
})
