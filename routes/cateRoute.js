const express = require('express');
const { createCate, deleteCate, getCate } = require('../controller/categoryController');

const route = express.Router();

route.post('/category', createCate);

route.get('/getCate', getCate);

route.delete('/deleteCate/:cid', deleteCate);

module.exports = route;