import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const StatisticLine = (props) => {
  return (
    <tr><td>{props.text}</td><td>{props.value}</td></tr>
  )
}

const Statistics = (props) => {
  const numberCheck = []
  props.stats.forEach(stat => {
    if (stat.number !== 0 && isNaN(stat.number) !== true) {
      numberCheck.push(stat.number)
    }
  })

  if (numberCheck.length === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }

  return (
    <table>
      <tbody>
        <StatisticLine text={props.stats[0].text} value={props.stats[0].number}/>
        <StatisticLine text={props.stats[1].text} value={props.stats[1].number}/>
        <StatisticLine text={props.stats[2].text} value={props.stats[2].number}/>
        <StatisticLine text={props.stats[3].text} value={props.stats[3].number}/>
        <StatisticLine text={props.stats[4].text} value={props.stats[4].number}/>
        <StatisticLine text={props.stats[5].text} value={props.stats[5].number}/>
      </tbody>
    </table>
  )
} 

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const calcAverage = () => {
    const goodAvg = good
    const badAvg = -Math.abs(bad)  
    const total = good + neutral + bad
    return ((goodAvg + badAvg)/total)
  }

  const calcGoodPer = () => {
    const total = good + neutral + bad
    return((good/total) * 100)
  }  

  const stats = [
    {
    text: 'good',
    number: good
    },
    {
    text: 'neutral',
    number: neutral
    },
    {
    text: 'bad',
    number: bad
    },
    {
    text: 'all',
    number: good + neutral + bad
    },
    {
    text: 'average',
    number: calcAverage()
    },
    {
    text: 'positive',
    number: calcGoodPer() + '%'
    },   
  ]

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <div>
        <h1>statistics</h1>
        <Statistics stats={stats} />
      </div>
    </div>
  )
}

export default App