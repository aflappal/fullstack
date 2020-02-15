const mongoose = require('mongoose');
const Blog = require('../models/blog');
const supertest = require('supertest');
const logger = require('../utils/logger');
const app = require('../app');

const api = supertest(app);

const listWithOneBlog = [
    {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
    }
];

const initialBlogs = [
    {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
    },
    {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
    },
    {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
    },
    {
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
    },
    {
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0
    },
];

beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(initialBlogs);
});

test('the right number of blogs is returned with GET all', async () => {
    const result = await api.get('/api/blogs');
    expect(result.body.length).toBe(initialBlogs.length);
});

test('blogs have an identifier field id instead of _id', async () => {
    const blogs = await api.get('/api/blogs');
    blogs.body.forEach(blog => {
        expect(blog.id).toBeDefined();
        expect(blog._id).toBeUndefined();
    });
});

test('a blog can be added', async () => {
    const newBlog = {
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2
    };

    let blogs = await api.get('/api/blogs');
    const numInitialBlogs = blogs.body.length;

    await api.post('/api/blogs').send(newBlog);

    blogs = await api.get('/api/blogs');
    const numChangedBlogs = blogs.body.length;

    expect(numChangedBlogs).toBe(numInitialBlogs + 1);
});

afterAll(() => {
    mongoose.connection.close();
});
