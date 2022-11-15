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


var fs = require('fs');
var async = require("async");
var Category = require("./models/category");
var Item = require("./models/item");
var express=require("express")
var app=express()
app.use(express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


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
  src,

  cb
) {
  itemDetail = {
    name: name,
    description: description,
    category: category,
    price: price,
   stockQuantity:stockQuantity,
   src:src
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
          "https://th.bing.com/th/id/R.6afc61b50abea45a2e6c68eae2c217ba?rik=L2W0YWncfjZBVA&riu=http%3a%2f%2fwww.shutterstock.com%2fblog%2fwp-content%2fuploads%2fsites%2f5%2f2016%2f03%2ffall-trees-road-1.jpg&ehk=KA%2bzFrmYoWsdK4k7v%2fgfNkd1T2rdnNtpF5ICdLIxAeM%3d&risl=&pid=ImgRaw&r=0",
          callback
        );
      },
     
>>>>>>> 606bdae0089ccd7fb95f3ba23cddf08e35629706
      
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
