var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// configure app for bodyParser()
// let grab data from the body  of post
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Set up part for server to listen on
var port = process.env.PORT || 3000;

// connect to database
mongoose.createConnection('mongodb://localhost:27017/codelong');

// api routes
var router =  express.Router();

// routes will all be preferred with api
app.use('/api',router);

// test route
router.get('/',function(req,res){
  res.json({message: 'welcome to our API'});
});

// fire up server
app.listen(port);

//print friendly message
console.log('Server is listening on port' +port);
