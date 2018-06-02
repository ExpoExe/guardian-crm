var LocalStrategy = require('passport-local').Strategy;
var Staff = require('../models/staff');
var bcrypt = require('bcrypt');

module.exports = function(passport) {

	// these two required for persistent login sessions
	// used to serialize the staff for the session
	passport.serializeUser(function(staff, done) {
		console.log('serializing staff...');
		done(null, staff._id);
	});

	// used to deserialize the staff
	passport.deserializeUser(function(id, done) {
		console.log('deserializing staff', id);
		Staff.findById(id, function(err, staff) {
				done(err, staff);
		});
	});

	passport.use('local', new LocalStrategy(
		function(username, password, done) {

			/* Search DB for user */
			Staff.findOne({username: username}, function(err, staff){
				if(err){
					console.log(err);
					return done(err, false, {status: 400});
				} else {
					if (staff == null){
						/* Username was not found in DB */
						console.log('Account not found!');
						return done(null, false, {status: 404, notFound: true});
					} else {
						/* Username found in DB */
						console.log('Account found!');
						/* Check if password is correct */
						bcrypt.compare(password, staff.password).then(function(result){
							if (result){
								/* Password is correct, update lastLoggedOn */
								Staff.findByIdAndUpdate(staff._id, { $set: { lastLoggedOn: (new Date) }}, function(err){
									if(err){
										console.log(err);
										return done(null, false, {status: 400});
									} else {
										/* DB update successful, finally log in user */
										console.log('Logging in user', username);
										/* Store session data in cookie */
										return done(null, staff, {status: 201});
									}
								});
							} else {
								console.log('Wrong password entered for staff:', username);
								//password was wrong
								return done(null, false, {status: 401, badPassword: true});
							}
						})
					}
				}
			});
		}
	));

}