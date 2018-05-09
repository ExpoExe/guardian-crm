var express = require('express');
var staffController = require('../controllers/staff');
const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');
var router = express.Router();

/* Staff Login */
router.post(
	'/login',
	createValidationFor('login'),
	checkValidationResult,
	staffController.staffLogin);

/* Add a staff */
router.post(
	'/register',
	createValidationFor('register'),
	checkValidationResult,
	staffController.registerStaff);

/* Get staff */
router.get('/list', function (req, res) {
	console.log('Getting staff from DB...');
	staffController.getAllStaff(function (staff) {
		res.json(staff);
	});
});

/* Update a staff */
router.post('/update', staffController.updateStaff);

/* Delete a staff */
router.post('/delete', staffController.deleteStaff);

function createValidationFor(form) {
	switch (form) {
		 case 'register':
			  return [
				sanitize(['firstName', 'lastName', 'username'])
					.trim()
					.blacklist('\\\/\[\]<>:;\'\"'),
				check(['firstName', 'lastName'])
					.exists().withMessage('First and last name required.')
					.isAlpha().withMessage('First and last name must be letters only.')
					.isLength({ max: 20 }).withMessage('First and last name can only be 20 characters long.'),
				check('username')
					.exists().withMessage('Username required.')
					.isAlphanumeric().withMessage('Username must be alphanumeric.')
					.isLength({ max: 20 }).withMessage('Username can only be 20 characters long.'),
				check('email')
					.exists().withMessage('Email required.')
					.isEmail().withMessage('Must be a valid email.')
					.normalizeEmail()
					.isLength({ max: 50 }).withMessage('Email can only be 50 characters long.'),
				check('password')
					.exists().withMessage('Password required.')
					.isLength({ min: 6, max: 40 }).withMessage('Password must be betweeen 6 and 40 characters long.')
					.matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{6,}$/, "i").withMessage('Password must include one lowercase character, one uppercase character, a number, and a special character.'),
				check('confirmPassword', 'Password fields must match.')
					.exists()
					.custom((value, { req }) => value === req.body.password).withMessage('Passwords must match.')
			  ];

		case 'login':
			  return [
				sanitize(['username', 'lastName', 'username'])
					.trim(),
				check('username')
					.exists().withMessage('Username required.')
					.isAlphanumeric().withMessage('Username must be alphanumeric.')
					.isLength({ max: 20 }).withMessage('Username can only be 20 characters long.'),
				check('password')
					.exists().withMessage('Password required.')
					.isLength({ min: 6, max: 40 }).withMessage('Password must be betweeen 6 and 40 characters long.')
			  ];

		 default:
			  return [];
	}
}

function checkValidationResult(req, res, next) {

	//dont really need formatter here because the data is nice with result.mapped(), but for future use
	const errorFormatter = ({ location, msg, param }) => {
		return `${msg}`;
	 };
	 const result = validationResult(req).formatWith(errorFormatter);
	 if (!result.isEmpty()) {
		req.session.errors = result.mapped();
		req.session.validated = false;
		return next();
	 } else {
		req.session.validated = true;
		return next();
	 }

}

module.exports = router;
