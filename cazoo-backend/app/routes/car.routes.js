module.exports = app => {
  const cars = require('../controllers/car.controller.js');

  var router = require('express').Router();

  // Create a new Car
  router.post('/', cars.create);

  // Retrieve all Cars
  router.get('/', cars.findAll);

  // Retrieve a single Car with id
  router.get('/:id', cars.findOne);

  // Update a Car with id
  router.put('/:id', cars.update);

  app.use('/api/cars', router);
};
