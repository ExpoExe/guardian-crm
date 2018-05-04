var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClientSchema = new Schema({
	firstName: { type: String, maxLength: 20 },
	lastName: { type: String, maxLength: 20,required: [true, 'Last Name required'] },
	clientAddress: { type: String, maxLength: 50 },
	claimAddress: { type: String, maxLength: 30 },
	city: { type: String, maxLength: 20 },
	zip: { type: String, maxLength: 10 },
	email: { type: String, maxLength: 25 },
	phone: { type: Number, maxLength: 11, required: [true, 'Phone required'] },
	priority: { type: String, default: '!!!' }
});

module.exports = mongoose.model('Client', ClientSchema, 'clients');
