const jwt = require('jsonwebtoken');
const userModel = require('../model/user');

exports.signIn = async(req, res, next)=> {
    try {
        const token = req.headers.authorization;
        await jwt.verify(token, process.env.KEY, (error, decode)=> {
            if(error){
              return res.status(301).send({
                    success: false,
                    message: 'errror in sign in token'
                })
            }else{
                req.body.userId = decode.userId;
                next();
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'errror in sign in callback'
        })
    }
}

