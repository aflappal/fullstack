const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({});
    res.json(blogs.map(b => b.toJSON()));
});

blogsRouter.post('/', async (req, res) => {
    const blog = new Blog(req.body)

    const addedBlog = await blog.save();
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

module.exports = blogsRouter;
