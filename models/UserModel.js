//1 引入mongoose
const mongoose = require('mongoose')
const md5 = require('blueimp-md5')

//2 定义schema
const UserSchema = new mongoose.Schema({
    username:{type:String,required:true},
    password:{type:String,required: true},
    phone:String,
    email:String,
    create_time:{type:Number,default:Date.now()}
})

//3 定义Model
const UserModel = mongoose.model('user',UserSchema)

//初始化账号密码
UserModel.findOne({username: 'admin'}).then((user)=>{
    if(!user){
        UserModel.create({
            username:'admin',
            password: md5('admin')
        }).then(()=>{
            console.log('创建用户成功，admin/admin')
        })
    }
})

module.exports = UserModel
