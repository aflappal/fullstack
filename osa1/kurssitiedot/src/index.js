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
    let timesum = props.parts.map(c => c.exercises).reduce((a, b) => a + b);
    return (
        <div>
            <p>Number of exercises {timesum}</p>
        </div>
    );
};

const Part = (props) => {
    return (
        <p>{props.part.name} {props.part.exercises}</p>
    );
};

const Content = (props) => {
    return (
        <div>
            <Part part={props.parts[0]} />
            <Part part={props.parts[1]} />
            <Part part={props.parts[2]} />
        </div>
    );
};

const App = () => {
    const course = 'Half Stack application development';
    const parts = [
        {name: 'Fundamentals of React', exercises: 10},
        {name: 'Using props to pass data', exercises: 7},
        {name: 'State of a component', exercises: 14}
    ];

    return (
        <div>
            <Header course={course} />
            <Content parts={parts} />
            <Total parts={parts} />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
