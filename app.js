var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var session = require('client-sessions');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
var $dir = __dirname.toString();

//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(session({
    cookieName: 'session',
    secret: 'random_string_goes_here',
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

routes(app,$dir);

app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});
