const MenuModel = require('../models/MenuModel')

module.exports = function (router) {
    router.get('/getMenuByid',(req,res)=>{
        const id = req.query.id
        MenuModel.findOne({id:id}).then((v)=>{
            if(v){
                res.send({status:200,data:{msg:'success',data:v}})
            }
        })
    })

    router.get('/getMenu',(req,res)=>{
        MenuModel.find({}).then((v)=>{
            if(v){
                res.send({status:200,data:{msg:'success',data:v}})
            }else{
                res.send({status:405,data:{msg:'fail to find'}})
            }
        })
    })
}