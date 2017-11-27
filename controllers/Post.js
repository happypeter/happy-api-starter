let Post = require('../models/post.js');

exports.remove = function (req, res) {
  let { id } = req.params
  Post.findById({_id: id}, function(err, post) {
    if (err) return res.status(500).json({ msg: '查找失败', err });
    if (post) {
      post.remove(function(err){
        if (err) return res.status(500).json({error: err.message});
        setTimeout(() => res.json({ msg: '删除成功！' }), 400)
      })
    }
  })
}

exports.all = function (req, res) {
  Post.find(function (err, posts) {
    if (err) return res.status(500).json({ msg: '查找失败', err });
    if (posts) {
      return setTimeout(() => res.json({ msg: '读取成功', posts }), 4000)
    }
  })
}

exports.new = function (req, res) {
  let post = req.body
  post = new Post(post)
  post.save(function (err, post) {
    if (err) return res.status(500).json({ msg: '保存失败，请重试', err })
    res.json({
      post,
      msg: '保存成功'
    })
  })
}
