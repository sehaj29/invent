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
      function (callback) {
        categoryCreate("condiments", "includes salt and spcices.", callback);
      },
      function (callback) {
        categoryCreate("oil and fats", "includes cooking oil and butter.", callback);
      },
      function (callback) {
        categoryCreate("Dairy and eggs", "includes milk,eggs and dairy products", callback);
      },
      function (callback) {
        categoryCreate("Produce", "includes fruits,vegetables and onions", callback);
      },
      function (callback) { 
        categoryCreate(
          "Tinned & Dried Produce",
          "includes nuts,pulses and soups.",
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
          "https://th.bing.com/th/id/OIP.d_trzEHrPXB89DnbB13NEgHaJ4?pid=ImgDet&rs=1",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Bread",
          "Bread is a staple food prepared from a dough of flour (usually wheat) and water, usually by baking",
          categories[0],
          45,
          100,
          "https://th.bing.com/th/id/OIP.OBuouQtkb7ZDKn8iDTMOZAHaE8?pid=ImgDet&rs=1",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Rice",
          "Rice is the seed of the grass species Oryza sativa (Asian rice) or less commonly Oryza glaberrima (African rice). The name wild rice is usually used for species of the genera Zizania and Porteresia, both wild and domesticated, although the term may also be used for primitive or uncultivated varieties of Oryza.",
          categories[0],
          105,
          400,
          "https://th.bing.com/th/id/OIP.VbD2xroruCZE1S9C3EGgEQHaD8?pid=ImgDet&rs=1",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "salt",
          "Salt is a mineral composed primarily of sodium chloride (NaCl), a chemical compound belonging to the larger class of salts; salt in the form of a natural crystalline mineral is known as rock salt or halite. Salt is present in vast quantities in seawater.",
          categories[1],
          30,
          800,
          "https://th.bing.com/th/id/OIP.ziaAvwaZb0hNqYC-9qfcqQHaE8?pid=ImgDet&rs=1",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "pepper",
          "Pepper or black pepper is the dried unripe fruit grown in the plant called piper nigrum.",
          categories[1],
          66,
          309,
          "https://th.bing.com/th/id/OIP.gEWn-qwae7hJ1SQarx80KwHaFd?w=264&h=194&c=7&r=0&o=5&pid=1.7",
          callback  
        );
      },
      function (callback) {
        itemCreate(
          "sugar",
          "Sugars are carbohydrates that provide energy for the body. The most common sugar in the body is glucose which your brain, major organs and muscles need to function properly. ",
          categories[1],
          45,
          600,
          "https://th.bing.com/th/id/OIP.owwtBQuiWCM0nsj2pnCG2gHaD8?w=289&h=180&c=7&r=0&o=5&pid=1.7",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Honey",
          "honey, sweet, viscous liquid food, dark golden in colour, produced in the honey sacs of various bees from the nectar of flowers ",
          categories[1],
          65,
          600,
          "https://th.bing.com/th/id/R.ec699049ef6cd9f4b5dd0be134b03a02?rik=gtYYsLkseiK5vw&riu=http%3a%2f%2fimages.unsplash.com%2fphoto-1587049352851-8d4e89133924%3fcrop%3dentropy%26cs%3dtinysrgb%26fit%3dmax%26fm%3djpg%26ixid%3dMnwxMjA3fDB8MXxzZWFyY2h8M3x8amFyJTIwb2YlMjBob25leXx8MHx8fHwxNjIwNjgxMjAx%26ixlib%3drb-1.2.1%26q%3d80%26w%3d1080&ehk=Wee%2bO4QbPHkOPvGc6lFCXzB29zfF0Swcubn86dUdmYg%3d&risl=&pid=ImgRaw&r=0",
          callback
        );
      },
      
      function (callback) {
        itemCreate(
          "cooking oil",
          "Avocado oil Mustard oil Palm oil Peanut oil (marketed as groundnut oil in the UK and India) Rice bran oil Safflower oil Olive oil Semi-refined sesame oil Semi-refined sunflower oil ",
          categories[2],
          156,
          300,
          "https://www.bing.com/th?id=OIP.gVbLGaGKTwUnv1i99J9gXAHaE8&w=306&h=204&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Butter",
          "Butter is a water-in-oil emulsion resulting from an inversion of the cream, where the milk proteins are the emulsifiers ",
          categories[2],
          54,
          300,
          "https://www.bing.com/th?id=OIP.EXM2fxQWTXVPhXA20dBvjgHaE8&w=306&h=204&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Milk",
          "Milk is a white liquid food produced by the mammary glands of mammals. It is the primary source of nutrition for young mammals (including breastfed human infants) before they are able to digest solid food.",
          categories[3],
          29,
          50,
          "https://www.bing.com/th?id=OIP.SFpjSZ6di6kj6PtpBxK1OwHaJt&w=218&h=286&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Eggs",
          "egg, the content of the hard-shelled reproductive body produced by a bird, considered as food.",
          categories[3],
          6,
          500,
          "https://www.bing.com/th?id=OIP.jmbFdkdECpTSMBBUFLmQnwHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "onion",
          "The onion has been grown and selectively bred in cultivation for at least 7,000 years. It is a biennial plant but is usually grown as an annual.",
          categories[4],
          75,
          70,
          "https://www.bing.com/th?id=OIP.nlu81n6rinXkwCxmE3ZsjAHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Garlic",
          "Allium sativum is a perennial flowering plant growing from a bulb. It has a tall, erect flowering stem that grows up to 1 m (3 ft). The leaf blade is flat, linear, solid, and approximately 1.25–2.5 cm (0.5–1.0 in) wide, with an acute apex. ",
          categories[4],
          75,
          70,
          "https://www.bing.com/th?id=OIP.t0XmsK9aekofoY9ZlBsF0gHaFM&w=298&h=209&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "WhiteBeans",
          " White beans are one of the many varieties of common beans domesticated in North and South America. Several types exist, though the most common are cannellini beans",
          categories[5],
          50,
          600,
          "https://www.bing.com/th?id=OIP.8lDYgtWlKesSerz8BCq_XwHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "soup",
          " Alphabet soup, a large number of acronyms used by an administration; the term has its roots in a common tomato-based soup containing pasta shaped in the letters of the alphabetDuck soup, a simple soup, stands for a task ",
          categories[5],
          30,
          600,
          "https://www.bing.com/th?id=OIP.GQWl-ecvybc7kuU0-OQYTgHaNI&w=187&h=332&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Nuts",
          "A nut is a fruit consisting of a hard or tough nutshell protecting a kernel which is usually edible. In general usage and in a culinary sense, a wide variety of dry seeds are called nuts",
          categories[5],
          50,
          600,
          "https://www.bing.com/th?id=OIP.CiDgM821jhSgQ7cFjVpeBQHaFj&w=150&h=106&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2",
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
