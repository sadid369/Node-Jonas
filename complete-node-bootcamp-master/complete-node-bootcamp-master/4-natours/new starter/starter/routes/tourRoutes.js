const express = require('express');
const tourController = require('./../controllers/tourController');
const routes = express.Router();
const authController = require('./../controllers/authController');
const reviewController = require('./../controllers/reviewController');
// routes.param('id', tourController.checkId);
routes.route('/tour-stats').get(tourController.getTourStats);
routes.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);
routes
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

routes
  .route('/')
  .get(authController.protect, tourController.getAllTours)
  .post(tourController.createTour);
routes
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour
  );
routes
  .route('/:tourId/reviews')
  .post(
    authController.protect,
    authController.restrictTo('user'),
    reviewController.createReview
  );
module.exports = routes;
