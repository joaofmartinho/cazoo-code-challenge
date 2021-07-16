db.createUser({
  user: 'user',
  pwd: 'secretPassword',
  roles: [{ role: 'dbOwner', db: 'cazoo-database' }]
});

db.cars.insert([
  {
    _id: { $oid: '60ed64a51778232eb8877f43' },
    maker: 'Toyota',
    model: 'Yaris',
    year: 2021,
    color: 'White',
    subscriptionPrice: 20,
    createdAt: { $date: '2021-07-13T10:02:13.634Z' },
    updatedAt: { $date: '2021-07-15T18:12:40.216Z' },
    __v: 0,
    availableFrom: { $date: '2026-08-18T16:00:00.000Z' },
    fuelType: 'Gasoline',
    mileage: '10000',
    seats: 3,
    transmission: 'Manual'
  },
  {
    _id: { $oid: '60ed64ba1778232eb8877f45' },
    maker: 'Toyota',
    model: 'Yaris',
    year: 2021,
    color: 'Black',
    subscriptionPrice: 6789.97,
    createdAt: { $date: '2021-07-13T10:02:34.895Z' },
    updatedAt: { $date: '2021-07-16T01:29:06.430Z' },
    __v: 0,
    availableFrom: { $date: '2035-07-05T23:00:00.000Z' },
    fuelType: '',
    mileage: '',
    seats: null,
    transmission: ''
  }
]);
