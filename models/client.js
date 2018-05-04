var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//TODO Update model+controller
var ClientSchema = new Schema({
	firstName: { type: String, maxLength: 18 },
	lastName: { type: String, maxLength: 18 },
	popularity: Number,
	age: { type: Number, min: 1, max: 99, required: [true, 'Do not be shy!'] }
});

module.exports = mongoose.model('Client', ClientSchema, 'clients');
