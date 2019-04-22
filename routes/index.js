var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');
var request = require('request');

var url = 'mongodb://localhost:27017/test'

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: "Ben's Weather App" });
});

router.get('/current-temp', function(req, res, next) {
  request("https://api.darksky.net/forecast/03cd6865c06f71f9b7f362c1d7b93660/39.9168,-75.3877/?exclude=[minutely,hourly,daily]", function(error, response, body) {
      if (!error && response.statusCode == 200) {
        var parsedData = JSON.parse(body);
        var temperature = parsedData["currently"]["temperature"];
        console.log(temperature);
        res.render('current-temp', { title: "Ben's Weather App", temp: temperature });
      } else {
        console.log("error");
        res.render('error');
      }
    });
});



module.exports = router;

// &apikey=thewdb