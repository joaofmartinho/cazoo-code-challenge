const db = require('../models');
const Car = db.cars;

const getPagination = (page, size) => {
  const limit = size ? +size : 10;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

// Create and Save a new Car
exports.create = (req, res) => {
  if (
    !req.body.maker &&
    !req.body.model &&
    !req.body.year &&
    !req.body.color &&
    !req.body.availableFrom &&
    !req.body.subscriptionPrice
  ) {
    res.status(400).send({ message: 'Content can not be empty!' });
    return;
  }

  const car = new Car({
    maker: req.body.maker,
    model: req.body.model,
    year: req.body.year,
    color: req.body.color,
    subscriptionPrice: req.body.subscriptionPrice,
    availableFrom: req.body.availableFrom,
    fuelType: req.body.fuelType,
    mileage: req.body.mileage,
    transmission: req.body.transmission,
    seats: req.body.seats
  });

  // Save the Car in the database
  car
    .save(car)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'An occurred while creating the a new Car.'
      });
    });
};

// Retrieve all Cars from the database.
exports.findAll = (req, res) => {
  const { pageNumber, pageSize } = req.query;

  const { limit, offset } = getPagination(pageNumber, pageSize);

  Car.paginate({}, { offset: offset, limit: limit, sort: { subscriptionPrice: 'asc' } })
    .then(data => {
      res.send({
        totalItems: data.totalDocs,
        cars: data.docs,
        totalPages: data.totalPages,
        currentPage: data.page - 1
      });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'An occurred while retrieving the car list.'
      });
    });
};

// Find a single Car with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Car.findById(id)
    .then(data => {
      if (!data) res.status(404).send({ message: 'Not found Car with id ' + id });
      else res.send(data);
    })
    .catch(err => {
      res.status(500).send({ message: 'Error retrieving Car with id=' + id });
    });
};

// Update a Car by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Request body was empty'
    });
  }

  const id = req.params.id;

  Car.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Car with id=${id}. Car not found.`
        });
      } else res.send({ message: 'Car was updated successfully.' });
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error updating Car with id=' + id
      });
    });
};
