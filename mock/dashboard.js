const faker = require('faker');
const Random = faker.random;

module.exports = function() {
  let dashboard = [];

  for (let i = 0; i < 10; i++) {
    dashboard.push({
      id: Random.uuid(),
      title: Random.word(4, 8),
      desc: Random.words(30, 50),
      tag: Random.word(2, 5),
      views: Random.number(),
      images: Random.image(),
    });
  }

  return dashboard;
}
