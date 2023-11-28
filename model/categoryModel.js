const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    
    category: {
        type: String,
        required: [true, 'category is required']
    }
    
}, {timestamps: true})

const cateModel = mongoose.model('Category', categorySchema);

module.exports = cateModel;