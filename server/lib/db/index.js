async function getDb () {
  return null
}

module.exports = (config) => {
  async getFireCollection () {
    const db = getDb(config)
    return await db.collection('fires')
  }
}
