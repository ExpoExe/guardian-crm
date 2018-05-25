var express = require('express');
var passport = require('passport');
var router = express.Router();

router.get('/', function (req, res) {
	console.log('Checking if user is logged in...');
	console.log('req.user = ', req.user);
	if (req.user) {
		// if user is authenticated in the session, carry on
		res.json({isAuth: true})
	} else {
		res.status(401).json({isAuth: false})
	}

});

module.exports = router;