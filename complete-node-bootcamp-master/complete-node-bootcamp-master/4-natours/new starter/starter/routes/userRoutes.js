const express = require('express');
const { router } = require('../app');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const routes = express.Router();
routes.post('/signup', authController.signup);
routes.post('/login', authController.login);
routes.post('/forgotPassword', authController.forgotPassword);
routes.patch('/resetPassword/:token', authController.resetPassword);

routes.use(authController.protect);
routes.patch('/updateMyPassword', authController.updatePassword);
routes.get('/me', userController.getMe, userController.getUser);
routes.patch('/updateMe', userController.updateMe);
routes.delete('/deleteMe', userController.deleteMe);
routes.use(authController.restrictTo('admin'));
routes
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUsers);
routes
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = routes;
