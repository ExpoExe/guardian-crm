module.exports.isLoggedIn = function (req, res, next) {
	console.log('Middleware checking if logged in...');
	// if user is authenticated in the session, carry on 
	if (req.user) { 
		console.log('Successfully authenticated!');
		return next(); 
	}

	// if they aren't redirect them to the home page
	console.log('Failed to authenticate. Did you include credentials?');
	res.sendStatus(401);
}

module.exports.checkIfAdmin = function (req, res, next) {
	console.log('Checking if '+req.params.username+' is an admin...');
	Staff.find({username: req.params.username}, function (err, staff) {
		if (staff.employeeType === 'admin'){
			return next();
		}
		
		res.status(401).send({'admin': false});
		
	});
}