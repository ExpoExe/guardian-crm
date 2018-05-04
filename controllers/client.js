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
		popularity: req.body.createPopularity,
		age: req.body.createAge
	});

	client.save(function (err) {
		if (err) {
			return next(err);
		} else {
			console.log('Success...added client ' + req.body.firstName + ' ' + req.body.lastName);
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
			popularity: req.body.updatePopularity,
			age: req.body.updateAge
		}
	};
	Clients.updateOne(query, update, function (err) {
		if (err) {
			return next(err);
		} else {
			console.log('Success...updated client.');
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