const http = require('http')
const express = require('express')
const cors = require('cors')

const tf = require("@tensorflow/tfjs");
const tfn = require("@tensorflow/tfjs-node");
const fs = require('fs');
require('dotenv').config()
//import {OOV_INDEX, padSequences} from './utilsutils';
const app = express()


app.use(express.static('build'))
app.use(cors())
app.use(express.json())

async function loadModel(){
    try{
        const handler = tfn.io.fileSystem('./model/model.json');
        const model = await tf.loadLayersModel(handler);
        //console.log('Model loaded')
        //console.log(model.summary())
        return model
    } catch (err){
        console.log(err)
        console.log("failed")
    }
}

function tokenizeSentence(sentence){
  let tokenSentence = []
  for (var i = 0; i < sentence.length; i++){
    if (sentence[i].toLowerCase() in word2index){
      tokenSentence.push(word2index[sentence[i].toLowerCase()])
  }
}
  //console.log(tokenSentence);
  return tokenSentence
}

function padSequence(seq, maxLen = 50, value = 0) { //padding = 'post', truncating = 'pre'
  if (seq.length > maxLen){
    seq.splice(0, seq.length - maxLen);
  } else if (seq.length < maxLen){
    const pad = [];
    for (let i = 0; i < maxLen - seq.length; ++i) {
      pad.push(value);
    }
    seq = seq.concat(pad);
  }
  return seq
  }

let rawdata = fs.readFileSync('./model/word2index.json')
let word2index = JSON.parse(rawdata)
//console.log(typeof(word2index))

app.get('/model/:query', async (request, response) => {
  const model = await loadModel();
  const text = request.params.query;
  const inputText = text.trim().toLowerCase().replace(/(\.|\,|\!)/g, '').split(' ');
  //console.log(inputText);
  const tokenizedSentence = tokenizeSentence(inputText);
  paddedSequence = padSequence(Array.from(tokenizedSentence))
  //console.log(paddedSequence)
  const input = tf.tensor2d(paddedSequence, [1,50]);
  //console.log(input)
  const prediction = model.predict(input)
  const score = prediction.dataSync()[0]
  //console.log(prediction.dataSync()[0])
  response.json({score : score})
})


const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)