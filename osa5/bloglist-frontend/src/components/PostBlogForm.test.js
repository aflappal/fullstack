import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import PostBlogForm from './PostBlogForm';

describe('<PostBlogForm />', () => {
    test('calls the addBlog handler with the right parameters', () => {
        const addBlog = jest.fn();
        const component = render(
            <PostBlogForm addBlog={addBlog} />
        );
        const blog = {
            title: "My title",
            author: "Mr. Author",
            url: "http://www.test.com/"
        };
        const titleInput = component.container.querySelector('#postBlogTitle');
        const authorInput = component.container.querySelector('#postBlogAuthor');
        const urlInput = component.container.querySelector('#postBlogUrl');
        const form = component.container.querySelector('form');

        fireEvent.change(titleInput, {
            target: { value: blog.title }
        });
        fireEvent.change(authorInput, {
            target: { value: blog.author }
        });
        fireEvent.change(urlInput, {
            target: { value: blog.url }
        });
        fireEvent.submit(form);

        expect(addBlog.mock.calls.length).toBe(1);
        expect(addBlog.mock.calls[0][0]).toStrictEqual(blog);
    });
});
