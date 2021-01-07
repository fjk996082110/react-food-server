const mongoose = require('mongoose')

const CategorySchema = mongoose.Schema({
    name:String
})

const CategoryModel = mongoose.model('categorys',CategorySchema)

module.exports = CategoryModel