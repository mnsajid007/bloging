const express = require('express');
const multer = require('multer');
const { createBlog, updateBlog, deleteBlog, getAllBlog, searchBlog, singleBlog, randBlog, getTableBlog, cateWise } = require('../controller/blogController');

const route = express.Router();

const storage = multer.diskStorage({
    destination (req, file, cb) {
        cb(null, './client/public/files');
    },
    filename (req, file, cb) {
        cb(null, Date.now() + file.originalname );
    }
})

const upload = multer({storage});
route.post('/createBlog', upload.single('image'), createBlog);

route.put('/updateBlog/:id', upload.single('image'), updateBlog);

route.get('/getAllBlog', getAllBlog);

route.get('/getTableBlog', getTableBlog);

route.get('/singleBlog/:slug', singleBlog);

route.get('/cateWise/:cate', cateWise);

route.get('/randBlog', randBlog);

route.get('/searchBlog', searchBlog);

route.delete('/deleteBlog/:id', deleteBlog);


module.exports = route;