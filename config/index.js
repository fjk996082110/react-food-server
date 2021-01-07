
const isDev = process.env.NODE_ENV === 'development'

let SERVER_CONFIG,DB_CONFIG

if(isDev){
    SERVER_CONFIG={
        port:4000
    }
    DB_CONFIG={
        port:27017,
        host:'localhost',
        name:'react_learn_db'
    }
}else{
    SERVER_CONFIG={
        port:4000
    }
    DB_CONFIG={
        port:27017,
        host:'localhost',
        name:'react_learn_db'
    }
}

// token签名加密的私钥
const PRIVATE_KEY = 'reactLearn_token';

const UN_CHECK_PATHS = ['/test', '/login', '/product/img/upload'];

module.exports = {
    SERVER_CONFIG,
    DB_CONFIG,
    PRIVATE_KEY,
    UN_CHECK_PATHS
}