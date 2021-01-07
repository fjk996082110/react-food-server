const CategoryModel = require('../models/CategoryModel')

module.exports = function (router) {
    //添加分类
    router.get('/categoryManage/add',(req,res)=>{
        const {categoryName} = req.body
        CategoryModel.findOne({name:categoryName}).then((category)=>{
            if(category){
                res.send({status:202,data:{msg:'此分类已存在'}})
            }else{
                CategoryModel.create({name:categoryName}).then((newCategory)=>{
                    res.send({status:200,data:{msg:'分类添加成功'}})
                })
            }
        }).catch((err)=>{
            res.send({status:401,data:{msg:`未知错误:${err}`}})
        })
    })
    //查询分类
    router.get('/categoryManage/getAllCategory',(req,res)=>{
        CategoryModel.find({}).then((category)=>{
            res.send({status:200,data:{msg:'success',data:category}})
        }).catch((err)=>{
            res.send({status:401,data:{msg:`未知错误:${err}`}})
        })
    })
    //更新分类
    router.get('/categoryManage/updateCategory',(req,res)=>{
        const {categoryId,categoryName} = req.query
        CategoryModel.findOneAndUpdate({_id:categoryId},{name:categoryName}).then((v)=>{
            res.send({status:200,data:{msg:'更新分类成功'}})
        }).catch((err)=>{
            res.send({status:401,data:{msg:`更新分类 未知错误:${err}`}})
        })
    })
    //根据ID获取分类
    router.get('/categoryManage/getCategoryInfoById',(req,res)=>{
        const {categoryId} = req.query
        CategoryModel.findOne({_id:categoryId}).then((info)=>{
            res.send({status:200,data:{msg:'获取分类成功',categoryInfo:info}})
        }).catch((err)=>{
            res.send({status:401,data:{msg:`未知错误:${err}`}})
        })
    })
}