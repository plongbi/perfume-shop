const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');

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

// 1.1 Lấy chi tiết 1 sản phẩm theo ID
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi tìm sản phẩm', error: err.message });
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

// 5. API Lấy danh sách toàn bộ Người Dùng (phục vụ trang Admin)
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi lấy danh sách người dùng', error: err.message });
  }
});

// ================= API ĐƠN HÀNG (LỊCH SỬ MUA HÀNG) ================= //

// 6. Tạo đơn hàng mới
app.post('/api/orders', async (req, res) => {
  try {
    const {
      userId,
      userEmail,
      recipientName,
      phone,
      address,
      items,
      totalAmount,
      shippingFee,
      paymentMethod,
      paymentStatus
    } = req.body;

    // Sinh mã đơn hàng ngẫu nhiên: ví dụ ORD-89214
    const orderCode = 'ORD-' + Math.floor(100000 + Math.random() * 900000);

    const newOrder = new Order({
      orderCode,
      userId,
      userEmail,
      recipientName,
      phone,
      address,
      items,
      totalAmount,
      shippingFee,
      paymentMethod: paymentMethod || 'COD',
      paymentStatus: paymentStatus || (paymentMethod === 'VNPAY' ? 'Paid' : 'Pending'),
      orderStatus: 'Processing'
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    console.error('Lỗi tạo đơn hàng:', err);
    res.status(500).json({ message: 'Không thể tạo đơn hàng', error: err.message });
  }
});

// 7. Lấy toàn bộ đơn hàng (dành cho Admin)
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi lấy danh sách đơn hàng', error: err.message });
  }
});

// 8. Lấy lịch sử đơn hàng của cá nhân (theo email hoặc userId)
app.get('/api/orders/user/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const orders = await Order.find({
      $or: [{ userEmail: email }, { userId: email }]
    }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi lấy lịch sử đơn hàng cá nhân', error: err.message });
  }
});

// 9.1 Xóa sạch toàn bộ đơn hàng
app.delete('/api/orders', async (req, res) => {
  try {
    await Order.deleteMany({});
    res.json({ message: 'Đã xóa toàn bộ đơn hàng thành công' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi xóa đơn hàng', error: err.message });
  }
});

// 9. Cập nhật trạng thái đơn hàng (dành cho Admin)
app.patch('/api/orders/:id/status', async (req, res) => {
  try {
    const { orderStatus, paymentStatus } = req.body;
    const updateData = {};
    if (orderStatus) updateData.orderStatus = orderStatus;
    if (paymentStatus) updateData.paymentStatus = paymentStatus;

    const updated = await Order.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi cập nhật trạng thái đơn hàng', error: err.message });
  }
});

// Khởi chạy Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});