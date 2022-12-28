const app = require('./app');
const mongoose = require('mongoose');
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose.connect(DB).then(() => {
  console.log('Successfully Connect to MongoDB');
});
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have name'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
});

const Tour = mongoose.model('Tour', tourSchema);
const testTour = new Tour({
  name: 'The Park Camper',
  // rating: 4.7,
  price: 997,
});
testTour
  .save()
  .then((doc) => {
    console.log(doc);
  })
  .catch((e) => console.log(e));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App running on port at ${PORT}`);
});
