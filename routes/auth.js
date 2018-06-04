var express = require('express');
var passport = require('passport');
var router = express.Router();

// TODO this gets checked with every GET request...idk if need
router.get('/', function (req, res) {
	console.log('Checking if user is logged in...');
	if (req.user) {
		console.log('User is logged in!');
		let staff = {username: req.user.username,
						lastLoggedOn: req.user.lastLoggedOn,
						id: req.user._id,
						firstName: req.user.firstName,
						lastName: req.user.lastName,
						email: req.user.email,
						employeeType: req.user.employeeType}
		res.json({isAuth: true, staff: staff})
	} else {
		res.status(401).json({isAuth: false, staff: null})
	}

});

module.exports = router;