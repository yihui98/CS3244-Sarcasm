import { models } from '@tensorflow/tfjs-layers';
import { useEffect, useState } from 'react';
import modelService from './services/model'

function App() {
  const [model, setModel] = useState(null)
  const [query, setQuery] = useState("")
  const [result, setResults] = useState(0)
  

  const handleTextChange = (event) =>{
    console.log(event.target.value)
    setQuery(event.target.value)
  }

  const checksentiment = async (event) =>{
    event.preventDefault()
    const results = await modelService.getSentiment(query)
    setResults(results.score)
  }

  return (
    <div>
      <h1> CS3244 Sarcasm Model </h1>

      <h2> Model architecture </h2>
      <p> This model was created by training the data on the Reddit sarcasm dataset </p>
      <p> Try here </p>

      <form onSubmit = {checksentiment}>
        <input value = {query} onChange = {handleTextChange} />
        <button type = 'submit'> Generate sentiment </button>
      </form>
      <div> Score : {result} </div>


    </div>


  );
}

export default App;
