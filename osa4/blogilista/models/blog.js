const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: { type: Number, default: 0 }
});

blogSchema.set('toJSON', {
    transform: (document, retObj) => {
        retObj.id = retObj._id.toString();
        delete retObj._id;
        delete retObj.__v;
    }
});

module.exports = mongoose.model('Blog', blogSchema);
