const express = require('express');

var postalService = require('./postalService.js');

var app = express();

app.set('port', process.env.PORT || 5000)
  // set up directory for static files or result in a CANNOT get/ error
  // you might have to use npm install express and npm install ejs
.use(express.static(__dirname + '/public'))
  // set where are dynamic views will be stored
.set('views', __dirname + '/views')
  // set default view engine
.set('view engine', 'ejs')
  // call functions when trying to play a game
.get('/getRate', postalService.determinePostage)
  // set default route and content
.get('/', function(req, res) {
	res.sendFile('form.html', {root: __dirname + "/public"});
})
  // run localhost
  .listen(app.get('port'), function() {
  	console.log('Listening on port: ' + app.get('port'));
  });