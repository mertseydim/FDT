const Post = require('../models/Post');
const { getCache, setCache, clearFeedCache } = require('../cache');

// Gonderi Olusturma
exports.createPost = async (req, res) => {
  try {
    const { title, content, category, mediaUrl } = req.body;
    const post = new Post({ title, content, category, mediaUrl, author: req.user.id });
    await post.save();
    await clearFeedCache();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: 'Sunucu hatasi.' });
  }
};

// Gonderi Listeleme (Redis onbellekli)
exports.getFeed = async (req, res) => {
  try {
    const { page = 1, limit = 20, sort = 'newest' } = req.query;
    const cacheKey = `feed:${page}:${limit}:${sort}`;

    const cached = await getCache(cacheKey);
    if (cached) {
      console.log('Feed: Redis cache HIT ->', cacheKey);
      return res.json(cached);
    }
    console.log('Feed: cache MISS -> veritabanindan cekiliyor');

    const sortOption = sort === 'popular' ? { likes: -1 } : { createdAt: -1 };
    const posts = await Post.find()
      .populate('author', 'username profileImageUrl')
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const total = await Post.countDocuments();
    const result = { total, page: Number(page), posts };

    await setCache(cacheKey, result, 30);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Sunucu hatasi.' });
  }
};

// Gonderi Begenme
exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Gonderi bulunamadi.' });
    const isLiked = post.likes.includes(req.user.id);
    if (isLiked) {
      post.likes.pull(req.user.id);
    } else {
      post.likes.push(req.user.id);
    }
    await post.save();
    await clearFeedCache();
    res.json({ liked: !isLiked, totalLikes: post.likes.length });
  } catch (err) {
    res.status(500).json({ error: 'Sunucu hatasi.' });
  }
};

// Yorum Yapma
exports.commentPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Gonderi bulunamadi.' });
    const comment = { user: req.user.id, content: req.body.content };
    post.comments.push(comment);
    await post.save();
    await clearFeedCache();
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ error: 'Sunucu hatasi.' });
  }
};