var express = require("express");
var router = express.Router();
var category = require("../controllers/categoryController");
var item = require("../controllers/itemController");
var multer=require('multer')
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images"); //important this is a direct path fron our current file to storage location
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});
const upload = multer({ storage: fileStorageEngine });
/* GET users listing. */
router.get("/", async (req, res, next) => {
  var result = await category.getAll();
  res.send(result);
});

router.get("/cat/:id", async (req, res, next) => {
  console.log("hello");
  var id = req.params.id;
  console.log(id);
  var result = await category.getById(id);
  res.send(result);
});

router.get("/item", async (req, res, next) => {
  var result = await item.getAll();
  res.send(result);
});

router.get("/itm/:id", async (req, res, next) => {
  console.log("hello");
  var id = req.params.id;
  console.log(id);
  var result = await item.getById(id);
  res.send(result);
});

router.get("/createItem",async function (req, res, next) {
  var result = await category.getAll();
  res.render("create",{
       category:result
  });
});


// Single File Route Handler
router.post("/single", upload.single("image"), (req, res) => {
  console.log(req.file);
  res.send("Single FIle upload success");
});
module.exports = router;
