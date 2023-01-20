const User = require('./../models/userModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');
const filterObJ = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  //SEND QUERY
  res.status(200).json({
    status: 'Success',
    result: users.length,
    data: {
      users,
    },
  });
});
exports.createUsers = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: 'This route is not yet defined!',
  });
};
exports.updateMe = async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This routes is not for update password. Please use /updateMyPassword. '
      )
    );
  }
  // 2) Update user document
  const filteredBody = filterObJ(req.body, 'name', 'email');
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    returnDocument: 'after',
    runValidators: true,
  });
  res.status(200).json({
    status: 'success',
    date: {
      user: updatedUser,
    },
  });
};
exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: 'This route is not yet defined!',
  });
};
exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: 'This route is not yet defined!',
  });
};
// exports.deleteUser = (req, res) => {
//   res.status(500).json({
//     status: 'Error',
//     message: 'This route is not yet defined!',
//   });
// };
exports.deleteUser = factory.deleteOne(User);
