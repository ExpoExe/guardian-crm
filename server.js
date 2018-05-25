var path = require('path'),
	createError = require('http-errors'),
	express = require('express'),
	session = require('express-session'),
	flash = require('connect-flash'),
	passport = require('passport'),
	bodyParser = require('body-parser'),
	logger = require('morgan'),
	mongoose = require('mongoose'),
	RedisStore = require('connect-redis')(session),
	redis = require('redis').createClient();

require('./strategies/localStrategy')(passport);
var app = express();

// Set up mongoose connection
var db_url = 'mongodb://localhost:27017/crm_dev';
mongoose.connect(db_url).then(console.log('Connected to MongoDB!'));
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// set up routes
var clientsRouter = require('./routes/client');
var staffRouter = require('./routes/staff');
var authRouter = require('./routes/auth');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
	secret: 'yellow!@#$bread', 
	saveUninitialized: false, 
	resave: false,
	cookie: {secure: false},
	store: new RedisStore({ host: 'localhost', port: 6379, client: redis, prefix: 'session:' })
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());
app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/auth', authRouter);
app.use('/client', clientsRouter);
app.use('/staff', staffRouter);

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
