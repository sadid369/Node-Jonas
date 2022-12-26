const express = require('express');
const fs = require('fs');
const app = express();
const morgan = require('morgan');
// 1) Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use((req, res, next) => {
  console.log('Hello from middleware');
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);
// 2) Route Handlers
const getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.json({
    status: 'Success',
    result: tours.length,
    requestedAt: req.requestTime,
    data: {
      tours,
    },
  });
};
const getTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;

  const tour = tours.find((el) => el.id === id);
  console.log(tour);
  // if (id > tours.length) {
  if (!tour) {
    return res.status(404).json({
      status: 'Fail',
      message: 'Invalid Id',
    });
  }

  res.json({
    status: 'Success',
    data: {
      tour,
    },
  });
};

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};
const updateTour = (req, res) => {
  console.log(req.body);
  if (req.params.id * 1 > tours.length) {
    res.status(404).json({
      status: 'Fail',
      message: 'Invalid Id',
    });
  } else {
    res.status(200).json({
      status: 'success',
      data: {
        tour: '<Updated tour here...>',
      },
    });
  }
};
const deleteTour = (req, res) => {
  console.log(req.body);
  if (req.params.id * 1 > tours.length) {
    res.status(404).json({
      status: 'Fail',
      message: 'Invalid Id',
    });
  } else {
    res.status(204).json({
      status: 'success',
      data: null,
    });
  }
};
const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: 'This route is not yet defined!',
  });
};
const createUsers = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: 'This route is not yet defined!',
  });
};
const getUser = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: 'This route is not yet defined!',
  });
};
const updateUser = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: 'This route is not yet defined!',
  });
};
const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: 'This route is not yet defined!',
  });
};

// 3) Routes

const tourRouter = express.Router();
const userRouter = express.Router();

tourRouter.route('/').get(getAllTours).post(createTour);
tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

userRouter.route('/').get(getAllUsers).post(createUsers);
userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
// 4) Start The Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`App running on port at ${PORT}`);
});
