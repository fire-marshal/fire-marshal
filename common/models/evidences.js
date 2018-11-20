function randomDateBetween (start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

function generateFakeItem (faker) {
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

module.exports = {
  generateFakeItem
}
