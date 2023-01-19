const catchAsync = require('./../utils/catchAsync');
const Review = require('./../models/reviewModel');

exports.createReview = catchAsync(async (req, res, next) => {
  //Allowed nested route
  if (!req.body.tour) {
    req.body.tour = req.params.tourId;
  }
  if (!req.body.user) {
    req.body.user = req.user.id;
  }
  const newReview = await Review.create(req.body);
  res.status(201).json({
    status: 'success',

    data: {
      review: newReview,
    },
  });
});
exports.getAllReview = catchAsync(async (req, res, next) => {
  const reviews = await Review.find();
  res.status(200).json({
    status: 'success',
    result: reviews.length,
    data: {
      reviews,
    },
  });
});
