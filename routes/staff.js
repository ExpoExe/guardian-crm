var express = require('express');
var controller = require('../controllers/staff');
var validation = require('../validation/staffValidation');
var bruteCheck = require('../helpers/bruteCheck');
var authCheck = require('../helpers/authCheck');
var router = express.Router();

/* Change Staff Password */
router.post(
	'/changepass',
	authCheck.isLoggedIn,
	validation.createValidationFor('changepass'),
	validation.checkValidationResult,
	controller.staffChangePassword);
	//controller.staffLogout);

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

/* Get all staff */
router.get('/list', function (req, res) {
	console.log('Getting all staff from DB...');
	controller.getAllStaff(function (staff) {
		res.json(staff);
	});
});

/* Get one staff */
router.get('/:username', controller.getOneStaff);

/* Update a staff */
router.post('/update', authCheck.isLoggedIn, controller.updateStaff);

/* Update a staff as admin */
router.post('/admin/update', authCheck.isLoggedIn, authCheck.checkIfAdmin, controller.updateStaff);

/* Delete a staff */
router.post('/admin/delete', authCheck.isLoggedIn, authCheck.checkIfAdmin, controller.deleteStaff);

module.exports = router;
