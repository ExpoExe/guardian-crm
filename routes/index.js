var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	console.log('Tried for index.');
});

module.exports = router;
