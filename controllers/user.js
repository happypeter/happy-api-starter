const User = require('../models/user.js')

exports.signup = async (req, res) => {
  const _user = req.body
  try {
    const u = new User(_user)
    await u.save()
    res.json({
      // 选择需要返回的字段，千万别把密码也给返回了
      id: u._id,
      username: u.username
    })
  } catch (err) {
    // 用户名，密码不能为空，在客户端判断，于是这里只有一种出错情况，就是用户名已经注册
    if (err) return res.status(406).json({ msg: '用户名重复' })
  }
}

exports.login = async (req, res) => {
  const { username, password } = req.body
  try {
    const u = await User.findOne({ username })
    if (!u.comparePassword(password)) throw Error('密码错误')
    res.json({
      id: u._id,
      username: u.username
    })
  } catch (err) {
    res.status(406).json({ msg: '用户名密码错误' })
  }
}

exports.logout = (req, res) => {
  res.json({ msg: '登出成功' })
}

exports.getById = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id }, '_id username')
    // todo: 这里可以改成 findById
    res.json({ user })
  } catch (err) {
    res.status(400).json({ msg: '未找到记录!' })
  }
}

exports.all = async (req, res) => {
  const users = await User.find({}, '_id username')
  res.json({ users })
}
