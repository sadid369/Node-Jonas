const express = require('express');

const routes = express.Router();
const userController = require('./../controllers/userController');
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
