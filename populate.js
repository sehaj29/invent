// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require("async");
var Category = require("./models/category");
var Item = require("./models/item");

var mongoose = require("mongoose");
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

var categories = [];
var items = [];

function categoryCreate(name, description, cb) {
  var category = new Category({ name: name, description: description || "" });

  category.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Category: " + category);
    categories.push(category);
    cb(null, category);
  });
}

function itemCreate(
  name,
  description,
  category,
  price,
  stockQuantity,
  cb
) {
  itemDetail = {
    name: name,
    description: description,
    category: category,
    price: price,
   stockQuantity:stockQuantity
  };

  var item = new Item(itemDetail);

  item.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Weapon: " + item);
    items.push(item);
    cb(null, item);
  });
}

function createCategories(cb) {
  async.series(
    [
      function (callback) {
        categoryCreate(
          "Grains and Breads",
          "includes rice,breads and wheat etc",
          callback
        );
      },
    
      
    ],
    // optional callback
    cb
  );
}

function createitems(cb) {
  async.parallel(
    [
      function (callback) {
        itemCreate(
          "Pasta",
          " plain pasta is composed of 62% water, 31% carbohydrates (26% starch), 6% protein, and 1% fat.",
          categories[0],
          60,
          40,
          callback
        );
      },
   
      
    ],
    // optional callback
    cb
  );
}

async.series(
  [ createCategories, createitems],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log("FINAL ERR: " + err);
    } else {
      console.log("Weapons: " + items);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
