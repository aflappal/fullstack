import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

describe('<Blog />', () => {
    let blog;

    beforeEach(() => {
        blog = {
            title: "Test title",
            author: "Mr. Testman",
            url: "http://www.test.com/",
            likes: 4,
            user: {
                name: "John"
            }
        };
    });

    test('renders right content by default', () => {
        const component = render(
            <Blog blog={blog} />
        );

        expect(component.container.querySelector('.blogBasicInfo')).toBeVisible();

        expect(component.container).toHaveTextContent('Test title');
        expect(component.container).toHaveTextContent('Mr. Testman');

        expect(component.container.querySelector('.blogExtendedInfo')).not.toBeVisible();
    });

    test('also renders url and likes when view clicked', () => {
        const component = render(
            <Blog blog={blog} />
        );

        const button = component.getByText('view');
        fireEvent.click(button);

        expect(component.container.querySelector('.blogBasicInfo')).toBeVisible();

        expect(component.container).toHaveTextContent('Test title');
        expect(component.container).toHaveTextContent('Mr. Testman');

        expect(component.container.querySelector('.blogExtendedInfo')).toBeVisible();
    });

    test('clicking the like button twice calls the event handler twice', () => {
        const mockHandler = jest.fn();
        const component = render(
            <Blog blog={blog} addLike={mockHandler} />
        );

        const button = component.container.querySelector('.likeButton');

        fireEvent.click(button);
        fireEvent.click(button);

        expect(mockHandler.mock.calls.length).toBe(2);
    });
});
