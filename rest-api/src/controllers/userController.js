const User = require('../models/User');

// Profil Görüntüleme
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ error: 'Kullanıcı bulunamadı.' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Sunucu hatası.' });
  }
};

// Profil Güncelleme
exports.updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, bio, profileImageUrl } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, bio, profileImageUrl },
      { new: true }
    ).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Sunucu hatası.' });
  }
};

// Takip Et / Takipten Çık
exports.followUser = async (req, res) => {
  try {
    const userToFollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user.id);
    if (!userToFollow) return res.status(404).json({ error: 'Kullanıcı bulunamadı.' });
    const isFollowing = currentUser.following.includes(req.params.id);
    if (isFollowing) {
      currentUser.following.pull(req.params.id);
      userToFollow.followers.pull(req.user.id);
      await currentUser.save();
      await userToFollow.save();
      res.json({ following: false, message: 'Takipten çıkıldı.' });
    } else {
      currentUser.following.push(req.params.id);
      userToFollow.followers.push(req.user.id);
      await currentUser.save();
      await userToFollow.save();
      res.json({ following: true, message: 'Kullanıcı takip edildi.' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Sunucu hatası.' });
  }
};

// Bildirimler (basit versiyon)
exports.getNotifications = async (req, res) => {
  try {
    res.json({ unreadCount: 0, notifications: [] });
  } catch (err) {
    res.status(500).json({ error: 'Sunucu hatası.' });
  }
};