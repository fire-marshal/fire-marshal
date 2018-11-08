const faker = require('faker')
const _ = require('lodash')

const DB = require('../lib/db')
const config = require('../lib/config')

async function fakeCollections (config) {
  const db = new DB(config)
  await Promise.all(
    // we can't use 1e6 here because it is too big for node.js
    // FATAL ERROR:
    // Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory
    [fakeFireCollection(db, 1e5)]
  )
}

function randomDateBetween (start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

function generateFakeEvent () {
  const createAt = randomDateBetween(new Date(2000, 0, 0), new Date())
  const uploadAt = randomDateBetween(createAt, new Date())
  return {
    author: faker.name.findName(),
    uploadAt,
    details: faker.lorem.paragraph(),
    img: {
      medium: faker.image.image()
    },
    location: {
      center: [
        38.25 + 10 * Math.random(),
        -120 + 10 * Math.random()
      ],
      radius: 1 * Math.random()
    },
    power: Math.random(),
    tags: faker.lorem.words().split(' '),
    title: faker.lorem.sentence(),
    when: {
      exactlyAt: createAt,
      estimation: createAt
    }
  }
}

/**
 * genereate many fake cases
 */
async function fakeFireCollection (db, count) {
  console.log('fake fire collection')
  const col = await db.collection('fires')
  const r = await col.insertMany(_.range(count).map(generateFakeEvent))
  console.log('r', r)
  return r.insertedCount
}

/**
 * Upload 3 fire case
 * use data from https://en.wikipedia.org/wiki/Conflagration
 * @param db
 * @returns {Promise<*|number|Number>}
 */
// async function wikiFireCollection (db) {
//   console.log('wiki fire collection')
//   const col = await db.collection('fires')
//   const r = await col.insertMany(require('./fixtures/fires.json'))
//   console.log('r', r)
//   return r.insertedCount
// }

fakeCollections(config).then((count) => {
  console.log('done', count)
  process.exit(0)
}, (err) => {
  console.error('fail', err)
  process.exit(1)
})
