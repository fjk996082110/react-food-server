const mongoose = require('mongoose')

const MenuSchema = mongoose.Schema({
    id:{type:String},
    isShow:{type:String,required:true},
    name:{type:String,required:true}
})

const MenuModel = mongoose.model('menus',MenuSchema)

module.exports = MenuModel