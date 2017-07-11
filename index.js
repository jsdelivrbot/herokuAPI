var express = require('express');
var app = express();
var quotes = require('./public/quotes');
var router = express.Router();
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
  response.send(JSON.stringify(quotes));
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
