const express = require('express');
const verifyToken = require('../middleware/verifyToken');
const { loginEmployee, changeEmployeePassword } = require('../controller/employee.controller');
const verifyRole = require('../middleware/verifyRole');

const routes = express.Router();

routes.post('/loginEmployee',loginEmployee)
routes.post('/changeEmployeePassword',verifyToken,verifyRole('Employee'),changeEmployeePassword)

module.exports = routes;