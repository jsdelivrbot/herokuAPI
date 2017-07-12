var express = require('express');
var app = express();
var quotes = require('./public/quotes');
var router = express.Router();
var http = require('http');
var request = require('request');
app.set('port', (process.env.PORT || 5000));

router.options('/*', function(req, res, next){
  res.header("Access-Control-Allow-Origin", "https://s.codepen.io/");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
})

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/quote', function(request, response){
  response.header("Access-Control-Allow-Origin", "https://s.codepen.io")
  response.send(JSON.stringify(quotes));
})

app.get('/weather/:zip', function(req, res ){
  var zip = req.params.zip
  res.header("Access-Control-Allow-Origin", "https://s.codepen.io")
  var city;
  var state;

  var getWeather = function(err, response, body){
      var data = JSON.parse(body);
      res.send(JSON.stringify(data))
      console.log(city, state);
  }

  var getCity = function(err, response, body){
    var data = JSON.parse(body);
    city=data['location']['city'];
    state=data['location']['state'];
console.log(city, state);
  request.get('http://api.wunderground.com/api/b8136ea6269c445c/forecast10day/q/'+state+'/'+city+'.json', getWeather)
  }

  request.get('http://api.wunderground.com/api/b8136ea6269c445c/geolookup/q/'+zip+'.json', getCity);

});;

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

