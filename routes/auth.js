var express = require('express');
var passport = require('passport');
var router = express.Router();

//CLEANUP this gets checked with every GET request...idk if need
router.get('/', function (req, res) {
	console.log('Checking if user is logged in...');
	if (req.user) {
		console.log('User is logged in!');
		// if user is authenticated in the session, carry on
		res.json({isAuth: true})
	} else {
		res.status(401).json({isAuth: false})
	}

});

module.exports = router;