const config = require('../utils/config');

const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
});

const mongoUrl = config.MONGODB_URI;
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true});

module.exports = mongoose.model('Blog', blogSchema);
