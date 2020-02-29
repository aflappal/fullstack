const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

export const voteAction = id => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const addAction = anecdote => {
  return {
    type: 'ADD',
    data: { anecdote }
  }
}

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  let newState
  const byDecreasingVotes = (a, b) => b.votes - a.votes

  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      const oldAnecdote = state.find(a => a.id === id)
      const newAnecdote = { ...oldAnecdote, votes: oldAnecdote.votes + 1}
      newState = state.map(a => a.id !== id ? a : newAnecdote)
      break
    case 'ADD':
      newState = state.concat(asObject(action.data.anecdote))
      break
    default:
      return state
  }

  newState.sort(byDecreasingVotes)
  return newState
}

export default reducer
