const AppError = require('./../utils/appError');
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
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
    console.log(`sendProd ${err.isOperational}`);
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
    console.log(`ddddddddddddddd ${(err.name, err.path)}`);
    // let error = { ...err };
    // console.log(error.name);
    if (err.name === 'CastError') {
      err = handleCastErrorDB(err);
      console.log(`Exports ${err.isOperational}`);
      console.log(`Exports ${err.status}`);
      console.log(`Exports ${err.statusCode}`);
    }

    sendErrorProd(err, res);
  }
};
