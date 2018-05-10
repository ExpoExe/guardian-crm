var mongoose = require('mongoose');
var uniqueMongooseValidator = require('mongoose-unique-validator');
var timestampUpdater = require('../helpers/timestampUpdater');
var Schema = mongoose.Schema;

var StaffSchema = new Schema({
	firstName: { type: String, maxLength: 20 },
	lastName: { type: String, maxLength: 20 },
	username: { type: String, maxLength: 20, unique: true },
	password: { type: String, maxLength: 60 },
	email: { type: String, maxLength: 50, unique: true },
	assignedClaims: [],
	lastLoggedOn: { type: Date, default: null }
}, {timestamps: true});

StaffSchema.plugin(uniqueMongooseValidator);
StaffSchema.plugin(timestampUpdater);

module.exports = mongoose.model('Staff', StaffSchema, 'staff');