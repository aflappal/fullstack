import React from 'react';

const Header = (props) => {
    return <h2>{props.course}</h2>;
};

const Total = ({parts}) => {
    let timesum = parts.map(c => c.exercises).reduce((a, b) => a + b);
    return <p><b>Total of {timesum} exercises</b></p>;
};

const Part = (props) => {
    return <p>{props.part.name} {props.part.exercises}</p>;
};

const Content = (props) => {
    return (
        <div>
            {props.parts.map(part => <Part key={part.id} part={part} />)}
        </div>
    );
};

const Course = ({course}) => {
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    );
};

export default Course;
