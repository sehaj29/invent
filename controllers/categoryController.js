const Category = require("../models/category")
const item = require("../models/item")
exports.getAll = function () {
    return new Promise((resolve) => {

        Category.find().then((data) => {
            console.log(data)
            resolve(data)
        }).catch((error) => {
            resolve("error")
        })
    })

    
    }
exports.getById = function (id) {
    return new Promise((resolve) => {
    
        item.findById({categories:id}).then((data) => {
            console.log(data)
            resolve(data)
        }).catch((error) => {
            resolve("error")
        })
    })
    
        
        }