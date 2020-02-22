import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import PostBlogForm from './components/PostBlogForm';
import blogService from './services/blogs';
import loginService from './services/login';

const LoginForm = ({
        handleLogin,
        handleUsernameChange,
        handlePasswordChange,
        username,
        password
    }) => (
    <form onSubmit={handleLogin}>
        <div>
            username
            <input
                type="text"
                value={username}
                name="Username"
                onChange={handleUsernameChange}
            />
        </div>
        <div>
            password
            <input
                type="password"
                value={password}
                name="Password"
                onChange={handlePasswordChange}
            />
        </div>
        <button type="submit">login</button>
    </form>
);

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');
    const [user, setUser] = useState(null);
    const [postFormVisible, setPostFormVisible] = useState(false);

    const handleUsernameChange = ({ target }) => setUsername(target.value);
    const handlePasswordChange = ({ target }) => setPassword(target.value);

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
        setPostFormVisible(false);
    };

    if (user === null) {
        return (
            <div>
                <h2>Log in to application</h2>
                <LoginForm
                    username={username}
                    password={password}
                    handleUsernameChange={handleUsernameChange}
                    handlePasswordChange={handlePasswordChange}
                    handleLogin={handleLogin}
                />
            </div>
        );
    };

    const postBlogForm = () => {
        const hideWhenVisible = { display: postFormVisible ? 'none' : '' };
        const showWhenVisible = { display: postFormVisible ? '' : 'none' };

        return (
            <div>
                <div style={hideWhenVisible}>
                    <button onClick={() => setPostFormVisible(true)}>new blog</button>
                </div>
                <div style={showWhenVisible}>
                    <PostBlogForm
                        title={title}
                        author={author}
                        url={url}
                        handleTitleChange={({ target }) => setTitle(target.value)}
                        handleAuthorChange={({ target }) => setAuthor(target.value)}
                        handleUrlChange={({ target }) => setUrl(target.value)}
                        handlePostBlog={handlePostBlog}
                    />
                    <button onClick={() => setPostFormVisible(false)}>cancel</button>
                </div>
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
            {postBlogForm()}
            {blogs
                .filter(blog =>
                    blog.user && blog.user.username === user.username)
                .map(blog =>
                    <Blog key={blog.id} blog={blog} />)
            }
        </div>
    );
}

export default App;
