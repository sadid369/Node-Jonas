const express = require('express');
const tourController = require('./../controllers/tourController');
const routes = express.Router();
const authController = require('./../controllers/authController');
// const reviewController = require('./../controllers/reviewController');
// routes.param('id', tourController.checkId);
const reviewRouter = require('./../routes/reviewRoutes');
routes.use('/:tourId/reviews', reviewRouter);

routes.route('/tour-stats').get(tourController.getTourStats);
routes
  .route('/monthly-plan/:year')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide', 'guide'),
    tourController.getMonthlyPlan
  );
routes
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

routes
  .route('/')
  .get(tourController.getAllTours)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.createTour
  );
routes
  .route('/:id')
  .get(tourController.getTour)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.updateTour
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour
  );
// routes
//   .route('/:tourId/reviews')
//   .post(
//     authController.protect,
//     authController.restrictTo('user'),
//     reviewController.createReview
//   );
module.exports = routes;
