const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', async (req, res) => {
    const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1 });
    res.json(users.map(u => u.toJSON()));
});

usersRouter.post('/', async (req, res) => {
    const body = req.body;

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);
    const user = new User(
        {
            username: body.username,
            name: body.name,
            passwordHash,
            blogs: []
        }
    );

    const addedUser = await user.save();
    res.status(201).json(addedUser.toJSON());
});

usersRouter.delete('/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(204).end();
    } catch (e) {
        res.status(204).end();
    }
});

usersRouter.put('/:id', async (req, res) => {
    const user = req.body;
    try {
        const updated = await User.findByIdAndUpdate(req.params.id, user,  { new: true });
        res.json(updated.toJSON());
    } catch (e) {
        res.status(404).end();
    }
});

module.exports = usersRouter;
