module.exports.isLoggedIn = function (req, res, next) {
	console.log('Middleware checking if logged in...');
	// if user is authenticated in the session, carry on 
	if (req.user) { return next(); }

	// if they aren't redirect them to the home page
	console.log('Failed to authenticate.');
	res.sendStatus(401);
}