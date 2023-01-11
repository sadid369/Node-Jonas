const AppError = require('./../utils/appError');
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};
const handleDuplicateFieldsDB = (err) => {
  console.log(`here`);
  const value = err.message.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];
  console.log(value);

  const message = `Duplicate field value: ${value}. Please use another value! `;
  return new AppError(message, 400);
};
const handleValidatorErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};
const handleJWTError = () => {
  return new AppError('Invalid token. Please log in again!', 401);
};
const handleJWTExpiredError = () => {
  return new AppError('Your token has expired! Please log in again.', 401);
};
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};
const sendErrorProd = (err, res) => {
  //Operational , trusted error: send message to the client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
  //Programming or other unknown Error
  else {
    // 1) Log Error
    console.error('Error 💥', err);
    //  2 Send general Message

    res.status(500).json({
      status: 'Error',
      message: 'Something went very wrong!',
    });
  }
};
module.exports = (err, req, res, next) => {
  console.log(`ddddddddddddddd ${err.name}`);

  console.log(typeof err);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    // let error = { ...err };
    // console.log(error.name);
    if (err.name === 'CastError') {
      err = handleCastErrorDB(err);
    }
    if (err.code === 11000) {
      err = handleDuplicateFieldsDB(err);
    }
    if (err.name === 'ValidationError') {
      err = handleValidatorErrorDB(err);
    }
    if (err.name === 'JsonWebTokenError') {
      err = handleJWTError();
    }
    if (err.name === 'TokenExpiredError') {
      console.log('here');
      err = handleJWTExpiredError();
    }

    sendErrorProd(err, res);
  }
};
