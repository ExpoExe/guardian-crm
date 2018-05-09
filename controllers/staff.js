var Staff = require('../models/staff');
var assert = require('assert');
const { validationResult } = require('express-validator/check');
var bcrypt = require('bcrypt');

module.exports.getAllStaff = function (cb) {
	Staff.find({}, function (err, staff) {
		assert.equal(null, err);
		cb(staff);
	});
};

module.exports.staffLogin = function(req, res, next) {
	//find correcty here
	/*
	Staff.find({}, function (err, staff) {
		assert.equal(null, err);
		cb(staff);
	});*/
}

module.exports.registerStaff = function (req, res, next) {

	if (req.session.validated){

		bcrypt.hash(req.body.password, 8).then(function(hash) {
			
			var staff = new Staff({
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				username: req.body.username,
				password: hash,
				email: req.body.email
			});
		
			staff.save(function (err) {
				if (err) {
					//Schema validation took place here, checking for duplicate username or email
					res.status(422).send({ok: false, duplicated: true});
					console.log(err);
				} else {
					res.status(201).send({ok: true});
					console.log('Success...added staff ' + req.body.firstName + ' ' + req.body.lastName);
				}
			});

	  	});

	} else {
		res.status(422).send(req.session.errors);
		console.log('Failed to add staff because:');
		console.log(req.session.errors);
	}

};

module.exports.updateStaff = function (req, res, next) {
	console.log('Attempting to update staff...');
	if (Object.keys(req.body.updateID).length === 0) {
		console.log('No ID!');
		return;
	}

	var query = { '_id': req.body.updateID };
	var update = {
		$set: {
			firstName: req.body.updateFirstName,
			lastName: req.body.updateLastName,
			username: req.body.updateUsername,
			password: req.body.updatePassword,
			email: req.body.updateEmail,
			assignedClaims: req.body.updateAssignedClaims,
			lastLoggedOn: Date.now
		}
	};
	Staff.updateOne(query, update, function (err) {
		if (err) {
			return next(err);
		} else {
			console.log('Success...updated staff ' + req.body.updateFirstName + ' ' + req.body.updateLastName);
		}
	});
};

module.exports.deleteStaff = function (req, res, next) {
	console.log('Attempting to delete staff...');
	Staff.findByIdAndRemove(req.body.deleteID, function (err) {
		if (err){
			return next(err);
		}
		else{
			console.log('Success...deleted staff with ID: ' + req.body.deleteID);
			return res;
		}
	});
};