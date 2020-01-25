import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({text, handleClick}) => {
    return (
        <button onClick={handleClick}>{text}</button>
    );
};

const Anecdote = ({anecdote, votes}) => {
    return (
        <div>
            <p>{anecdote}</p>
            <p>has {votes} votes</p>
        </div>
    );
};

function argmax(arr) {
    let best = 0;

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > arr[best])
            best = i;
    }

    return best;
}

const App = ({anecdotes}) => {
    const [selected, setSelected] = useState(0);
    const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
    const best = argmax(votes);

    const selectRandom = () => {
        const rand = Math.floor(Math.random() * anecdotes.length);
        return setSelected(rand);
    };
    const vote = () => {
        const newVotes = [...votes];
        newVotes[selected]++;
        setVotes(newVotes);
    };

    return (
        <div>
            <h1>Anecdote of the day</h1>
            <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]} />
            <Button text='vote' handleClick={vote} />
            <Button text='next anecdote' handleClick={selectRandom} />
            <h1>Anecdote with the most votes</h1>
            <Anecdote anecdote={anecdotes[best]} votes={votes[best]} />
        </div>
    );
};

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));
