var Staff = require('../models/staff');
var assert = require('assert');
var bcrypt = require('bcrypt');
var passport = require('passport');

// TODO implement forgot password thingy	
// TODO touch cookie to not expire every day

module.exports.staffChangePassword = function (req, res, next) {
	console.log('Attempting to update staff password...');
	//check if passed validation
	if (req.body.validated){

		/* Check if password is correct */
		bcrypt.compare(req.body.currentPassword, req.user.password).then(function(result){
			if (result){
				//bcrypt the password so we dont know what it is
				bcrypt.hash(req.body.newPassword, 12).then(function(hash) {
					Staff.updateOne({ 'username': req.user.username }, { $set: { password: hash } }, function (err) {
						if (err) {
							res.status(400).send({ok: false, badPassword: null});
						} else {
							console.log('Success...updated staff password for user', req.user.username);
							res.status(201).send({ok: true, badPassword: false});
						}
					});
				});

			} else {
				console.log(req.user);
				console.log('Wrong password entered for staff:', req.user.username);
				//password was wrong
				res.status(401).send({ok: false, badPassword: true});
			}
		});

	} else {
		//validation failed so send errors to React
		res.status(422).send(req.body.errors);
		console.log('Failed to update password because:');
		console.log(req.body.errors);
	}
};

module.exports.staffLogout = function(req, res, next) {
	console.log('Logging out:', req.user);
	req.logOut(); // this is poop and doesnt work for some reason
	req.session.destroy(function(){ //this logs them out by getting rid of cookie and session in redis, req.user might still be set?
		res.clearCookie('connect.sid');
		res.status(201).send({loggedOut: true});
	}
	);
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
				req.logIn(user, function(err) {
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
// TODO I should generate a random password then email it to user
// because the staff member will not be the one creating the account/setting password they want
	//check if passed validation
	if (req.body.validated){

		//bcrypt the password so we dont know what it is
		bcrypt.hash(req.body.password, 12).then(function(hash) {
			
			let staff = new Staff({
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				username: req.body.username,
				password: hash,
				email: req.body.email,
				employeeType: req.body.employeeType
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

module.exports.getOneStaff = function (req, res, next) {
	console.log('Getting one staff with params as:', req.params);
	Staff.find({username: req.params.username}, function (err, staff) {
		if (staff){
			res.status(201).send(staff);
		} else {
			return next(err);
		}
	});
};

module.exports.updateStaff = function (req, res, next) {
	// TODO check if admin to determine what data to save
	console.log('Attempting to update staff...');
	if (Object.keys(req.body.updateID).length === 0) {
		console.log('No ID!');
		return;
	}

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
	Staff.updateOne({ '_id': req.body.updateID }, update, function (err) {
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
		} else {
			console.log('Success...deleted staff with ID: ' + req.body.deleteID);
			return res;
		}
	});
};