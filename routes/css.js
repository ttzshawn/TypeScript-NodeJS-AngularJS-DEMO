var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('css-animate', {
		title: 'The Timeless Zone'
	});
});

module.exports = router;