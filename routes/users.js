var express = require('express');
var usersController = require('../controllers/users');

var router = express.Router();

/* Get users */
router.get('/', function (req, res) {
	console.log('Getting users from DB...');
	usersController.getAllUsers(function (users) {
		res.json(users);
	});
});

/* Add a user */
router.post('/create', usersController.createUser);

/* Update a user */
router.post('/update', usersController.updateUser);

/* Delete a user */
router.post('/delete', usersController.deleteUser);


module.exports = router;
