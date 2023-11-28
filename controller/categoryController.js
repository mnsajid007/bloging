const cateModel = require("../model/categoryModel");

exports.createCate = async(req, res) => {
    try {
        const { category } = req.body;
        const cate = await cateModel({category}).save();
        if(cate){
            return res.status(200).send({
                success: true,
                message: "new category is created",
                cate
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'errror in cate callback'
        })
    }
}

exports.getCate = async(req, res)=> {
    try {
        
        const cate = await cateModel.find({});
        if(cate){
            res.status(200).send({
                success: true,
                message: 'cate fetch',
                cate
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



exports.deleteCate = async(req, res) => {
    try {
        const { category } = req.body;
        const cate = await cateModel.findByIdAndDelete({_id: req.params.cid});
        if(cate){
            return res.status(200).send({
                success: true,
                message: "cate Deleted",
                cate
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'errror in cate callback'
        })
    }
}