const userModel = require("../model/user")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer')

exports.registerCon = async(req, res) => {
    try {
        const {name, email, password, answer}  = req.body;
        const checkUser = await userModel.findOne({email:email});
        if(checkUser){
           return res.status(500).send({
            success: false,
            message: 'user already Exist',
        })
        }
        const hash = await bcrypt.hash(password, 10);
        const user = await userModel({name, email, password: hash, answer}).save();
        return res.status(200).send({
            success: true,
            message: 'user register',
            user
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'errror in register callback'
        })
    }
}

exports.login = async(req, res) => {
    try {
        const {email, password}  = req.body;
        
        const existUser = await userModel.findOne({email});
        if(!existUser){
           return res.status(301).send({
                success: false,
                message: 'no user Exist'
            })
        }
        const hash = await bcrypt.compare(password, existUser.password);
        if(!hash){
            return res.status(301).send({
                success: false,
                message: 'invalid password'
            })
        }
        const token = await jwt.sign({userId: existUser._id}, process.env.KEY, {expiresIn: '7d'});
        res.status(200).send({
            success: true,
            message: 'user register',
            existUser,
            token
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'errror in login callback'
        })
    }
}

exports.changePass = async(req, res) => {
    try {
        const {email, answer, password}  = req.body;
        const chkUser = await userModel.findOne({email, answer});
        if(!chkUser){
            return res.status(500).send({
                success: false,
                message: 'invalid email or answer'
            })
        }
        const hash = await bcrypt.hash(password, 10);
        const user = await userModel.findByIdAndUpdate({_id: chkUser._id}, {password:hash});
        res.status(200).send({
            success: true,
            message: 'password updated',
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'errror in changepass callback'
        })
    }
}


exports.currentUser = async(req, res) => {
    try {
        const user = await userModel.findOne({_id: req.body.userId});
        if(user){
            return res.status(200).send({
                success: true,
                message: 'current user fetch',
                user
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'errror in getting user'
        })
    }
}