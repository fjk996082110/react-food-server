const ProductModel = require('../models/ProductModel')
const UserModel = require('../models/UserModel')
const jwt = require('jsonwebtoken')
const {PRIVATE_KEY} = require('../config')
const {pageFilter} = require('../utils')

function checkToken(token){
    jwt.verify(token,PRIVATE_KEY,(err,decode)=>{
        if (err){
            return {status:501,data:{msg:'验证token失败'}}
            //res.send({status:501,data:{msg:'验证token失败'}})
        }else{
            UserModel.findOne({_id:decode.id}).then((v)=>{
                if(v){
                    return {status: 200,data: {msg:'验证通过',tokenInfo:decode}}
                }else{
                    return {status: 202,data: {msg:'验证不通过'}}
                }
            }).catch((err)=>{
                return {status:401,data:{msg:'token匹配失败',err}}
            })

        }
    })
}

module.exports = function (router) {
    //增加商品
    router.post('/productManage/add',(req,res)=>{
        const {productInfo} = req.body
        ProductModel.findOne({name:productInfo.name}).then((v)=>{
            if(v){
                res.send({status:200,data:{msg:'添加失败，该商品已经存在'}})
            }else{
                ProductModel.create(productInfo).then((v1)=>{
                    res.send({status:200,data:{msg:'增加成功',data:{productInfo:v1}}})
                }).catch((err)=>{
                    res.send({status:401,data:{msg:`未知错误:${err}`}})
                })
            }
        })
    })
    //查询
    router.get('/productManage/getProductAll',(req,res) => {
			ProductModel.find({}).then((products) => {
				res.send({status:200,data:products})
			}).catch((err) => {
				res.send({status:201,data:{msg:'获取失败'}})
			})
		})
    //获取产品分页列表
    router.get('/manage/product/list', (req, res) => {
			const {pageNum, pageSize} = req.query
			ProductModel.find({}).then(products => {
				res.send({status: 0, data: pageFilter(products, pageNum, pageSize)})
			})
			.catch(error => {
				console.error('获取商品列表异常', error)
				res.send({status: 1, msg: '获取商品列表异常, 请重新尝试'})
			})
    })
    //删除
    router.post('/productManage/deleteProduct',(req,res)=>{
			const {_id} = req.body
			ProductModel.findOneAndDelete({_id:_id}).then((v)=>{
				if(v){
						res.send({status:200,data:{msg:'删除成功'}})
				}else{
						res.send({status:200,data:{msg:'删除失败'}})
				}
			}).catch((err)=>{
				res.send({status:401,data:{msg:`未知错误:${err}`}})
			})
    })
    //更新
    router.post('/productManage/updateProduct',(req,res)=>{
			const {productInfo} = req.body
			ProductModel.findOneAndUpdate({_id:productInfo._id},productInfo).then((v)=>{
				res.send({status:200,data:{msg:'更新成功'}})
			}).catch((err)=>{
				res.send({status:401,data:{msg:`未知错误:${err}`}})
			})
    })
    //根据名称获取菜品
    router.get('/productManage/getProductByName',(req,res)=>{
			const {name} = req.query
			ProductModel.findOne({name:name}).then((v)=>{
				if(v){
						res.send({status:200,data:{productInfo:[v]}})
				}else{
						res.send({status:200,data:{msg:'未查找到该菜品'}})
				}
			}).catch((err)=>{
				res.send({status:401,data:{msg:`未知错误:${err}`}})
			})
    })
    //根据id获取菜品
    router.get('/productManage/getProductById',(req,res)=>{
			const {_id} = req.query
			ProductModel.findOne({_id:_id}).then((v)=>{
				if(v){
						res.send({status:200,data:{productInfo:v}})
				}else{
						res.send({status:200,data:{msg:'未查找到该菜品'}})
				}
			}).catch((err)=>{
				res.send({status:401,data:{msg:`未知错误:${err}`}})
			})
    })
    // 更新销售状态
    router.post('/productManage/updateSaleStatus',(req,res)=>{
			const {_id,status} = req.body
			ProductModel.findOneAndUpdate({_id:_id},status).then((v)=>{
				res.send({status:200,data:{msg:'更新成功',info:v}})
			}).then((err)=>{
				res.send({status:401,data:{msg:`未知错误:${err}`}})
			})
		})
}