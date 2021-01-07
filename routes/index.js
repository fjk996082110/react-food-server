const md5 = require('blueimp-md5')
const express = require('express')
const router = express.Router()
const jwt = require("jsonwebtoken")
const userModel = require('../models/UserModel')
const {PRIVATE_KEY} = require('../config')


router.get('/test_router',(req,res,next)=>{
    res.send({status:200,data:'success'})
})

router.post('/login',(req,res)=>{
    const {username,password} = req.body
    userModel.findOne({username:username,password:md5(password)}).then((user)=>{
        if(user){
            const token = jwt.sign({id:user._id},PRIVATE_KEY,{expiresIn:'7 days'})
            res.send({status:200,data:{userInfo:user,token:token}})
        }else{
            res.send({status:201,data:{msg:'用户名或密码错误'}})
        }
    }).catch((err)=>{
        res.send({status:401,data:{msg: `未知错误:${err}`}})
    })
})

// router.post('/checkToken',(req,res)=>{
//
// })

require('./category')(router)
require('./product')(router)
require('./menu')(router)
require('./upload')(router)
require('./foodMenu')(router)

module.exports = router