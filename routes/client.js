var express = require('express');
var clientsController = require('../controllers/client');
var authCheck = require('../helpers/isLoggedIn');


var router = express.Router();

/* Get clients */
router.get('/list',
authCheck.isLoggedIn,
function (req, res) {
	console.log('Getting clients from DB...');
	clientsController.getAllClients(function (clients) {
		res.json(clients);
	});
});

/* Add a client */
router.post('/create', authCheck.isLoggedIn, clientsController.createClient);

/* Update a client */
router.post('/update', authCheck.isLoggedIn, clientsController.updateClient);

/* Delete a client */
router.post('/delete', authCheck.isLoggedIn, clientsController.deleteClient);


module.exports = router;
