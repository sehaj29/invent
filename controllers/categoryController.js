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
        var result=[]
        item.find().then((data)=>{
            for(var i=0;i<data.length;i++){
               
                if(data[i].category==id){
                    result.push(data[i])
                }
            }
            console.log(result)
            resolve(result)
        })
        
        
           
        
    })
    
        
        }