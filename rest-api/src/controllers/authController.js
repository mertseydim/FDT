const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Kayıt
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'Kullanıcı başarıyla oluşturuldu.' });
  } catch (err) {
    res.status(400).json({ error: 'Bu e-posta veya kullanıcı adı zaten kayıtlı.' });
  }
};

// Giriş
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Kullanıcı bulunamadı.' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Şifre hatalı.' });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: 'Sunucu hatası.' });
  }
};

// Şifre Yenileme
exports.resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'Kullanıcı bulunamadı.' });
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.json({ message: 'Şifre başarıyla güncellendi.' });
  } catch (err) {
    res.status(500).json({ error: 'Sunucu hatası.' });
  }
};

// Çıkış
exports.logout = (req, res) => {
  res.json({ message: 'Çıkış başarılı.' });
};