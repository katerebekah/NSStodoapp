var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
  	title: "Kate's Awesome Page",
  	header: "The Most Wonderful Page",
  	description: "the page dedicated to javascript templating"
   });
});

module.exports = router;
