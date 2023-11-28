const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    slug: {
        type: String,
        required: [true, 'slug is required']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: [true, 'user is required']
    },
    image: {
        type: String,
        required: [true, 'image is required']
    },
    description: {
        type: String,
        required: [true, 'desc is required']
    },
    category: {
        type: String,
        required: [true, 'category is required']
    }
    
}, {timestamps: true})

const blogModel = mongoose.model('Blogs', blogSchema);

module.exports = blogModel;