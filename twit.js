
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();


// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// app.use(express.bodyParser);
app.post('/', function(req, res, next){
	var param = {
		q: req.body.word,
		count: 3
	};

	T.get('search/tweets', param, gotData);
	res.redirect('/');
});

var Twit = require('twit');
var tags = [];

var config = require('./config');
var T = new Twit(config);
// console.log(JSON.stringify(T));
function gotData(err, data, response) {
  tags = [];
  try {
  	var tweets = data.statuses;
	  for (var i=0; i<tweets.length; i++) {
	  	tags.push(tweets[i].text);
	  }
	} catch (err) {
		console.log("ERROR");
	}
}
// Set Static Path
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function(req, res){
	res.render('index', {
		tags: tags
	});
});
app.listen(8000);

  
