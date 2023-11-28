const blogModel = require("../model/blogModel");
const slugify = require('slugify');

exports.createBlog = async(req, res) => {
    try {
          
          
        if(req.file) {
            // I can access req.body from here if I want
            // res.json(req.file);
            const {name, user, description, category} = req.body;
            const blog = await blogModel({name, slug:slugify(name), user, description, category, image: req.file.filename}).save();
            if(blog){
                res.status(200).send({
                    success: true,
                    message: 'new blog created',
                    blog
                })
            }else{
                res.status(301).send({
                    success: false,
                    message: 'input title or desc error'
                }) 
            }
        }
        else {
            res.status(401).send({
                success: false,
                message: 'image file error'
            })   
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'errror in blog callback'
        })
    }
    
}



exports.updateBlog = async(req, res) => {
    try {
          
          
        if(req.file) {
            // I can access req.body from here if I want
            // res.json(req.file);
            const {name, user, description} = req.body;
            const blog = await blogModel.findByIdAndUpdate({ _id: req.params.id},{...req.body, slug:slugify(req.body.name), image: req.file.filename},{new:true});
            if(blog){
                res.status(200).send({
                    success: true,
                    message: 'blog updated with image',
                    blog
                })
            }else{
                res.status(301).send({
                    success: false,
                    message: 'input title or desc error'
                }) 
            }
        }
        else {
            const {name, user, description} = req.body;
            const blog = await blogModel.findByIdAndUpdate({ _id: req.params.id},{...req.body, slug:slugify(req.body.name)},{new:true});
            if(blog){
                res.status(200).send({
                    success: true,
                    message: 'blog updated without image',
                    blog
                })
            }else{
                res.status(301).send({
                    success: false,
                    message: 'input title or desc error'
                }) 
            }
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'errror in blog callback'
        })
    }
    
}

exports.getAllBlog = async(req, res)=> {
    try {
        const page = req.query.page ? req.query.page : 1;
        const size = req.query.size ? req.query.size : 6;
        const skip = (page - 1) * size;
        const total = await blogModel.countDocuments();
        const blog = await blogModel.find({}).skip(skip).limit(size);
        if(blog){
            res.status(200).send({
                success: true,
                message: 'all blog fetch',
                blog,
                total
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'errror in blog callback'
        })
    }
}


exports.searchBlog = async(req, res)=> {
    try {
        // const query = { $text: { $search: req.query.search } }
        const query = { $text: { name: "a" } }

        const page = req.query.page ? req.query.page : 1;
        const size = req.query.size ? req.query.size : 6;
        const skip = (page - 1) * size;
        const total = await blogModel.countDocuments();
        const blog = await blogModel.find({name:{ $regex:'.*'+req.query.search+'.*'} }).skip(skip).limit(size);
        const totalNumber = await blogModel.find({name:{ $regex:'.*'+req.query.search+'.*'} }).skip(skip).limit(size).countDocuments();
        if(blog){
           return res.status(200).send({
                success: true,
                message: 'all blog fetch',
                blog,
                totalNumber,
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'errror in search callback'
        })
    }
}


exports.deleteBlog = async(req, res)=> {
    try {
        const del = await blogModel.findByIdAndDelete({_id: req.params.id});
        if(del){
            res.status(200).send({
                success: true,
                message: 'blog deleted',
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'errror in blog callback'
        })
    }
}

exports.singleBlog = async(req, res)=> {
    try {
        
        const blog = await blogModel.find({slug: req.params.slug});
        if(blog){
            res.status(200).send({
                success: true,
                message: 'single blog fetch',
                blog
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'errror in blog callback'
        })
    }
}

exports.randBlog = async(req, res)=> {
    try {
        
        const randBlog = await blogModel.find({}).limit('6');
        if(randBlog){
            res.status(200).send({
                success: true,
                message: 'random blog fetch',
                randBlog
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'errror in blog callback'
        })
    }
}

exports.cateWise = async(req, res)=> {
    try {
        const total = await blogModel.countDocuments();
        const blog = await blogModel.find({category: req.params.cate});
        if(blog){
            res.status(200).send({
                success: true,
                message: 'all blog fetch',
                blog,
                total
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'errror in blog callback'
        })
    }
}


exports.getTableBlog = async(req, res)=> {
    try {
        // const page = req.query.page ? req.query.page : 1;
        // const size = req.query.size ? req.query.size : 6;
        // const skip = (page - 1) * size;
        // const page = req.query.page ? req.query.page : 1;
        const size = req.query.size ? req.query.size : 3;
        // const skip = (page - 1) * size;

        const total = await blogModel.countDocuments();
        const blog = await blogModel.find({}).limit(size);
        if(blog){
            res.status(200).send({
                success: true,
                message: 'all blog fetch',
                blog,
                total
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'errror in blog callback'
        })
    }
}