const jwt = require('jsonwebtoken');
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
    res.json(blogs.map(b => b.toJSON()));
});

const getTokenFrom = request => {
    const authorization = request.get('authorization');
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7);
    }
    return null;
}

blogsRouter.post('/', async (req, res) => {
    const token = getTokenFrom(req);
    const blog = new Blog(req.body)
    let decodedToken;

    try {
        decodedToken = jwt.verify(token, process.env.SECRET)
    } catch (err) {
        return res.status(401).json({ error: 'invalid token' });
    }

    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' });
    }
    const user = await User.findById(decodedToken.id);
    blog.user = user._id;

    const addedBlog = await blog.save();
    addedBlog.user = user;
    user.blogs = user.blogs.concat(addedBlog._id);
    await user.save();
    res.status(201).json(addedBlog.toJSON());
});

blogsRouter.delete('/:id', async (req, res) => {
    try {
        await Blog.findByIdAndDelete(req.params.id);
        res.status(204).end();
    } catch (e) {
        res.status(204).end();
    }
});

blogsRouter.put('/:id', async (req, res) => {
    const blog = req.body;
    try {
        const updated = await Blog.findByIdAndUpdate(req.params.id, blog,  { new: true });
        res.json(updated.toJSON());
    } catch (e) {
        res.status(404).end();
    }
});

module.exports = blogsRouter;
