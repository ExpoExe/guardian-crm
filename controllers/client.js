var Clients = require('../models/client');
var assert = require('assert');

module.exports.getAllClients = function (cb) {
	Clients.find({}, function (err, clients) {
		assert.equal(null, err);
		cb(clients);
	});
};

module.exports.createClient = function (req, res, next) {
	console.log('Attempting to create client...');

	var client = new Clients({
		firstName: req.body.createFirstName,
		lastName: req.body.createLastName,
		clientAddress: req.body.createClientAddr,
		claimAddress: req.body.createClaimAddr,
		city: req.body.createCity,
		zip: req.body.createZip,
		email: req.body.createEmail,
		phone: req.body.createPhone,
		priority: req.body.createPriority
	});

	client.save(function (err) {
		if (err) {
			return next(err);
		} else {
			console.log('Success...added client ' + req.body.createFirstName + ' ' + req.body.createLastName);
		}
	});
};

module.exports.updateClient = function (req, res, next) {
	console.log('Attempting to update client...');
	if (Object.keys(req.body.updateID).length === 0) {
		console.log('No ID!');
		return;
	}

	var query = { '_id': req.body.updateID };
	var update = {
		$set: {
			firstName: req.body.updateFirstName,
			lastName: req.body.updateLastName,
			clientAddress: req.body.updateClientAddr,
			claimAddress: req.body.updateClaimAddr,
			city: req.body.updateCity,
			zip: req.body.updateZip,
			email: req.body.updateEmail,
			phone: req.body.updatePhone,
			priority: req.body.updatePriority
		}
	};
	Clients.updateOne(query, update, function (err) {
		if (err) {
			return next(err);
		} else {
			console.log('Success...updated client ' + req.body.createFirstName + ' ' + req.body.createLastName);
		}
	});
};

module.exports.deleteClient = function (req, res, next) {
	console.log('Attempting to delete client...');
	Clients.findByIdAndRemove(req.body.deleteID, function (err) {
		if (err){
			return next(err);
		}
		else{
			console.log('Success...deleted client with ID: ' + req.body.deleteID);
			return res;
		}
	});
};