const express = require('express');
const { handleUserSignup } = require('../controllers/user.js');

const UserRoute = express.Router();

UserRoute.post('/', handleUserSignup);

module.exports = UserRoute;