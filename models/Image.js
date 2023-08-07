const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    text: {
        type: String
    },
    date: {
        type: Date
    },
    image: {
        type: String
    }
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
