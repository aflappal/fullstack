import React, { useState } from 'react';

const Blog = ({ blog }) => {
    const [blogViewed, setBlogViewed] = useState(false);

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    };

    const showWhenViewed = { display: blogViewed ? '' : 'none' };

    const toggleButton = () => {
        return blogViewed
            ? <button onClick={() => setBlogViewed(false)}>hide</button>
            : <button onClick={() => setBlogViewed(true)}>view</button>
    };

    return (
        <div style={blogStyle}>
            <div>
                {blog.title} {blog.author} {toggleButton()}
            </div>
            <div style={showWhenViewed}>
                {blog.url} <br />
                likes {blog.likes} <button>like</button><br />
                {blog.user.name}
            </div>
        </div>
    );
};

export default Blog;
