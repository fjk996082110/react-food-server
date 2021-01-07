/**
 * 1、通过express启动服务器
 * 2、通过mongoose连接数据库
 * 3、使用中间件
 * */
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const cookieParser = require('cookie-parser') // 声明使用解析cookie数据的中间件
const routerIndex = require('./routes')
const {DB_CONFIG,SERVER_CONFIG} = require('./config')
const tokenMiddleware = require('./middleware/check-token')

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

//声明使用静态中间件
app.use(express.static('public'))

// 声明使用解析post请求的中间件
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(cookieParser())

app.use(tokenMiddleware)

app.use('/',routerIndex)


mongoose.connect(`mongodb://${DB_CONFIG.host}:${DB_CONFIG.port}/${DB_CONFIG.name}`,{useNewUrlParser:true})
    .then(()=>{
        console.log('数据库连接成功')
        app.listen(SERVER_CONFIG.port,()=>{
            console.log(`服务器启动成功，地址为:http://localhost:${SERVER_CONFIG.port}`)
        })
    })
    .catch((err)=>{
        console.log('数据连接失败',err)
    })
