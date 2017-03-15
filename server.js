var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var flash = require('connect-flash');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var logger = require('morgan');

//Connect mongoose to local mongo db
//mongodb://localhost/chipper

//connect to cloud mlab database
mongoose.connect('mongodb://admin:root@ds041526.mlab.com:41526/chipper');
var db = mongoose.connection;

// Initialize App
var app = express();
// Use logger middleware
app.use(logger('dev'));
// Set View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({
  defaultview: 'index'
}));
app.set('view engine', 'handlebars');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'ng_client')));

// Connect Flash
app.use(flash());

// use "routes" file for request of "/"
app.use('/', routes);

// Set Port
app.set('port', (process.env.PORT || 3000));
// Listen on set port
app.listen(app.get('port'), function() {
	//display in terminal
  console.log('Server started on port ' + app.get('port'));
});