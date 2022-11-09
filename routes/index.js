var express = require('express');
const category = require('../models/category');
var router = express.Router();
var item=require('../models/item')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect("/ivnCategory")
  
});
 
module.exports = router;
