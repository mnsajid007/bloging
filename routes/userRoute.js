const express = require('express');
const multer = require('multer');
const { registerCon, login, changePass, currentUser } = require('../controller/userController');
const { signIn } = require('../middleware/authMIddleware');

const route = express.Router();

route.post('/register', registerCon);

route.post('/login', login);

route.get('/currentUser', signIn , currentUser);

route.post('/change', changePass);


module.exports = route;