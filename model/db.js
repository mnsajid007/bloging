const express = require('express');
const mongoose = require('mongoose');

const dbConnect = async() => {
    
    try {
        const conn = await mongoose.connect(process.env.URL);
        if(conn){
            console.log('db is connected');
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = dbConnect;