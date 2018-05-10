var Staff = require('../models/staff');
var assert = require('assert');
const { validationResult } = require('express-validator/check');
var bcrypt = require('bcrypt');

module.exports.staffLogin = function(req, res, next) {

	if (req.body.validated){

		Staff.findOne({username: req.body.username}, function(err, staffUserInfo){
			if(err){
				console.log(err);
				res.status(400).send({ok: false});
			} else {
				if (staffUserInfo == null){
					console.log('Account not found!');
					res.status(404).send({ok: false, notFound: true});
				} else {
					console.log('Account found!');
					bcrypt.compare(req.body.password, staffUserInfo.password).then(function(result){
						if (result){
							Staff.findByIdAndUpdate(staffUserInfo._id, { $set: { lastLoggedOn: (new Date) }}, function(err){
								if(err){
									console.log(err);
									res.status(400).send({ok: false});
								} else {
									console.log('Logging in user', staffUserInfo.username);
									console.log(req.session);
									res.status(201).send({ok: true});
								}
							});
						} else {
							res.status(401).send({ok: false, badPassword: true});
						}
					})
					//set req.sessionID to _id
					//store session data in cookie or redis?
					//figure out how to restrict all pages except login

				}
			}
		});


	} else {
		res.status(422).send(req.body.errors);
		console.log('Failed to login because:');
		console.log(req.body.errors);
	}

}

module.exports.registerStaff = function (req, res, next) {

	if (req.session.validated){

		bcrypt.hash(req.body.password, 8).then(function(hash) {
			
			let staff = new Staff({
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				username: req.body.username,
				password: hash,
				email: req.body.email
			});
		
			staff.save(function (err) {
				if (err) {
					//Mongoose validation took place here, checking for duplicate username or email
					res.status(422).send({ok: false, duplicated: true});
					console.log(err);
				} else {
					res.status(201).send({ok: true});
					console.log('Success...added staff ' + req.body.firstName + ' ' + req.body.lastName);
				}
			});

	  	});

	} else {
		res.status(422).send(req.body.errors);
		console.log('Failed to add staff because:');
		console.log(req.body.errors);
	}

};

module.exports.getAllStaff = function (cb) {
	Staff.find({}, function (err, staff) {
		assert.equal(null, err);
		cb(staff);
	});
};

module.exports.updateStaff = function (req, res, next) {
	console.log('Attempting to update staff...');
	if (Object.keys(req.body.updateID).length === 0) {
		console.log('No ID!');
		return;
	}

	let query = { '_id': req.body.updateID };
	let update = {
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