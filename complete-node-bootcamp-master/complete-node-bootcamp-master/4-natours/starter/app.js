const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const app = express();
const tourRouter = require('./routes/tourRoute');
const userRouter = require('./routes/userRoutes');
//1) Middleware
app.use(morgan('dev'));

app.use(express.json());
app.use((req, res, next) => {
  console.log(req);
  console.log('Hello from the Middleware 💥');
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//2) Route Handlers

// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', createTour);
// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

//3) Routes

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
module.exports = app;
