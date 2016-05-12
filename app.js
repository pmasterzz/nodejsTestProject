var express         = require('express');
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');
var path            = require('path');
var mongoose        = require('mongoose');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bcrypt          = require('bcryptjs');
var cors            = require('cors');

var router        = require('./routes/index.js');
var config        = require('./config.js');   

var app             = express();
var port            = process.env.PORT || 8080; 

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'
 
server.listen(server_port, server_ip_address, function () {
  console.log( "Listening on " + server_ip_address + ", server_port " + port )
});


app.use(morgan('dev')); // log every request to the console
app.use(cookieParser());
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride());
app.use(cors());

// app.use(express.static(path.join(__dirname + '/src')));
// app.use('/bower_components',  express.static( path.join(__dirname + '/bower_components')));
// app.use('/src',  express.static( path.join(__dirname + '/src')));
// console.log('in?');

app.use('/', router);


// var db = mongoose.connection;
// mongoose.connect(config.database);
// db.on('error', console.error);

app.set('superSecret', config.secret)
// app.listen(port);
// console.log('App listening on port:' + port);