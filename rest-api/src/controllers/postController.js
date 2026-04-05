const Post = require('../models/Post');

// Gönderi Oluşturma
exports.createPost = async (req, res) => {
  try {
    const { title, content, category, mediaUrl } = req.body;
    const post = new Post({ title, content, category, mediaUrl, author: req.user.id });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: 'Sunucu hatası.' });
  }
};

// Gönderi Listeleme
exports.getFeed = async (req, res) => {
  try {
    const { page = 1, limit = 20, sort = 'newest' } = req.query;
    const sortOption = sort === 'popular' ? { likes: -1 } : { createdAt: -1 };
    const posts = await Post.find()
      .populate('author', 'username profileImageUrl')
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const total = await Post.countDocuments();
    res.json({ total, page: Number(page), posts });
  } catch (err) {
    res.status(500).json({ error: 'Sunucu hatası.' });
  }
};

// Gönderi Beğenme
exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Gönderi bulunamadı.' });
    const isLiked = post.likes.includes(req.user.id);
    if (isLiked) {
      post.likes.pull(req.user.id);
    } else {
      post.likes.push(req.user.id);
    }
    await post.save();
    res.json({ liked: !isLiked, totalLikes: post.likes.length });
  } catch (err) {
    res.status(500).json({ error: 'Sunucu hatası.' });
  }
};

// Yorum Yapma
exports.commentPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Gönderi bulunamadı.' });
    const comment = { user: req.user.id, content: req.body.content };
    post.comments.push(comment);
    await post.save();
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ error: 'Sunucu hatası.' });
  }
};