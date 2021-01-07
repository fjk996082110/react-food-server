const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)

const FoodMenuSchema = mongoose.Schema({
  time:{type:String},
  foodList:{type:Array}
})

const FoodMenuModel = mongoose.model('foodMenu',FoodMenuSchema)

module.exports = FoodMenuModel