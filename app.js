const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const dbURL="mongodb+srv://Seifelewa:s12e12@cluster0.dwyp7.mongodb.net/FullStack-Training?retryWrites=true&w=majority";
const blogRoutes = require('./routes/blogRoutes');

mongoose.connect(dbURL).then((result)=>{
  app.listen(process.env.PORT||3000);
  console.log("Connected successfully")}).catch((err)=>console.log("Connection failed"));
  app.set('view engine','ejs');
  
  app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));

app.get('/',(req,res)=>{
  //res.sendFile('./views/index.html',{root: __dirname});
  const welcome = "Welcome to the Home Page";
  res.render('home', { title: 'Home', welcome });
});
var axios = require("axios").default;

var options = {
  method: 'POST',
  url: 'https://motivational-quotes1.p.rapidapi.com/motivation',
  headers: {
    'content-type': 'application/json',
    'x-rapidapi-host': 'motivational-quotes1.p.rapidapi.com',
    'x-rapidapi-key': 'e0d9a87814mshe24f70de9504f86p1f11a6jsnf1ec13ca765f'
  },
  data: {key1: 'value', key2: 'value'}
};

app.get('/about',(req,res)=>{
  //res.sendFile('./views/about.html',{root: __dirname});
  axios.request(options).then(function (response) {
    res.render('about',{quote:response.data,title: 'About'});
  }).catch(function (error) {
    console.error(error);
  });
});

app.use('/blogs',blogRoutes);

app.use((req,res)=>{
  //res.status(404).sendFile('./views/404.html',{root: __dirname});
  res.status(404).render('404',{title: '404'});
});

//API




//const game = require('./views/about.ejs');
/*var axios = require("axios").default;
var options = {
  method: 'GET',
  url: 'https://cheapshark-game-deals.p.rapidapi.com/games',
  params: {title: "game", exact: '0', limit: '60'},
  headers: {
    'x-rapidapi-host': 'cheapshark-game-deals.p.rapidapi.com',
    'x-rapidapi-key': 'e0d9a87814mshe24f70de9504f86p1f11a6jsnf1ec13ca765f'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});*/