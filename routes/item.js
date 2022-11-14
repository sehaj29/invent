var express = require('express');
var router = express.Router();
<<<<<<< HEAD

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
=======
var item=require("../controllers/itemController")
/* GET users listing. */
router.get('/item', async (req, res,next)=> {
    var result= await item.getAll()
   res.send(result);
});

router.get("/itm/:id", async (req, res,next)=> {
    console.log("hello")
    var id=req.params.id
    console.log(id)
    var result= await item.getById(id)
    res.send(result);
>>>>>>> 4b4a76b1b1506554910c9577bd55f26900852570
});

module.exports = router;