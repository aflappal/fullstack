import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({text, handleClick}) => {
    return (
        <button onClick={handleClick}>{text}</button>
    );
};

const Feedback = (props) => {
    const [goodHandler, neutralHandler, badHandler] = props.clickHandlers;
    return (
        <div>
            <h1>Give feedback</h1>
            <Button text='good' handleClick={goodHandler} />
            <Button text='neutral' handleClick={neutralHandler}/>
            <Button text='bad' handleClick={badHandler}/>
        </div>
    );
};

const StatisticLine = ({text, value}) => <p>{text} {value}</p>;

const Statistics = (props) => {
    const {good, neutral, bad} = props.clicks;
    return (
        <div>
            <h1>Statistics</h1>
            <StatisticLine text='good' value={good} />
            <StatisticLine text='neutral' value={neutral} />
            <StatisticLine text='bad' value={bad} />
        </div>
    );
};

const App = () => {
    // separate states for each button
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);
    const clickHandlers = [
        () => setGood(good + 1),
        () => setNeutral(neutral + 1),
        () => setBad(bad + 1)
    ];

    return (
        <div>
            <Feedback clickHandlers={clickHandlers} />
            <Statistics clicks={{good, neutral, bad}}/>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
