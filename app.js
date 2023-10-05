//current problem: Not able to import export functions to use it on UI
// import {incrementAttempts} from './public/logic.mjs'
const incrementAttempts  = require('./public/logic');


const port = process.env.PORT || 3000;  
const express = require('express');
const app = express();
require('dotenv').config();

const mongoose = require('mongoose');
const {Schema} = mongoose;
mongoose.connect(process.env.DB_URL);  

//HighScore Schema
const HsSchema = new Schema({
    highscore: Number,
    attempts: Number,
});
const HighScorer = mongoose.model('HighScorer',HsSchema);

const newHighScorer = new HighScorer({
    highscore:1000,
    // attempts: incrementAttempts.incrementAttempts(),
    
})

newHighScorer.save();


app.use(express.static('public')) //Middleware to render HTML

app.get('/highscores',(req,res) => {
    res.json('this is highscores')
})

app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
});