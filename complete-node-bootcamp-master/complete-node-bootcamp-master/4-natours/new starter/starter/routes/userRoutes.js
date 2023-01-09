const express = require('express');
const { router } = require('../app');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const routes = express.Router();
routes.post('/signup', authController.signup);
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
