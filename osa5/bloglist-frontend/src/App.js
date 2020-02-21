import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        )  
    }, []);

    useEffect(() => {
        const loggedJson = window.localStorage.getItem('loggedBlogappUser');
        if (loggedJson) {
            const user = JSON.parse(loggedJson);
            setUser(user);
            blogService.setToken(user.token);
        }
    }, []);

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const user = await loginService.login({
                username, password,
            });

            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            );
            setUser(user);
            setUsername('');
            setPassword('');
            blogService.setToken(user.token);
        } catch (exception) {
            /*
            setErrorMessage('wrong credentials');
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000);
            */
            console.error('wrong credentials:', exception);
        }
    };

    const handleLogout = () => {
        window.localStorage.removeItem('loggedBlogappUser');
        setUser(null);
    };

    const handlePostBlog = async (event) => {
        event.preventDefault();
        const blog = { title, author, url };
        const returnedBlog = await blogService.create(blog);
        setTitle('');
        setAuthor('');
        setUrl('');
        setBlogs(blogs.concat(returnedBlog));
    };

    const loginForm = () => (
        <form onSubmit={handleLogin}>
            <div>
                username
                <input
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                password
                <input
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button type="submit">login</button>
        </form>
    );

    const postBlogForm = () => (
        <form onSubmit={handlePostBlog}>
            <div>
                title:
                <input
                    type="text"
                    value={title}
                    name="Title"
                    onChange={({ target }) => setTitle(target.value)}
                />
            </div>
            <div>
                author:
                <input
                    type="text"
                    value={author}
                    name="Author"
                    onChange={({ target }) => setAuthor(target.value)}
                />
            </div>
            <div>
                url:
                <input
                    type="text"
                    value={url}
                    name="URL"
                    onChange={({ target }) => setUrl(target.value)}
                />
            </div>
            <button type="submit">create</button>
        </form>
    );


    if (user === null) {
        return (
            <div>
                <h2>Log in to application</h2>
                {loginForm()}
            </div>
        );
    };

    return (
        <div>
            <p>
                {user.name} logged in
                <button onClick={handleLogout}>logout</button>
            </p>
            <h2>blogs</h2>
            {blogs
                .filter(blog =>
                    blog.user && blog.user.username === user.username)
                .map(blog =>
                    <Blog key={blog.id} blog={blog} />)
            }
            <h2>create new</h2>
            {postBlogForm()}
        </div>
    );
}

export default App;
