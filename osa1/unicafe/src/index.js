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

const StatisticLine = ({text, value, unit}) => (
    <tr>
        <td>{text}</td>
        <td>{value} {unit}</td>
    </tr>
);

const Statistics = (props) => {
    const {good, neutral, bad} = props.clicks;
    const sum = good + neutral + bad;
    const avg = (good - bad) / sum;
    const positive = good / sum;

    if (sum === 0) {
        return (
            <div>
                <h1>Statistics</h1>
                <p>No feedback given</p>
            </div>
        );
    }

    return (
        <div>
            <h1>Statistics</h1>
            <table>
                <tbody>
                    <StatisticLine text='good' value={good} />
                    <StatisticLine text='neutral' value={neutral} />
                    <StatisticLine text='bad' value={bad} />
                    <StatisticLine text='all' value={sum} />
                    <StatisticLine text='average' value={avg} />
                    <StatisticLine text='positive' value={positive} unit='%' />
                </tbody>
            </table>
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
