import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
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

        //expect(component.container.querySelector('.blogBasicInfo')).toBeDefined();
        expect(component.container).toHaveTextContent('Test title');
        expect(component.container).toHaveTextContent('Mr. Testman');

        expect(component.container.querySelector('.blogExtendedInfo'))
            .toHaveStyle('display: none');
    });
});
