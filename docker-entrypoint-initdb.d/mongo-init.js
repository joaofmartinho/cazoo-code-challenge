db = new Mongo().getDB('cazoo-database');
db.createCollection('cars');
db.cars.insert([
  {
    maker: 'Toyota',
    model: 'Yaris',
    year: 2021,
    color: 'Yellow',
    subscriptionPrice: 6789.97,
    availableFrom: '2021-08-18T16:00:00.000Z',
    createdAt: '2021-07-16T15:00:38.889Z',
    updatedAt: '2021-07-16T15:00:38.889Z',
    id: '60f19f163a918d13e0bf759f'
  },
  {
    maker: 'Toyota',
    model: 'Yaris',
    year: 2021,
    color: 'Yellow',
    subscriptionPrice: 6789.97,
    availableFrom: '2021-08-18T16:00:00.000Z',
    createdAt: '2021-07-16T15:00:38.889Z',
    updatedAt: '2021-07-16T15:00:38.889Z',
    id: '60f19f163a918d13e0bf759f'
  }
]);
