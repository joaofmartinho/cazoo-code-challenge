module.exports = (mongoose, mongoosePaginate) => {
  var schema = mongoose.Schema(
    {
      maker: String,
      model: String,
      year: Number,
      color: String,
      subscriptionPrice: Number,
      availableFrom: Date,
      fuelType: String,
      mileage: String,
      transmission: String,
      seats: Number,
    },
    { timestamps: true },
  );

  schema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  schema.plugin(mongoosePaginate);
  const Car = mongoose.model('car', schema);

  return Car;
};
