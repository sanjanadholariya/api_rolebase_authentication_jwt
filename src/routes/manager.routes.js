const express = require('express');
const { loginManager, addEmployee, allEmployee, editEmployee, deleteEmployee } = require('../controller/manager.controller');
const verifyToken = require('../middleware/verifyToken');
const verifyRole = require('../middleware/verifyRole');
const imageUpload = require('../middleware/imageUpload');

const routes = express.Router();

routes.post('/loginManager',loginManager)

// Actions of employee which manager can access
routes.post('/addEmployee',verifyToken,verifyRole('Manager'),imageUpload.single('profile'),addEmployee)
routes.put('/editEmployee',verifyToken,verifyRole('Manager'),imageUpload.single('profile'),editEmployee)
routes.get('/allEmployee',verifyToken,verifyRole('Admin','Manager','Employee'),allEmployee)
routes.delete('/deleteEmployee',verifyToken,verifyRole('Manager'),deleteEmployee)

module.exports = routes