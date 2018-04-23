const Post = require('../models/post.js')

// 删除一篇文章
exports.remove = async (req, res) => {
  const { id } = req.params
  try {
    const post = await Post.findById({ _id: id })
    await post.remove()
    res.json({ msg: '删除成功！' })
  } catch (err) {
    res.status(500).json({ msg: '查找记录失败', err })
  }
}

// 列出所有文章
exports.all = async (req, res) => {
  try {
    const posts = await Post.find()
    res.json({ posts })
  } catch (err) {
    res.status(500).json({ msg: '读取失败', err })
  }
}

// 新建一篇文章
exports.new = async (req, res) => {
  const p = new Post(req.body)
  try {
    const post = await p.save()
    res.json({
      post
    })
  } catch (err) {
    res.status(500).json({ msg: '保存失败', err })
  }
}
