var express = require('express');
var controller = require('../controllers/staff');
var validation = require('../validation/staffValidation');
var router = express.Router();

/* Staff Login */
router.post(
	'/login',
	validation.createValidationFor('login'),
	validation.checkValidationResult,
	controller.staffLogin);

/* Add a staff */
router.post(
	'/register',
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
router.post('/update', controller.updateStaff);

/* Delete a staff */
router.post('/delete', controller.deleteStaff);

module.exports = router;
