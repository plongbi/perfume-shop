import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Avatar,
  Grid,
  Alert,
  Tabs,
  Tab,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import { Link, useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const navigate = useNavigate();

  // Tab: 'profile' (Chỉnh sửa hồ sơ) hoặc 'orders' (Lịch sử đơn hàng)
  const [activeTab, setActiveTab] = useState('profile');

  // Lấy dữ liệu user từ localStorage nếu có, nếu chưa có tạo tài khoản mặc định
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // do nothing
      }
    }
    return {
      name: 'Admin',
      email: 'admin@gmail.com',
      phone: '09348902348',
      address: 'Ha Noi - Viet Nam',
      avatar: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=300&auto=format&fit=crop&q=80'
    };
  });

  const [name, setName] = useState(user.name || 'Admin');
  const [phone, setPhone] = useState(user.phone || '09348902348');
  const [address, setAddress] = useState(user.address || 'Ha Noi - Viet Nam');
  const [avatar, setAvatar] = useState(
    user.avatar || 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=300&auto=format&fit=crop&q=80'
  );
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Danh sách đơn hàng của người dùng
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  // Lấy lịch sử đơn hàng từ Backend API MongoDB Atlas
  const fetchMyOrders = async () => {
    setLoadingOrders(true);
    const email = user.email || 'guest@gmail.com';
    try {
      const res = await fetch(`http://localhost:5000/api/orders/user/${encodeURIComponent(email)}`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setOrders(data);
          setLoadingOrders(false);
          return;
        }
      }
    } catch (e) {
      console.warn('Lỗi fetch đơn hàng từ server:', e);
    }

    setOrders([]);
    setLoadingOrders(false);
  };

  useEffect(() => {
    // Xóa triệt để cache localStorage cũ
    localStorage.removeItem('user_orders');
    fetchMyOrders();
  }, [user.email]);

  // Xử lý đổi ảnh đại diện (chọn file từ máy tính)
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Lưu thông tin thay đổi vào localStorage
  const handleSave = (e) => {
    e.preventDefault();
    const updatedUser = {
      ...user,
      name,
      phone,
      address,
      avatar
    };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
    }, 3000);
  };

  const formatPrice = (num) => {
    return new Intl.NumberFormat('vi-VN').format(num) + ' đ';
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Mới đây';
    const d = new Date(dateStr);
    return d.toLocaleDateString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getStatusChip = (status) => {
    switch (status) {
      case 'Delivered':
        return <Chip label="Giao thành công" size="small" sx={{ backgroundColor: '#ecfdf5', color: '#059669', fontWeight: 600, fontSize: '0.75rem' }} />;
      case 'Shipping':
        return <Chip label="Đang vận chuyển" size="small" sx={{ backgroundColor: '#eff6ff', color: '#2563eb', fontWeight: 600, fontSize: '0.75rem' }} />;
      case 'Cancelled':
        return <Chip label="Đã hủy" size="small" sx={{ backgroundColor: '#fef2f2', color: '#dc2626', fontWeight: 600, fontSize: '0.75rem' }} />;
      default:
        return <Chip label="Đang xử lý" size="small" sx={{ backgroundColor: '#fefce8', color: '#ca8a04', fontWeight: 600, fontSize: '0.75rem' }} />;
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: '#f7f6f3',
        minHeight: '100vh',
        py: { xs: 4, md: 7 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <Container maxWidth="lg" sx={{ mb: 2.5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button
            component={Link}
            to="/products"
            startIcon={<ArrowBackIcon sx={{ fontSize: 18 }} />}
            sx={{
              color: '#71717a',
              textTransform: 'none',
              fontWeight: 500,
              fontSize: '0.88rem',
              '&:hover': { color: '#18181b', backgroundColor: 'transparent' }
            }}
          >
            Quay lại cửa hàng
          </Button>

          {/* Tab chuyển đổi giữa Hồ Sơ và Lịch Sử Đơn Hàng */}
          <Tabs
            value={activeTab}
            onChange={(e, val) => setActiveTab(val)}
            sx={{
              backgroundColor: '#ffffff',
              borderRadius: '9999px',
              p: 0.5,
              border: '1px solid #e5e7eb',
              boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
              minHeight: 'auto',
              '& .MuiTabs-indicator': { display: 'none' }
            }}
          >
            <Tab
              value="profile"
              label="Hồ sơ cá nhân"
              icon={<PersonOutlineOutlinedIcon sx={{ fontSize: '18px !important' }} />}
              iconPosition="start"
              sx={{
                borderRadius: '9999px',
                textTransform: 'none',
                minHeight: 'auto',
                py: 0.8,
                px: 2.2,
                fontSize: '0.86rem',
                fontWeight: activeTab === 'profile' ? 700 : 500,
                color: activeTab === 'profile' ? '#ffffff !important' : '#64748b',
                backgroundColor: activeTab === 'profile' ? '#18181b' : 'transparent',
                transition: 'all 0.2s ease'
              }}
            />
            <Tab
              value="orders"
              label={`Lịch sử đơn hàng (${orders.length})`}
              icon={<ShoppingBagOutlinedIcon sx={{ fontSize: '18px !important' }} />}
              iconPosition="start"
              sx={{
                borderRadius: '9999px',
                textTransform: 'none',
                minHeight: 'auto',
                py: 0.8,
                px: 2.2,
                fontSize: '0.86rem',
                fontWeight: activeTab === 'orders' ? 700 : 500,
                color: activeTab === 'orders' ? '#ffffff !important' : '#64748b',
                backgroundColor: activeTab === 'orders' ? '#18181b' : 'transparent',
                transition: 'all 0.2s ease'
              }}
            />
          </Tabs>
        </Box>
      </Container>

      {/* NỘI DUNG TAB 1: CHỈNH SỬA HỒ SƠ */}
      {activeTab === 'profile' && (
        <Container maxWidth="md">
          <Paper
            elevation={0}
            sx={{
              borderRadius: '24px',
              backgroundColor: '#ffffff',
              boxShadow: '0 12px 35px rgba(0, 0, 0, 0.04)',
              border: '1px solid #eae8e4',
              overflow: 'hidden',
              p: { xs: 3, sm: 5, md: 6 }
            }}
          >
            {savedSuccess && (
              <Alert
                icon={<CheckCircleOutlineOutlinedIcon fontSize="inherit" />}
                severity="success"
                sx={{
                  mb: 3.5,
                  borderRadius: '12px',
                  backgroundColor: '#f0fdf4',
                  color: '#166534',
                  '& .MuiAlert-icon': { color: '#16a34a' }
                }}
              >
                Cập nhật hồ sơ cá nhân thành công!
              </Alert>
            )}

            <Grid container spacing={{ xs: 4, md: 6 }}>
              {/* Cột Trái: Ảnh đại diện & Tên hiển thị & Nút Đổi ảnh đại diện */}
              <Grid
                item
                xs={12}
                md={4}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  borderRight: { xs: 'none', md: '1px solid #f1efe9' },
                  pr: { xs: 0, md: 4 }
                }}
              >
                {/* Vòng tròn ảnh đại diện */}
                <Box sx={{ position: 'relative', mb: 2.5 }}>
                  <Avatar
                    src={avatar}
                    alt={name}
                    sx={{
                      width: 130,
                      height: 130,
                      border: '3px solid #edebe8',
                      boxShadow: '0 6px 18px rgba(0,0,0,0.08)'
                    }}
                  />
                </Box>

                {/* Tên & Email hiển thị bên trái */}
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    color: '#27272a',
                    fontSize: '1.2rem',
                    fontFamily: '"Plus Jakarta Sans", sans-serif',
                    lineHeight: 1.2,
                    mb: 0.5
                  }}
                >
                  {name || 'Người dùng'}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: '#8b8a87',
                    fontSize: '0.88rem',
                    mb: 3,
                    fontWeight: 400
                  }}
                >
                  {user.email || 'admin@gmail.com'}
                </Typography>

                {/* Nút Đổi ảnh đại diện */}
                <Button
                  component="label"
                  variant="outlined"
                  sx={{
                    borderRadius: '9999px',
                    borderColor: '#c7d2fe',
                    color: '#6366f1',
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '0.86rem',
                    px: 3,
                    py: 0.8,
                    backgroundColor: '#ffffff',
                    boxShadow: '0 2px 8px rgba(99, 102, 241, 0.06)',
                    '&:hover': {
                      borderColor: '#818cf8',
                      backgroundColor: '#eef2ff'
                    }
                  }}
                >
                  Đổi ảnh đại diện
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleAvatarChange}
                  />
                </Button>
              </Grid>

              {/* Cột Phải: Chỉnh sửa hồ sơ */}
              <Grid item xs={12} md={8} sx={{ pl: { xs: 0, md: 2 } }}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    color: '#18181b',
                    fontSize: '1.45rem',
                    mb: 3.5,
                    fontFamily: '"Plus Jakarta Sans", sans-serif'
                  }}
                >
                  Chỉnh sửa hồ sơ
                </Typography>

                <Box component="form" onSubmit={handleSave} sx={{ display: 'flex', flexDirection: 'column', gap: 2.8 }}>
                  {/* Họ và tên */}
                  <Box>
                    <Typography sx={{ fontWeight: 600, color: '#3f3f46', mb: 0.8, fontSize: '0.9rem' }}>
                      Họ và tên
                    </Typography>
                    <TextField
                      fullWidth
                      size="small"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Nhập họ và tên"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '6px',
                          backgroundColor: '#ffffff',
                          '& fieldset': { borderColor: '#dcd9d4' },
                          '&:hover fieldset': { borderColor: '#b5b2ac' },
                          '&.Mui-focused fieldset': { borderColor: '#71717a' }
                        }
                      }}
                    />
                  </Box>

                  {/* Số điện thoại */}
                  <Box>
                    <Typography sx={{ fontWeight: 600, color: '#3f3f46', mb: 0.8, fontSize: '0.9rem' }}>
                      Số điện thoại
                    </Typography>
                    <TextField
                      fullWidth
                      size="small"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Nhập số điện thoại"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '6px',
                          backgroundColor: '#ffffff',
                          '& fieldset': { borderColor: '#dcd9d4' },
                          '&:hover fieldset': { borderColor: '#b5b2ac' },
                          '&.Mui-focused fieldset': { borderColor: '#71717a' }
                        }
                      }}
                    />
                  </Box>

                  {/* Địa chỉ nhận hàng */}
                  <Box>
                    <Typography sx={{ fontWeight: 600, color: '#3f3f46', mb: 0.8, fontSize: '0.9rem' }}>
                      Địa chỉ nhận hàng
                    </Typography>
                    <TextField
                      fullWidth
                      multiline
                      rows={2.5}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Nhập địa chỉ nhận hàng"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '6px',
                          backgroundColor: '#ffffff',
                          '& fieldset': { borderColor: '#dcd9d4' },
                          '&:hover fieldset': { borderColor: '#b5b2ac' },
                          '&.Mui-focused fieldset': { borderColor: '#71717a' }
                        }
                      }}
                    />
                  </Box>

                  {/* Email (Không thể thay đổi) */}
                  <Box>
                    <Typography sx={{ fontWeight: 600, color: '#3f3f46', mb: 0.8, fontSize: '0.9rem' }}>
                      Email (Không thể thay đổi)
                    </Typography>
                    <TextField
                      fullWidth
                      size="small"
                      disabled
                      value={user.email || 'admin@gmail.com'}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '6px',
                          backgroundColor: '#f8fafc',
                          '& fieldset': { borderColor: '#e2e8f0' }
                        }
                      }}
                    />
                  </Box>

                  {/* Nút Lưu thay đổi */}
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        backgroundColor: '#65a30d',
                        color: '#ffffff',
                        px: 5,
                        py: 1.1,
                        borderRadius: '9999px',
                        fontSize: '0.95rem',
                        fontWeight: 600,
                        textTransform: 'none',
                        boxShadow: '0 4px 15px rgba(101, 163, 13, 0.35)',
                        '&:hover': {
                          backgroundColor: '#4d7c0f',
                          boxShadow: '0 6px 20px rgba(101, 163, 13, 0.45)'
                        }
                      }}
                    >
                      Lưu thay đổi
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      )}

      {/* NỘI DUNG TAB 2: LỊCH SỬ MUA HÀNG (CÁ NHÂN) */}
      {activeTab === 'orders' && (
        <Container maxWidth="lg">
          <Paper
            elevation={0}
            sx={{
              borderRadius: '24px',
              backgroundColor: '#ffffff',
              boxShadow: '0 12px 35px rgba(0, 0, 0, 0.04)',
              border: '1px solid #eae8e4',
              p: { xs: 3, md: 5 }
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#18181b', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                  Lịch Sử Mua Hàng
                </Typography>
                <Typography variant="body2" sx={{ color: '#71717a', mt: 0.5 }}>
                  Xem và theo dõi toàn bộ các đơn hàng bạn đã đặt mua tại ESSENCE
                </Typography>
              </Box>
              <Button
                size="small"
                variant="outlined"
                onClick={fetchMyOrders}
                sx={{ borderRadius: '9999px', textTransform: 'none', borderColor: '#d1d5db', color: '#374151' }}
              >
                Làm mới
              </Button>
            </Box>

            {orders.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: '50%',
                    backgroundColor: '#faf9f6',
                    color: '#a1a1aa',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2
                  }}
                >
                  <ShoppingBagOutlinedIcon sx={{ fontSize: 32 }} />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#18181b', mb: 1 }}>
                  Bạn chưa có đơn hàng nào
                </Typography>
                <Typography variant="body2" sx={{ color: '#71717a', mb: 3 }}>
                  Khám phá các nốt hương độc bản và đặt mua ngay hôm nay!
                </Typography>
                <Button
                  component={Link}
                  to="/products"
                  variant="contained"
                  sx={{
                    backgroundColor: '#18181b',
                    color: '#ffffff',
                    borderRadius: '9999px',
                    px: 3.5,
                    py: 1,
                    textTransform: 'none',
                    fontWeight: 600,
                    '&:hover': { backgroundColor: '#c5a059' }
                  }}
                >
                  Mua Sắm Ngay
                </Button>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {orders.map((ord) => (
                  <Paper
                    key={ord._id || ord.orderCode}
                    elevation={0}
                    sx={{
                      borderRadius: '16px',
                      border: '1px solid #edebe8',
                      overflow: 'hidden',
                      transition: 'all 0.2s',
                      '&:hover': { boxShadow: '0 6px 20px rgba(0,0,0,0.05)' }
                    }}
                  >
                    {/* Header đơn hàng */}
                    <Box
                      sx={{
                        p: 2.5,
                        backgroundColor: '#faf9f6',
                        borderBottom: '1px solid #edebe8',
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 2
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography sx={{ fontWeight: 700, color: '#18181b', fontSize: '0.98rem' }}>
                          Mã: <span style={{ color: '#005baa' }}>{ord.orderCode}</span>
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#71717a', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <AccessTimeOutlinedIcon sx={{ fontSize: 14 }} />
                          {formatDate(ord.createdAt)}
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Chip
                          label={ord.paymentMethod === 'VNPAY' ? 'VNPAY' : 'COD'}
                          size="small"
                          sx={{
                            backgroundColor: ord.paymentMethod === 'VNPAY' ? '#e0f2fe' : '#f4f4f5',
                            color: ord.paymentMethod === 'VNPAY' ? '#0369a1' : '#52525b',
                            fontWeight: 700,
                            fontSize: '0.72rem'
                          }}
                        />
                        {getStatusChip(ord.orderStatus)}
                      </Box>
                    </Box>

                    {/* Nội dung danh sách sản phẩm trong đơn */}
                    <Box sx={{ p: 2.5 }}>
                      <Grid container spacing={2}>
                        {ord.items && ord.items.length > 0 ? (
                          ord.items.map((item, idx) => (
                            <Grid item xs={12} sm={6} key={idx}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Avatar
                                  src={item.image}
                                  alt={item.name}
                                  variant="rounded"
                                  sx={{ width: 56, height: 56, border: '1px solid #e5e7eb' }}
                                />
                                <Box>
                                  <Typography sx={{ fontWeight: 600, fontSize: '0.92rem', color: '#18181b', lineHeight: 1.2 }}>
                                    {item.name}
                                  </Typography>
                                  <Typography variant="caption" sx={{ color: '#71717a' }}>
                                    {formatPrice(item.price)} x {item.quantity}
                                  </Typography>
                                </Box>
                              </Box>
                            </Grid>
                          ))
                        ) : (
                          <Grid item xs={12}>
                            <Typography variant="body2" sx={{ color: '#71717a' }}>
                              Chi tiết: {ord.recipientName} - {ord.phone} ({ord.address})
                            </Typography>
                          </Grid>
                        )}
                      </Grid>

                      <Divider sx={{ my: 2 }} />

                      {/* Thông tin giao nhận và Tổng tiền */}
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#64748b', fontSize: '0.84rem' }}>
                          <LocalShippingOutlinedIcon sx={{ fontSize: 18, color: '#c5a059' }} />
                          <span>Giao tới: <strong>{ord.recipientName}</strong> ({ord.phone}) - {ord.address}</span>
                        </Box>
                        <Box sx={{ textAlign: 'right' }}>
                          <Typography variant="caption" sx={{ color: '#71717a', display: 'block' }}>
                            Tổng thanh toán
                          </Typography>
                          <Typography sx={{ fontWeight: 800, color: '#16a34a', fontSize: '1.2rem', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                            {formatPrice(ord.totalAmount)}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Paper>
                ))}
              </Box>
            )}
          </Paper>
        </Container>
      )}
    </Box>
  );
};

export default ProfilePage;
