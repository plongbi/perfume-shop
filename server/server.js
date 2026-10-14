const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const User = require('./models/User');
const Product = require('./models/Product');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
const dns = require("node:dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);
// Kết nối MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Đã kết nối thành công tới MongoDB Atlas!'))
  .catch((err) => console.error('❌ Lỗi kết nối MongoDB:', err));

// ================= API SẢN PHẨM ================= //

// 1. Lấy danh sách toàn bộ sản phẩm
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
  }
});

// 2. Thêm sản phẩm mới vào Database
app.post('/api/products', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ message: 'Không thể thêm sản phẩm', error: err.message });
  }
});

// ================= API ĐĂNG NHẬP / ĐĂNG KÝ ================= //

// 3. API Đăng Ký Tài Khoản
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email này đã được đăng ký!' });
    }

    // Cho phép truyền role khi khởi tạo (mặc định là 'user' nếu không truyền)
    const newUser = new User({
      name,
      email,
      password,
      role: role || 'user'
    });
    await newUser.save();

    res.status(201).json({
      message: 'Đăng ký tài khoản thành công!',
      user: { id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role }
    });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi đăng ký', error: err.message });
  }
});

// 4. API Đăng Nhập
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(400).json({ message: 'Email hoặc mật khẩu không chính xác!' });
    }

    res.json({
      message: 'Đăng nhập thành công!',
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi đăng nhập', error: err.message });
  }
});

// Khởi chạy Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});