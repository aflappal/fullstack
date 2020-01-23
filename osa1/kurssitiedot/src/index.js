import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
    return (
        <div>
            <h1>{props.course}</h1>
        </div>
    );
};

const Total = (props) => {
    return (
        <div>
            <p>Number of exercises {props.total}</p>
        </div>
    );
};

const Part = (props) => {
    return (
        <p>{props.content.part} {props.content.exercises}</p>
    );
};

const Content = (props) => {
    return (
        <div>
            <Part content={props.content[0]} />
            <Part content={props.content[1]} />
            <Part content={props.content[2]} />
        </div>
    );
};

const App = () => {
    const course = 'Half Stack application development';
    const content = [
        {part: 'Fundamentals of React', exercises: 10},
        {part: 'Using props to pass data', exercises: 7},
        {part: 'State of a component', exercises: 14}
    ];
    let timesum = content.map(c => c.exercises).reduce((a, b) => a + b);

    return (
        <div>
            <Header course={course} />
            <Content content={content} />
            <Total total={timesum} />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
