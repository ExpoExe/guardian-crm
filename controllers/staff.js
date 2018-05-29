var Staff = require('../models/staff');
var assert = require('assert');
var bcrypt = require('bcrypt');
var passport = require('passport');

// TODO implement forgot password thingy	

module.exports.staffLogout = function(req, res, next) {
	console.log('Logging out:', req.user);
	req.logOut(); // this is poop and doesnt work for some reason
	req.session.destroy(function(){ //this logs them out by getting rid of cookie and session in redis, req.user might still be set?
		res.clearCookie('connect.sid');
		res.status(201).send({loggedOut: true});
	}

	);
	console.log('req.user after logOut:', req.user);

}

module.exports.staffLogin = function(req, res, next) {
	//check if passed validation
	if (req.body.validated){
		//check if express-brute stopped someone
		if (req.body.errors.tooManyAttempts){
			console.log(req.body.errors);
			res.status(429).send(req.body.errors);
		} else {
			//use passport to login
			passport.authenticate('local', function(err, user, info) {

				if (!user){
					console.log(info);
					res.status(info.status).send(info);
				}
				//log in staff by setting req.user
				req.logIn(user.id, function(err) {
					if (err) { console.log('Passport.js login failed:', err); return next(err); }
					console.log('Storing serialized staff in session:', req.session.passport.user);
					res.status(info.status).send(info);
				});
		  
			})(req, res, next);
		}

	} else {
		//validation failed so send errors to React
		res.status(422).send(req.body.errors);
		console.log('Failed to login because:');
		console.log(req.body.errors);
	}

}

module.exports.registerStaff = function (req, res, next) {

	//check if passed validation
	if (req.session.validated){

		//bcrypt the password so we dont know what it is
		bcrypt.hash(req.body.password, 8).then(function(hash) {
			
			let staff = new Staff({
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				username: req.body.username,
				password: hash,
				email: req.body.email
			});
		
			//save Staff with fancy password
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
		//validation failed so send errors to React
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
			assignedClaims: req.body.updateAssignedClaims
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