const ProductModel = require('../models/ProductModel')
const FoodMenuModel = require('../models/FoodMenuModel')

module.exports = function(router){
  //增加
  router.post('/foodMenu/addFoodToMenu',(req,res) => {
    const {foodList} = req.body
    const foodID = foodList.foodList[0]
    FoodMenuModel.findOne({time:foodList.time}).then((t) => {
      if(t){
        let foodListArr = t.foodList
        if(foodListArr.includes(foodID)){
          res.send({status:203,data:{msg:'该菜品已经存在，不能重复添加',data:null}})
        }else{
          foodListArr.push(foodID)
          FoodMenuModel.findOneAndUpdate({time:foodList.time},{foodList:foodListArr}).then((u) => {
            res.send({status:200,data:{msg:'添加成功',data:u}})
          }).catch((err) => {
            res.send({status:204,data:{msg:'添加失败'}})
          })
        }
      }else{
        FoodMenuModel.create(foodList).then((s) => {
          res.send({status:200,data:{msg:'增加成功',data:s}})
          return
        }).catch((err) => {
          res.send({status:204,data:{msg:'新增失败',errData:err}})
          return
        })
      }
    })
  })
  //查询
  router.get('/foodMenu/getFoodList',(req,res) => {
    const {foodMenuTime} = req.query
    FoodMenuModel.findOne({time:foodMenuTime}).then((v) => {
      if(v){
        ProductModel.find({_id:{$in:v.foodList}}).then((t) => {
          res.send({status:200,data:{foodList:t}})
        })
      }else{
        res.send({status:200,data:{foodList:null}})
      }
    })
  })
  //删除
  router.post('/foodMenu/deleteFood',(req,res) => {
    const {foodID,time} = req.body
    FoodMenuModel.find({time:time}).then((t) => {
      if(t){
        const {foodList} = t[0]
        const foodIndex = foodList.includes(foodID)
        if(foodIndex != -1){
          foodList.splice(foodIndex,1)
          FoodMenuModel.findOneAndUpdate({time:time},{foodList:foodList}).then((f) => {
            ProductModel.find({_id:{$in:f.foodList}}).then((t) => {
              res.send({status:200,data:{msg:'删除成功',data:t}})
            })
          })
        }
      }
    })
  })
}