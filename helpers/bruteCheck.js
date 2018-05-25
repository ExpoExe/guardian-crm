var ExpressBrute = require('express-brute');
var RedisStore = require('express-brute-redis');
var moment = require('moment');

var store = new RedisStore({
	host: '127.0.0.1',
	prefix: 'brute:',
	port: 6379
});

var failCallback = function (req, res, next, nextValidRequestDate) {
	let err = "You've made too many failed attempts in a short period of time, please try again " + moment(nextValidRequestDate).fromNow();
	req.body.errors = {tooManyAttempts: err};
	next();
};
var handleStoreError = function (error) {
	log.error(error); // log this error so we can figure out what went wrong
	// cause node to exit, hopefully restarting the process fixes the problem
	throw {
		 message: error.message,
		 parent: error.parent
	};
}
// Start slowing requests after 5 failed attempts to do something for the same user
var userBruteforce = new ExpressBrute(store, {
	freeRetries: 5,
	minWait: 5*60*1000, // 5 minutes
	maxWait: 30*60*1000, // 30 minutes,
	failCallback: failCallback,
	handleStoreError: handleStoreError
});
// No more than 1000 login attempts per day per IP
var globalBruteforce = new ExpressBrute(store, {
	freeRetries: 1000,
	attachResetToRequest: false,
	refreshTimeoutOnRequest: false,
	minWait: 25*60*60*1000, // 1 day 1 hour (should never reach this wait time)
	maxWait: 25*60*60*1000, // 1 day 1 hour (should never reach this wait time)
	lifetime: 24*60*60, // 1 day (seconds not milliseconds)
	failCallback: failCallback,
	handleStoreError: handleStoreError
});

module.exports = {userBruteforce, globalBruteforce};