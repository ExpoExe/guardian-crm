var express = require('express');
var controller = require('../controllers/staff');
var validation = require('../validation/staffValidation');
var bruteCheck = require('../helpers/bruteCheck');
var authCheck = require('../helpers/isLoggedIn');
var router = express.Router();

/* Staff Logout */
router.post(
	'/logout',
	authCheck.isLoggedIn,
	controller.staffLogout);

/* Staff Login */
router.post(
	'/login',
	validation.createValidationFor('login'),
	validation.checkValidationResult,
	bruteCheck.globalBruteforce.prevent,
	bruteCheck.userBruteforce.prevent,
	controller.staffLogin);

/* Add a staff */
router.post(
	'/register',
	authCheck.isLoggedIn,
	validation.createValidationFor('register'),
	validation.checkValidationResult,
	controller.registerStaff);

/* Get staff */
router.get('/list', function (req, res) {
	console.log('Getting staff from DB...');
	controller.getAllStaff(function (staff) {
		res.json(staff);
	});
});

/* Update a staff */
router.post('/update', authCheck.isLoggedIn, controller.updateStaff);

/* Delete a staff */
router.post('/delete', authCheck.isLoggedIn, controller.deleteStaff);

module.exports = router;
