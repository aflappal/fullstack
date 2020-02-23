import React, { useState } from 'react';
import PropTypes from 'prop-types';

const PostBlogForm = ({ addBlog }) => {
    PostBlogForm.propTypes = {
        addBlog: PropTypes.func.isRequired
    };

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');

    const submitHandler = (event) => {
        event.preventDefault();
        addBlog({ title, author, url });
        setTitle('');
        setAuthor('');
        setUrl('');
    };

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={submitHandler}>
                <div>
                    title:
                    <input
                        id="postBlogTitle"
                        type="text"
                        value={title}
                        name="Title"
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    author:
                    <input
                        id="postBlogAuthor"
                        type="text"
                        value={author}
                        name="Author"
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    url:
                    <input
                        id="postBlogUrl"
                        type="text"
                        value={url}
                        name="URL"
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    );
};

export default PostBlogForm;
