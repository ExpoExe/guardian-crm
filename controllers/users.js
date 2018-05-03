var Users = require('../models/users');
var assert = require('assert');

module.exports.getAllUsers = function (cb) {
	Users.find({}, function (err, users) {
		assert.equal(null, err);
		cb(users);
	});
};

module.exports.createUser = function (req, res, next) {
	console.log('Attempting to create user...');

	var user = new Users({
		firstName: req.body.createFirstName,
		lastName: req.body.createLastName,
		popularity: req.body.createPopularity,
		age: req.body.createAge
	});

	user.save(function (err) {
		if (err) {
			return next(err);
		} else {
			console.log('Success...added user ' + req.body.firstName + ' ' + req.body.lastName);
		}
	});
};

module.exports.updateUser = function (req, res, next) {
	console.log('Attempting to update user...');
	if (Object.keys(req.body.updateID).length === 0) {
		console.log('No ID!');
		return;
	}

	var query = { '_id': req.body.updateID };
	var update = {
		$set: {
			firstName: req.body.updateFirstName,
			lastName: req.body.updateLastName,
			popularity: req.body.updatePopularity,
			age: req.body.updateAge
		}
	};
	Users.updateOne(query, update, function (err) {
		if (err) {
			return next(err);
		} else {
			console.log('Success...updated user.');
		}
	});
};

module.exports.deleteUser = function (req, res, next) {
	console.log('Attempting to delete user...');
	Users.findByIdAndRemove(req.body.deleteID, function (err) {
		if (err){
			return next(err);
		}
		else{
			console.log('Success...deleted user with ID: ' + req.body.deleteID);
			return res;
		}
	});
};