const User = require('../models/user.js')

exports.signup = async (req, res) => {
  const _user = req.body
  try {
    const u = new User(_user)
    await u.save()
    res.json({
      user: {
        // 选择需要返回的字段，千万别把密码也给返回了
        _id: u._id,
        username: u.username
      }
    })
  } catch (err) {
    // 用户名，密码不能为空，在客户端判断，于是这里只有一种出错情况，就是用户名已经注册
    if (err) return res.status(406).json({ msg: '用户名重复' })
  }
}

exports.login = async (req, res) => {
  const _user = req.body
  try {
    const user = await User.findOne({ username: _user.username })
    user.comparePassword(_user.password, (err, isMatch) => {
      if (err) return res.status(500).json({ msg: '登录失败，请重试', err })
      if (isMatch) {
        setTimeout(
          () =>
            res.json({
              user: {
                _id: user._id,
                username: user.username
              },
              msg: '登录成功'
            }),
          400
        )
      } else {
        res.status(401).json({ msg: '密码错误，请核对后重试!' })
      }
    })
  } catch (err) {
    res.status(400).json({ msg: '用户不存在!' })
  }
}

exports.logout = (req, res) => {
  res.json({ msg: '登出成功' })
}

exports.getById = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id }, '_id username')
    res.json({ user })
  } catch (err) {
    res.status(400).json({ msg: '未找到记录!' })
  }
}

exports.all = async (req, res) => {
  const users = await User.find({}, '_id username')
  res.json({ users })
}
