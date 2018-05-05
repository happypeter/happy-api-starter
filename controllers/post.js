const Post = require('../models/post.js')

exports.remove = async (req, res) => {
  const { id } = req.params
  try {
    const post = await Post.findById(id)
    await post.remove()
    res.json({ msg: '删除成功！' })
  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: '查找记录失败' })
  }
}

exports.all = async (req, res) => {
  try {
    const posts = await Post.find()
    res.json(posts)
  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: '读取失败' })
  }
}

exports.new = async (req, res) => {
  const p = new Post(req.body)
  try {
    const post = await p.save()
    res.json({
      id: post.id,
      title: post.title,
      content: post.content
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: '保存失败' })
  }
}

exports.update = async (req, res) => {
  try {
    const p = await Post.findById(req.params.id)
    for (prop in req.body) {
      p[prop] = req.body[prop]
    }
    const post = await p.save()
    res.json(post)
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: '更新失败' })
  }
}
