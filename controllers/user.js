let User = require('../models/user.js')

exports.signup = function (req, res) {
  User.findOne({username:_user.username},function (err,user) {
    if (err) return res.status(500).json({msg: '注册失败，请重试',err});
    if (user) {
      return res.status(403).json({msg: '用户名重复，请重新注册'})
    } else {
      _user.username = _user.username.trim()
      user = new User(_user);
      user.save(function (err,user) {
        if (err) return res.status(500).json({msg: '注册失败，请重试',err});
        setTimeout(() => res.json({
          // 本地开发测试，添加延迟效果
          user,
          msg: '注册成功'
        }), 400)
      })
    }
  })
}

exports.update = function (req, res) {
  let _user = req.body;
  User.findOne({username:_user.username},function (err,user) {
    if (err) return res.status(500).json({msg: '更新失败，请重试',err});
    if (user) {
      user.save(function (err,user) {
        if (err) return res.status(500).json({msg: '更新失败，请重试',err});
        res.json({
          user,
          msg: '更新成功'
        })
      })
    }
  })
}

exports.login = function (req, res) {
  var _user = req.body;
  User.findOne({username:_user.username.trim()},function (err,user) {
    if (err) return res.status(500).json({msg: '登陆失败，请重试',err});
    if (!user) {
      return res.status(401).json({msg: '登陆失败，用户名不存在'})
    }
    user.comparePassword(_user.password, function (err, isMatch) {
      if (err) return res.status(500).json({msg: '登陆失败，请重试',err});
      if (isMatch) {
        setTimeout(() => res.json({
          user,
          msg: '登陆成功'
        }), 4000)
      }else {
        res.status(401).json({msg: '密码错误，请核对后重试'})
      }
    })
  })
}

// 登出功能
exports.logout = function (req,res) {
  res.json({ msg: '登出成功' })
}

// 通过 id 拿到用户信息

exports.getById  = function (req, res) {
  User.findOne({_id: req.params.id},function (err,user) {
    if (err) {
      return res.status(500).json({ msg: '查找用户失败', err })
    }
    if (user) {
      return setTimeout(() => res.json({ msg: '读取用户成功', user }), 3000)
    } else {
      console.log('用户未找到')
      return res.status(500).json({ msg: '用户未找到' })
    }
  })
}

// 读取所有用户
exports.all = function(req, res) {
  User.find().exec().then(
    users => {
    setTimeout(() =>
      res.json({ users }),
      200)
    }
  )
}
