const Category = require("../models/category")
const item = require("../models/item")


exports.getAll = function () {
    return new Promise((resolve) => {

        item.find().then((data) => {
            console.log(data)
            resolve(data)
        }).catch((error) => {
            resolve("error")
        })
    })

    
    }
exports.getById = function (id) {
    return new Promise((resolve) => {
    
        item.findById(id).then((data) => {
            console.log(data)
            resolve(data)
        }).catch((error) => {
            resolve("error")
        })
    })
    
        
}
