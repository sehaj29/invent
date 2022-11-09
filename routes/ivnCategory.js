var express = require('express');
var router = express.Router();
var category=require("../controllers/categoryController")
/* GET users listing. */
router.get('/', async (req, res,next)=> {
    var result= await category.getAll()
   res.send(result);
});

router.get("/cat/:id", async (req, res,next)=> {
    console.log("hello")
    id=req.params.id
    console.log(id)
    var result= await category.getById(id)
    res.send(result);
});

module.exports = router;