var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Vehicle = require('./app/models/vehicle');

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

//Middleware
// Middleware can be very useful for validation. we can log things from here or stop
// the request from continuning in the event that the request is not safe
// Middleware to use for all request
router.use(function(req,res,next){
  console.log('FYI..... There is same processing currently going on');
  next();
});

// test route
router.get('/',function(req,res){
  res.json({message: 'welcome to our API'});
});


router.route('/vehicles')
      .post(function(req,res){
      var vehicle = new vehicle(); // new instance od a vehicle
      vehicle.make = req.body.make;
      vehicle.make = req.body.make;
      vehicle.make = req.body.color;

      vehicle.save(function(err){
        if(err){
          res.send(err);
        }
        res.json({message: "Vehicle was sucessfully manufactured "});
      });
      })

        .get(function(req,res){
          Vehicle.find(function(err,vehicles){
            if(err){
              res.send(err)
            }
            res.json(vehicles);
          });
        });

        router.route('/vehicle/:vehicle_id')
              .get(function(req,res){
                Vehicle.findById(req.params.vehicle_id,function(err, vehicle){
                  if(err){
                    res.send(err);
                  }
                  res.json(vehicles);
                });
              });

        router.route('/vehicle/make/:make')
            .get(function(req,res){
              Vehicle.find({make:req.params.make}, function(err, vehicle){
                if(err){
                  res.send(err);
                }
                  res.json(vehicle);
              });
            });

         router.route('/vehicle/color/:color')
            .get(function(req,res){
              Vehicle.find({color:req.params.color}, function(err, vehicle){
                if(err){
                  res.send(err)
                }
                res.json(vehicle);
              });
            });

// fire up server
app.listen(port);

//print friendly message
console.log('Server is listening on port' +port);
