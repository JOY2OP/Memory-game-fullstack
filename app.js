//current problem: importing exporting modules
// import {incrementAttempts} from './public/logic.mjs'
// const incrementAttempts  = require('./public/logic');
// const gameLogic = require('/public/logic');


const port = process.env.PORT || 3000;  
const express = require('express');
const app = express();
require('dotenv').config();

app.use(express.static('public')) //Middleware to render HTML
app.use(express.json())  //Middleware to handle JSON request bodies

const mongoose = require('mongoose');   //Step-1 for mongoose
const {Schema} = mongoose;              //Step-2 for mongoose
mongoose.connect(process.env.DB_URL,{ useNewUrlParser: true, useUnifiedTopology: true });   //Step-3 for mongoose

//HighScore Schema, step-4 for mongoose 
const HsSchema = new Schema({
    highscore: Number,
    attempts: Number,
});

//Creating a model, step-5 for mongoose 
const HighScorer = mongoose.model('HighScorer',HsSchema);

const newHighScorer = new HighScorer({
    highscore:1000,
    // attempts: incrementAttempts.incrementAttempts(),
    
})
newHighScorer.save();

//Get MongoDB entries
app.get('/highscores',async (req,res)=>{
    const users = await HighScorer.find({}) //
    // const users = await HighScorer.deleteMany({});

     
     if(!users){res.send("No users")}
    //  else{res.send("users available")}
     else{res.json(users)}
   })



app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
});
