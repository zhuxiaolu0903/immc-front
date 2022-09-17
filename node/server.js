const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const app = express()
const jwt = require('jsonwebtoken')

app.all('*', function (req, res, next) {
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header('Access-Control-Allow-Origin', '*')
  //允许的header类型
  res.header('Access-Control-Allow-Headers', '*')
  //跨域允许的请求方式
  res.header('Access-Control-Allow-Methods', 'DELETE,PUT,POST,GET,OPTIONS')
  if (req.method.toLowerCase() == 'options') res.send(200)
  //让options尝试请求快速结束
  else next()
})

app.use(express.static(__dirname))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// 设置superSecret 全局参数
app.set('superSecret', 'myjwttest')

// 处理成功/失败的中间件
const middleware = (req, res, next) => {
  res.$success = (data, code = 200) => {
    const _data = {
      code
    }
    if (typeof data === 'object') {
      _data.data = data
      _data.message = 'success'
      _data.success = true
    } else {
      _data.message = data
    }
    res.json(_data)
  }
  res.error = (error, code = 500) => {
    const _data = {
      code
    }
    if (typeof error === 'object') {
      _data.data = JSON.stringify(error)
      _data.message = 'error'
      _data.success = false
    } else {
      _data.message = error
    }
    res.json(_data)
  }
  next()
}
app.use(middleware)

const authRoutes = express.Router()

// 用户注册
register()

// 用户登录
signIn()

const apiRoutes = express.Router()

// API路由处理 拦截验证JWT
apiRoutes.use((req, res, next) => {
  // 只拦截部分接口
  const { url } = req
  // 拦截名单
  const whiteList = ['shoppingCart', 'orders']
  if (whiteList.findIndex((item) => url.includes(item)) > -1) {
    const token =
      req.body.token || req.query.token || req.headers['x-access-token']
    if (token) {
      // 解码token (验证 secret 和检查有效期（exp）)
      jwt.verify(token, app.get('superSecret'), function (err, decoded) {
        if (err) {
          return res.status(401).send({
            success: false,
            message: 'token失效',
          })
        } else {
          // 如果验证通过，在req中写入解密结果
          req.decoded = decoded
          // 继续下一步路由
          next()
        }
      })
    } else {
      // 没有拿到token 返回错误
      return res.status(403).send({
        success: false,
        message: '没有找到token',
      })
    }
  } else {
    // 继续下一步路由
    next()
  }
})

// 查询分类
getCategory()

// 注册auth路由
app.use('/auth', authRoutes)
// 注册API路由
app.use('/api', apiRoutes)
const port = process.env.PORT || 8080
module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})

function register() {
  authRoutes.post('/register', function (req, res) {
    const { username, password } = req.body
    fs.readFile('./user/data.json', function (err, data) {
      const fileData = JSON.parse(data)
      const index = fileData.findIndex((item) => item['username'] === username)
      if (index > -1) {
        res.send(false)
      } else {
        // 新增一条用户信息
        fileData.push({
          username,
          password,
        })
        fs.writeFile('./user/data.json', JSON.stringify(fileData), (err) => {
          if (!err) {
            res.send(true)
          }
        })
      }
    })
  })
}

function signIn() {
  authRoutes.post('/login', function (req, res) {
    const { username, password } = req.body
    fs.readFile('./user/data.json', function (err, data) {
      const fileData = JSON.parse(data)
      const index = fileData.findIndex((item) => item['username'] === username)
      if (index > -1) {
        const user = fileData[index]
        if (user.password === password) {
          const token = jwt.sign(user, app.get('superSecret'), {
            expiresIn: 60 * 30, // 授权时效30分钟
          })
          res.json({
            success: true,
            token: token,
          })
        } else {
          res.json({
            success: false,
            message: '用户密码错误',
          })
        }
      } else {
        res.json({
          success: false,
          message: '抱歉，此用户未注册',
        })
      }
    })
  })
}

function getCategory() {
  apiRoutes.get('/category', function (req, res) {
    fs.readFile('./category/data.json', function (err, data) {
      res.$success(JSON.parse(data), 200)
    })
  })
}