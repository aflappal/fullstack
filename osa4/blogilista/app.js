const config = require('./utils/config');
const express = require('express');
const cors = require('cors');
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const mongoose = require('mongoose');

const app = express();

const mongoUrl = config.MONGODB_URI;
mongoose.set('useFindAndModify', false);
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true});

app.use(cors());
app.use(express.json());
app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

module.exports = app;
