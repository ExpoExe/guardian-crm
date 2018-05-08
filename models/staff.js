var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StaffSchema = new Schema({
	firstName: { type: String, maxLength: 20 },
	lastName: { type: String, maxLength: 20 },
	username: { type: String, maxLength: 20 },
	password: { type: String, maxLength: 60 },
	email: { type: String, maxLength: 50 },
	assignedClaims: [],
	lastLoggedOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Staff', StaffSchema, 'staff');
