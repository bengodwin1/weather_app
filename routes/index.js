var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');
var request = require('request');

var url = 'mongodb://localhost:27017/test'

// function setWeatherIcon(str) {
//   if (str) {
//     var conditions = str;
//   } else {
//     document.getElementById("outer").className = "default";
//   };
// };

/* GET home page. */
router.get('/', function(req, res, next) {
  var address = "Media, PA" ;
  var lat = "";
  var lng = "";
  var fullAddress = "";
  var reqStr =
    "https://maps.googleapis.com/maps/api/geocode/json?address=" +
    address +
    "&key=AIzaSyCuuDBglzNoBjwWhYtjgH6ZSXmASmkAvww";
  request(reqStr, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      var parsedData = JSON.parse(body);
      if (parsedData["status"] == "ZERO_RESULTS") {
        res.render("error", {message: "ERROR: Location not found. Please try again"});
        return;
      } else {
        fullAddress = parsedData.results[0].formatted_address;
        var s = fullAddress;
        var k = s.indexOf(" ", s.indexOf(" ") + 1);
        if (k !== -1) {
          var result = s.slice(0, k);
          if (result.charAt(result.length - 1) === ",") {
            result = result.slice(0, result.length - 1);
          }
          fullAddress = result;
        }
        lat = parsedData.results[0].geometry.location.lat;
        lng = parsedData.results[0].geometry.location.lng;
        var forecastReqStr =
          "https://api.darksky.net/forecast/03cd6865c06f71f9b7f362c1d7b93660/" +
          lat +
          "," +
          lng;
        request(forecastReqStr, function(error, response, body) {
          if (!error && response.statusCode == 200) {
            var parsedData = JSON.parse(body);
            var temperature = parsedData["currently"]["temperature"];
            var current = parsedData["currently"]["summary"];
            var forecast = parsedData["hourly"]["summary"];
            var wind = parsedData["currently"]["windSpeed"];
            var gusts = parsedData["currently"]["windGust"];
            var highTemp = parsedData["daily"]["data"][0]["temperatureHigh"];
            var lowTemp = parsedData["daily"]["data"][0]["temperatureLow"];
            var icon = parsedData["currently"]["icon"];
            console.log("*********************");
            console.log("icon: " + parsedData["currently"]["icon"]);
            res.render("index", {
              title: "Ben's Weather App",
              location: fullAddress,
              temp: temperature,
              location: fullAddress,
              current: current,
              forecast: forecast,
              wind: wind,
              gusts: gusts,
              high: highTemp,
              low: lowTemp,
              icon: icon
            });
          } else {
            res.render("error");
          }
        });
      }
    } else {
    }
  });
});

router.post("/weather", function(req, res) {
  address = req.body.address;
  var lat = "";
  var lng = "";
  var fullAddress = "";
  var reqStr =
    "https://maps.googleapis.com/maps/api/geocode/json?address=" +
    address +
    "&key=AIzaSyCuuDBglzNoBjwWhYtjgH6ZSXmASmkAvww";
  request(reqStr, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      var parsedData = JSON.parse(body);
      if (parsedData["status"] == "ZERO_RESULTS") {
        res.render("error", {message: "ERROR: Location not found. Please try again"});
        return;
      } else {
        fullAddress = parsedData.results[0].formatted_address;
        var s = fullAddress;
        var k = s.indexOf(" ", s.indexOf(",") + 2);
        console.log(k);
        if (k !== -1) {
          var result = s.slice(0, k);
          if (result.charAt(result.length - 1) === ",") {
            result = result.slice(0, result.length - 1);
          }
          fullAddress = result;
        }
        lat = parsedData.results[0].geometry.location.lat;
        lng = parsedData.results[0].geometry.location.lng;
        var forecastReqStr =
          "https://api.darksky.net/forecast/03cd6865c06f71f9b7f362c1d7b93660/" +
          lat +
          "," +
          lng;
        request(forecastReqStr, function(error, response, body) {
          if (!error && response.statusCode == 200) {
            var parsedData = JSON.parse(body);
            var temperature = parsedData["currently"]["temperature"];
            var current = parsedData["currently"]["summary"];
            var forecast = parsedData["hourly"]["summary"];
            var wind = parsedData["currently"]["windSpeed"];
            var gusts = parsedData["currently"]["windGust"];
            var highTemp = parsedData["daily"]["data"][0]["temperatureHigh"];
            var lowTemp = parsedData["daily"]["data"][0]["temperatureLow"];
            var icon = parsedData["currently"]["icon"];
            console.log("*********************");
            console.log("icon: " + parsedData["currently"]["icon"]);
            res.render("index", {
              title: "Ben's Weather App",
              location: fullAddress,
              temp: temperature,
              location: fullAddress,
              current: current,
              forecast: forecast,
              wind: wind,
              gusts: gusts,
              high: highTemp,
              low: lowTemp,
              icon: icon
            });
          } else {
            res.render("error");
          }
        });
      }
    } else {
    }
  });
});


module.exports = router;

// &apikey=thewdb