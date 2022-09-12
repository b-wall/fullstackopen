import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const App = () => {
  const anecdotes = [{
    quote: 'If it hurts, do it more often.',
    votes: 0
  },
  {
    quote: 'Adding manpower to a late software project makes it later!',
    votes: 0
  },
  {
    quote: 'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    votes: 0
  },
  {
    quote: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    votes: 0
  },
  {
    quote: 'Premature optimization is the root of all evil.',
    votes: 0
  },
  {
    quote: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    votes: 0
  },
  {
    quote: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    votes: 0
  }
  ]
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  const randomAnecdote = () => {
    setSelected(Math.floor(getRandomArbitrary(0, anecdotes.length)))
  }

  const vote = () => {
    const copy = [ ...votes ]
    // increment current vote by one
    copy[selected] += 1
    setVotes(copy)
  }

  const maxVotesIndex = votes.indexOf(Math.max(...votes))
  const maxVoteQuote = anecdotes[maxVotesIndex].quote 

  return (
    <div>
      <h1>Anecode of the day</h1>
      <p>{anecdotes[selected].quote}</p> 
      <p>has {votes[selected]} votes</p>
      <div>
        <Button handleClick={() => vote()} text="vote"/>
        <Button handleClick={() => randomAnecdote()} text="next anecdote"/>
      </div>
      <h1>Anecdote with most votes</h1>
      <p>{maxVoteQuote}</p>
    </div>
  )
}

export default App