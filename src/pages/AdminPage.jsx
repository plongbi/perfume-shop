import React, { useState, useEffect } from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Grid,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Chip,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress
} from '@mui/material';

import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 270;

const AdminPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // State Dialog thêm sản phẩm
  const [openDialog, setOpenDialog] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'Eau de Parfum',
    price: '',
    rating: 5,
    image: '',
    description: ''
  });

  const currentUser = JSON.parse(localStorage.getItem('user')) || {
    id: '6acf8ef9dd6926b2506ffaf1',
    name: 'Admin',
    email: 'admin@gmail.com',
    role: 'admin'
  };

  // Tải danh sách sản phẩm từ Backend API
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/products');
      if (!res.ok) throw new Error('Lỗi tải danh sách sản phẩm');
      const data = await res.json();
      if (Array.isArray(data)) {
        setProducts(data);
      } else {
        setProducts([]);
      }
    } catch (err) {
      console.error('Lỗi lấy danh sách sản phẩm:', err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Tải danh sách người dùng từ Database MongoDB
  const fetchUsers = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/users');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) setUsers(data);
      }
    } catch (err) {
      console.error('Lỗi lấy danh sách users:', err);
    }
  };

  // Tải danh sách đơn hàng
  const fetchOrders = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/orders');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setOrders(data);
          return;
        }
      }
    } catch (err) {
      console.warn('Lỗi fetch orders từ server:', err);
    }

    // Fallback: Lấy từ localStorage
    const local = JSON.parse(localStorage.getItem('user_orders') || '[]');
    setOrders(local);
  };

  // Xóa toàn bộ đơn hàng (cả Database lẫn Local)
  const handleClearAllOrders = async () => {
    try {
      await fetch('http://localhost:5000/api/orders', { method: 'DELETE' });
    } catch (e) {
      console.error(e);
    }
    localStorage.removeItem('user_orders');
    setOrders([]);
  };

  // Cập nhật trạng thái đơn hàng
  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      await fetch(`http://localhost:5000/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderStatus: newStatus })
      });
    } catch (e) {
      console.error('Lỗi cập nhật:', e);
    }

    setOrders(prev => prev.map(o => (o._id === orderId || o.orderCode === orderId) ? { ...o, orderStatus: newStatus } : o));
    // Cập nhật local
    const local = JSON.parse(localStorage.getItem('user_orders') || '[]');
    const updated = local.map(o => (o._id === orderId || o.orderCode === orderId) ? { ...o, orderStatus: newStatus } : o);
    localStorage.setItem('user_orders', JSON.stringify(updated));
  };

  useEffect(() => {
    fetchProducts();
    fetchUsers();
    fetchOrders();
  }, []);

  // Xử lý Thêm Sản Phẩm Mới vào MongoDB
  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct)
      });
      if (res.ok) {
        setOpenDialog(false);
        setNewProduct({ name: '', category: 'Eau de Parfum', price: '', rating: 5, image: '', description: '' });
        fetchProducts();
      }
    } catch (err) {
      console.error('Lỗi thêm sản phẩm:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  // Render Nội dung tùy thuộc Tab đang chọn
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Box>
            <Box sx={{ mb: 4 }}>
              <Typography variant="overline" sx={{ color: '#c5a059', letterSpacing: '0.2em', fontWeight: 600 }}>
                System Overview
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 600, fontFamily: '"Playfair Display", serif', color: '#18181b', mt: 0.5 }}>
                Bảng Điều Khiển
              </Typography>
              <Typography variant="body2" sx={{ color: '#71717a' }}>
                Tổng quan hiệu suất hoạt động và dữ liệu cửa hàng ESSENCE
              </Typography>
            </Box>

            {/* 3 Thẻ chỉ số tổng quan phong cách Clean Modern SaaS */}
            <Grid container spacing={3} sx={{ mb: 4.5 }}>
              {/* Thẻ 1: Khách hàng & Người dùng */}
              <Grid item xs={12} sm={4}>
                <Paper
                  elevation={0}
                  onClick={() => setActiveTab('users')}
                  sx={{
                    p: 3,
                    borderRadius: '16px',
                    backgroundColor: '#ffffff',
                    border: '1px solid rgba(0, 0, 0, 0.07)',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
                    cursor: 'pointer',
                    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: '0 12px 24px -6px rgba(0, 0, 0, 0.08)',
                      borderColor: 'rgba(0, 0, 0, 0.15)'
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Typography
                      sx={{
                        color: '#71717a',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        letterSpacing: '0.02em',
                        textTransform: 'uppercase'
                      }}
                    >
                      Tổng người dùng
                    </Typography>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '10px',
                        backgroundColor: '#f4f4f5',
                        color: '#18181b',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <PeopleIcon sx={{ fontSize: 20 }} />
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.2, mb: 1.5 }}>
                    <Typography
                      sx={{
                        fontSize: '2.2rem',
                        fontWeight: 800,
                        color: '#18181b',
                        fontFamily: '"Plus Jakarta Sans", sans-serif',
                        lineHeight: 1
                      }}
                    >
                      {users.length}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#16a34a', fontWeight: 600, fontSize: '0.78rem' }}>
                      +100% active
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#a1a1aa', fontSize: '0.82rem' }}>
                    <span>Xem danh sách tài khoản</span>
                    <ArrowForwardIcon sx={{ fontSize: 13 }} />
                  </Box>
                </Paper>
              </Grid>

              {/* Thẻ 2: Sản phẩm trong kho */}
              <Grid item xs={12} sm={4}>
                <Paper
                  elevation={0}
                  onClick={() => setActiveTab('products')}
                  sx={{
                    p: 3,
                    borderRadius: '16px',
                    backgroundColor: '#ffffff',
                    border: '1px solid rgba(0, 0, 0, 0.07)',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
                    cursor: 'pointer',
                    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: '0 12px 24px -6px rgba(197, 160, 89, 0.15)',
                      borderColor: '#c5a059'
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Typography
                      sx={{
                        color: '#71717a',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        letterSpacing: '0.02em',
                        textTransform: 'uppercase'
                      }}
                    >
                      Sản phẩm trong kho
                    </Typography>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '10px',
                        backgroundColor: 'rgba(197, 160, 89, 0.12)',
                        color: '#c5a059',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <InventoryIcon sx={{ fontSize: 20 }} />
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.2, mb: 1.5 }}>
                    <Typography
                      sx={{
                        fontSize: '2.2rem',
                        fontWeight: 800,
                        color: '#18181b',
                        fontFamily: '"Plus Jakarta Sans", sans-serif',
                        lineHeight: 1
                      }}
                    >
                      {products.length}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#c5a059', fontWeight: 600, fontSize: '0.78rem' }}>
                      4 danh mục
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#a1a1aa', fontSize: '0.82rem' }}>
                    <span>Quản lý danh mục & kho</span>
                    <ArrowForwardIcon sx={{ fontSize: 13 }} />
                  </Box>
                </Paper>
              </Grid>

              {/* Thẻ 3: Đơn hàng mới */}
              <Grid item xs={12} sm={4}>
                <Paper
                  elevation={0}
                  onClick={() => setActiveTab('orders')}
                  sx={{
                    p: 3,
                    borderRadius: '16px',
                    backgroundColor: '#ffffff',
                    border: '1px solid rgba(0, 0, 0, 0.07)',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
                    cursor: 'pointer',
                    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: '0 12px 24px -6px rgba(22, 163, 74, 0.15)',
                      borderColor: '#16a34a'
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Typography
                      sx={{
                        color: '#71717a',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        letterSpacing: '0.02em',
                        textTransform: 'uppercase'
                      }}
                    >
                      Đơn hàng mới
                    </Typography>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '10px',
                        backgroundColor: '#f0fdf4',
                        color: '#16a34a',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <ShoppingBagIcon sx={{ fontSize: 20 }} />
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.2, mb: 1.5 }}>
                    <Typography
                      sx={{
                        fontSize: '2.2rem',
                        fontWeight: 800,
                        color: '#18181b',
                        fontFamily: '"Plus Jakarta Sans", sans-serif',
                        lineHeight: 1
                      }}
                    >
                      {orders.length}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#16a34a', fontWeight: 600, fontSize: '0.78rem' }}>
                      Cần xử lý
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#a1a1aa', fontSize: '0.82rem' }}>
                    <span>Kiểm tra & xác nhận giao</span>
                    <ArrowForwardIcon sx={{ fontSize: 13 }} />
                  </Box>
                </Paper>
              </Grid>
            </Grid>

            {/* Bảng Xem Nhanh Sản Phẩm */}
            <Paper elevation={0} sx={{ p: 4, borderRadius: '20px', border: '1px solid rgba(0, 0, 0, 0.06)', backgroundColor: '#ffffff', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, fontFamily: '"Plus Jakarta Sans", sans-serif', color: '#18181b', fontSize: '1.25rem' }}>
                  Sản phẩm mới cập nhật
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => setActiveTab('products')}
                  sx={{ textTransform: 'none', borderColor: 'rgba(0,0,0,0.12)', color: '#18181b', borderRadius: '9999px', px: 2, '&:hover': { borderColor: '#18181b', backgroundColor: 'transparent' } }}
                >
                  Xem tất cả
                </Button>
              </Box>
              <TableContainer>
                <Table>
                  <TableHead sx={{ backgroundColor: '#faf9f6' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700, color: '#71717a', fontSize: '0.82rem', letterSpacing: '0.04em' }}>SẢN PHẨM</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: '#71717a', fontSize: '0.82rem', letterSpacing: '0.04em' }}>PHÂN LOẠI</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: '#71717a', fontSize: '0.82rem', letterSpacing: '0.04em' }}>GIÁ NIÊM YẾT</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: '#71717a', fontSize: '0.82rem', letterSpacing: '0.04em' }}>ĐÁNH GIÁ</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(Array.isArray(products) ? products : []).slice(0, 5).map((row) => (
                      <TableRow key={row._id || Math.random()} hover sx={{ '&:hover': { backgroundColor: '#fcfbf9' } }}>
                        <TableCell sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar src={row.image} variant="rounded" sx={{ width: 44, height: 44, borderRadius: '10px' }} />
                          <Typography variant="body2" sx={{ fontWeight: 600, color: '#18181b' }}>{row.name}</Typography>
                        </TableCell>
                        <TableCell>
                          <Chip label={row.category || 'Eau de Parfum'} size="small" sx={{ backgroundColor: '#f4eedb', color: '#856434', fontWeight: 600, fontSize: '0.72rem' }} />
                        </TableCell>
                        <TableCell sx={{ color: '#18181b', fontWeight: 700, fontFamily: '"Plus Jakarta Sans", sans-serif', fontSize: '0.98rem' }}>
                          {row.price}
                        </TableCell>
                        <TableCell sx={{ color: '#c5a059', fontWeight: 600 }}>{row.rating || 5} ★</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Box>
        );

      case 'products':
        return (
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
              <Box>
                <Typography variant="overline" sx={{ color: '#c5a059', letterSpacing: '0.2em', fontWeight: 600 }}>
                  Inventory Catalog
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 600, fontFamily: '"Playfair Display", serif', color: '#18181b', mt: 0.5 }}>
                  Quản Lý Sản Phẩm
                </Typography>
                <Typography variant="body2" sx={{ color: '#71717a' }}>
                  Danh sách nước hoa trong cơ sở dữ liệu MongoDB
                </Typography>
              </Box>

              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setOpenDialog(true)}
                sx={{
                  backgroundColor: '#18181b',
                  color: '#ffffff',
                  borderRadius: '9999px',
                  px: 3,
                  py: 1,
                  textTransform: 'none',
                  fontWeight: 500,
                  fontSize: '0.86rem',
                  letterSpacing: '0.02em',
                  boxShadow: 'none',
                  '&:hover': { backgroundColor: '#c5a059' }
                }}
              >
                Thêm nước hoa mới
              </Button>
            </Box>

            <Paper elevation={0} sx={{ borderRadius: '20px', border: '1px solid rgba(0, 0, 0, 0.06)', overflow: 'hidden', backgroundColor: '#ffffff', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                  <CircularProgress sx={{ color: '#c5a059' }} />
                </Box>
              ) : (
                <TableContainer>
                  <Table>
                    <TableHead sx={{ backgroundColor: '#18181b' }}>
                      <TableRow>
                        <TableCell sx={{ color: '#ffffff', fontWeight: 600, fontSize: '0.82rem', letterSpacing: '0.05em' }}>HÌNH ẢNH</TableCell>
                        <TableCell sx={{ color: '#ffffff', fontWeight: 600, fontSize: '0.82rem', letterSpacing: '0.05em' }}>TÊN NƯỚC HOA</TableCell>
                        <TableCell sx={{ color: '#ffffff', fontWeight: 600, fontSize: '0.82rem', letterSpacing: '0.05em' }}>PHÂN LOẠI</TableCell>
                        <TableCell sx={{ color: '#ffffff', fontWeight: 600, fontSize: '0.82rem', letterSpacing: '0.05em' }}>GIÁ BÁN</TableCell>
                        <TableCell sx={{ color: '#ffffff', fontWeight: 600, fontSize: '0.82rem', letterSpacing: '0.05em' }} align="right">HÀNH ĐỘNG</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Array.isArray(products) && products.length > 0 ? (
                        products.map((p) => (
                          <TableRow key={p._id || Math.random()} hover sx={{ '&:hover': { backgroundColor: '#fcfbf9' } }}>
                            <TableCell>
                              <Avatar src={p.image} variant="rounded" sx={{ width: 50, height: 50, borderRadius: '10px' }} />
                            </TableCell>
                            <TableCell sx={{ fontWeight: 600, color: '#18181b' }}>{p.name}</TableCell>
                            <TableCell>
                              <Chip label={p.category} size="small" sx={{ backgroundColor: '#f4eedb', color: '#856434', fontWeight: 600, fontSize: '0.72rem' }} />
                            </TableCell>
                            <TableCell sx={{ color: '#18181b', fontWeight: 700, fontFamily: '"Plus Jakarta Sans", sans-serif', fontSize: '0.98rem' }}>{p.price}</TableCell>
                            <TableCell align="right">
                              <IconButton size="small" sx={{ color: '#71717a', '&:hover': { color: '#18181b' } }}><EditIcon fontSize="small" /></IconButton>
                              <IconButton size="small" sx={{ color: '#ef4444', ml: 1, '&:hover': { backgroundColor: 'rgba(239, 68, 68, 0.08)' } }}><DeleteOutlineIcon fontSize="small" /></IconButton>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} align="center" sx={{ py: 6, color: '#a1a1aa' }}>
                            Chưa có sản phẩm nào. Hãy bấm "Thêm nước hoa mới".
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Paper>
          </Box>
        );

      case 'users':
        return (
          <Box>
            <Typography variant="overline" sx={{ color: '#c5a059', letterSpacing: '0.2em', fontWeight: 600 }}>
              Accounts Management
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 600, fontFamily: '"Playfair Display", serif', color: '#18181b', mt: 0.5, mb: 1 }}>
              Quản Lý Người Dùng
            </Typography>
            <Typography variant="body2" sx={{ color: '#71717a', mb: 4 }}>
              Danh sách tài khoản khách hàng và quản trị viên được lưu trữ trong MongoDB Atlas
            </Typography>

            <Paper elevation={0} sx={{ borderRadius: '20px', border: '1px solid rgba(0, 0, 0, 0.06)', overflow: 'hidden', backgroundColor: '#ffffff', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
              <TableContainer>
                <Table>
                  <TableHead sx={{ backgroundColor: '#18181b' }}>
                    <TableRow>
                      <TableCell sx={{ color: '#ffffff', fontWeight: 600, fontSize: '0.82rem', letterSpacing: '0.05em' }}>NGƯỜI DÙNG</TableCell>
                      <TableCell sx={{ color: '#ffffff', fontWeight: 600, fontSize: '0.82rem', letterSpacing: '0.05em' }}>EMAIL</TableCell>
                      <TableCell sx={{ color: '#ffffff', fontWeight: 600, fontSize: '0.82rem', letterSpacing: '0.05em' }}>VAI TRÒ (ROLE)</TableCell>
                      <TableCell sx={{ color: '#ffffff', fontWeight: 600, fontSize: '0.82rem', letterSpacing: '0.05em' }}>NGÀY TẠO</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.length > 0 ? (
                      users.map((u) => (
                        <TableRow key={u._id || Math.random()} hover sx={{ '&:hover': { backgroundColor: '#fcfbf9' } }}>
                          <TableCell sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar sx={{ width: 38, height: 38, backgroundColor: u.role === 'admin' ? '#c5a059' : '#18181b', color: '#fff', fontSize: '0.85rem', fontWeight: 600 }}>
                              {(u.name || 'U').charAt(0).toUpperCase()}
                            </Avatar>
                            <Box>
                              <Typography variant="body2" sx={{ fontWeight: 600, color: '#18181b' }}>{u.name}</Typography>
                              <Typography variant="caption" sx={{ color: '#a1a1aa' }}>ID: {u._id?.slice(-6)}</Typography>
                            </Box>
                          </TableCell>
                          <TableCell sx={{ color: '#52525b', fontSize: '0.88rem' }}>{u.email}</TableCell>
                          <TableCell>
                            <Chip
                              label={u.role === 'admin' ? 'Quản trị viên' : 'Khách hàng'}
                              size="small"
                              sx={{
                                backgroundColor: u.role === 'admin' ? '#f4eedb' : '#f4f4f5',
                                color: u.role === 'admin' ? '#856434' : '#52525b',
                                fontWeight: 600,
                                fontSize: '0.75rem'
                              }}
                            />
                          </TableCell>
                          <TableCell sx={{ color: '#71717a', fontSize: '0.82rem' }}>
                            {u.createdAt ? new Date(u.createdAt).toLocaleDateString('vi-VN') : 'Mới tạo'}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} align="center" sx={{ py: 6, color: '#a1a1aa' }}>
                          Chưa có tài khoản người dùng nào.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Box>
        );

      case 'orders':
        return (
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Box>
                <Typography variant="overline" sx={{ color: '#c5a059', letterSpacing: '0.2em', fontWeight: 600 }}>
                  Order Fulfillment
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 600, fontFamily: '"Playfair Display", serif', color: '#18181b', mt: 0.5, mb: 1 }}>
                  Quản Lý Toàn Bộ Đơn Hàng ({orders.length})
                </Typography>
                <Typography variant="body2" sx={{ color: '#71717a' }}>
                  Theo dõi, quản lý tiến độ giao hàng và xác nhận thanh toán đơn mua
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1.5 }}>
                <Button
                  variant="outlined"
                  onClick={fetchOrders}
                  sx={{ borderRadius: '9999px', textTransform: 'none', borderColor: 'rgba(0,0,0,0.15)', color: '#18181b' }}
                >
                  Làm mới danh sách
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleClearAllOrders}
                  sx={{ borderRadius: '9999px', textTransform: 'none', borderColor: '#fca5a5', color: '#dc2626', '&:hover': { backgroundColor: '#fef2f2' } }}
                >
                  Xóa sạch đơn hàng
                </Button>
              </Box>
            </Box>

            <Paper elevation={0} sx={{ borderRadius: '20px', border: '1px solid rgba(0, 0, 0, 0.06)', backgroundColor: '#ffffff', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
              <TableContainer>
                <Table>
                  <TableHead sx={{ backgroundColor: '#18181b' }}>
                    <TableRow>
                      <TableCell sx={{ color: '#ffffff', fontWeight: 600, fontSize: '0.82rem', letterSpacing: '0.05em' }}>MÃ ĐƠN HÀNG</TableCell>
                      <TableCell sx={{ color: '#ffffff', fontWeight: 600, fontSize: '0.82rem', letterSpacing: '0.05em' }}>KHÁCH HÀNG / LIÊN HỆ</TableCell>
                      <TableCell sx={{ color: '#ffffff', fontWeight: 600, fontSize: '0.82rem', letterSpacing: '0.05em' }}>SẢN PHẨM</TableCell>
                      <TableCell sx={{ color: '#ffffff', fontWeight: 600, fontSize: '0.82rem', letterSpacing: '0.05em' }}>TỔNG TIỀN</TableCell>
                      <TableCell sx={{ color: '#ffffff', fontWeight: 600, fontSize: '0.82rem', letterSpacing: '0.05em' }}>THANH TOÁN</TableCell>
                      <TableCell sx={{ color: '#ffffff', fontWeight: 600, fontSize: '0.82rem', letterSpacing: '0.05em' }}>TRẠNG THÁI GIAO</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orders.length > 0 ? (
                      orders.map((ord) => (
                        <TableRow key={ord._id || ord.orderCode} hover sx={{ '&:hover': { backgroundColor: '#fcfbf9' } }}>
                          {/* Mã đơn & Thời gian */}
                          <TableCell>
                            <Typography variant="body2" sx={{ fontWeight: 700, color: '#005baa' }}>
                              {ord.orderCode}
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#a1a1aa' }}>
                              {ord.createdAt ? new Date(ord.createdAt).toLocaleDateString('vi-VN') : 'Mới tạo'}
                            </Typography>
                          </TableCell>

                          {/* Khách hàng & SĐT & Địa chỉ */}
                          <TableCell>
                            <Typography variant="body2" sx={{ fontWeight: 600, color: '#18181b' }}>
                              {ord.recipientName}
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#71717a', display: 'block' }}>
                              📞 {ord.phone}
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#a1a1aa', display: 'block', maxWidth: '240px' }} noWrap>
                              📍 {ord.address}
                            </Typography>
                          </TableCell>

                          {/* Sản phẩm */}
                          <TableCell>
                            <Typography variant="body2" sx={{ fontWeight: 600, color: '#18181b' }}>
                              {ord.items && ord.items.length > 0
                                ? `${ord.items.length} món: ${ord.items.map(i => `${i.name} (x${i.quantity})`).join(', ')}`
                                : 'Đơn hàng ESSENCE'}
                            </Typography>
                          </TableCell>

                          {/* Tổng tiền */}
                          <TableCell>
                            <Typography variant="body2" sx={{ fontWeight: 700, color: '#16a34a', fontSize: '0.96rem' }}>
                              {new Intl.NumberFormat('vi-VN').format(ord.totalAmount)} đ
                            </Typography>
                          </TableCell>

                          {/* Phương thức thanh toán */}
                          <TableCell>
                            <Chip
                              label={ord.paymentMethod === 'VNPAY' ? 'VNPAY (Đã trả)' : 'COD (Thu hộ)'}
                              size="small"
                              sx={{
                                backgroundColor: ord.paymentMethod === 'VNPAY' ? '#e0f2fe' : '#f4f4f5',
                                color: ord.paymentMethod === 'VNPAY' ? '#0369a1' : '#52525b',
                                fontWeight: 700,
                                fontSize: '0.72rem'
                              }}
                            />
                          </TableCell>

                          {/* Trạng thái đơn hàng */}
                          <TableCell>
                            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                              <select
                                value={ord.orderStatus || 'Processing'}
                                onChange={(e) => handleUpdateOrderStatus(ord._id || ord.orderCode, e.target.value)}
                                style={{
                                  padding: '5px 10px',
                                  borderRadius: '6px',
                                  border: '1px solid #d1d5db',
                                  backgroundColor: '#fff',
                                  fontSize: '0.82rem',
                                  fontWeight: 600,
                                  color: ord.orderStatus === 'Delivered' ? '#16a34a' : ord.orderStatus === 'Shipping' ? '#2563eb' : '#d97706',
                                  cursor: 'pointer'
                                }}
                              >
                                <option value="Processing">🟡 Đang xử lý</option>
                                <option value="Shipping">🔵 Đang giao</option>
                                <option value="Delivered">🟢 Đã giao</option>
                                <option value="Cancelled">🔴 Đã hủy</option>
                              </select>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} align="center" sx={{ py: 6, color: '#a1a1aa' }}>
                          Chưa có đơn hàng nào được ghi nhận.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: 'flex', backgroundColor: '#fcfbf9', minHeight: '100vh' }}>
      {/* Header Phía Trên */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          backgroundColor: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(12px)',
          color: '#18181b',
          borderBottom: '1px solid rgba(0, 0, 0, 0.06)'
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', height: 75 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#18181b' }}>
            Hệ Thống Quản Trị ESSENCE
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2" sx={{ fontWeight: 500, color: '#52525b' }}>
              Xin chào, <strong style={{ color: '#18181b' }}>{currentUser.name}</strong>
            </Typography>
            <Avatar sx={{ width: 34, height: 34, backgroundColor: '#c5a059', color: '#ffffff', fontSize: '0.88rem', fontWeight: 600 }}>
              {currentUser.name.charAt(0).toUpperCase()}
            </Avatar>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar Bên Trái */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#111111',
            color: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            borderRight: '1px solid rgba(255, 255, 255, 0.08)'
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box>
          {/* Logo ESSENCE */}
          <Box
            onClick={() => navigate('/')}
            sx={{
              p: 3.5,
              textAlign: 'center',
              cursor: 'pointer !important',
              userSelect: 'none',
              transition: 'opacity 0.2s ease',
              '&:hover': { opacity: 0.85 }
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                letterSpacing: '0.2em',
                fontFamily: '"Playfair Display", serif',
                color: '#ffffff',
                cursor: 'pointer !important',
                display: 'inline-flex',
                alignItems: 'baseline'
              }}
            >
              ESSENCE
              <Box component="span" sx={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#c5a059', ml: 0.5 }} />
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: '#71717a',
                fontSize: '0.68rem',
                letterSpacing: '0.15em',
                display: 'block',
                cursor: 'pointer !important',
                textTransform: 'uppercase',
                mt: 0.5
              }}
            >
              Console Management
            </Typography>
          </Box>

          <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.08)' }} />

          <Typography variant="caption" sx={{ px: 3, pt: 3, pb: 1, display: 'block', color: '#71717a', fontWeight: 600, letterSpacing: '0.1em' }}>
            DANH MỤC QUẢN TRỊ
          </Typography>

          <List sx={{ px: 2 }}>
            {/* Nút Chuyển Nhanh Về Trang Cửa Hàng */}
            <ListItem disablePadding sx={{ mb: 1.5 }}>
              <ListItemButton
                onClick={() => navigate('/')}
                sx={{
                  borderRadius: '10px',
                  border: '1px solid rgba(197, 160, 89, 0.4)',
                  color: '#dfc285',
                  backgroundColor: 'rgba(197, 160, 89, 0.06)',
                  '&:hover': { backgroundColor: 'rgba(197, 160, 89, 0.15)', borderColor: '#c5a059' }
                }}
              >
                <ListItemIcon sx={{ color: '#c5a059', minWidth: 38 }}>
                  <StorefrontIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary="Xem Trang Bán Hàng"
                  slotProps={{ primary: { fontSize: '0.88rem', fontWeight: 600 } }}
                />
              </ListItemButton>
            </ListItem>

            {/* Nav Items */}
            <ListItem disablePadding sx={{ mb: 0.8 }}>
              <ListItemButton
                selected={activeTab === 'dashboard'}
                onClick={() => setActiveTab('dashboard')}
                sx={{
                  borderRadius: '10px',
                  '&.Mui-selected': { backgroundColor: 'rgba(197, 160, 89, 0.15)', color: '#dfc285' },
                  '&:hover': { backgroundColor: '#18181b' }
                }}
              >
                <ListItemIcon sx={{ color: activeTab === 'dashboard' ? '#c5a059' : '#71717a', minWidth: 38 }}>
                  <DashboardIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary="Bảng Điều Khiển"
                  slotProps={{ primary: { fontSize: '0.88rem', fontWeight: activeTab === 'dashboard' ? 600 : 400 } }}
                />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding sx={{ mb: 0.8 }}>
              <ListItemButton
                selected={activeTab === 'products'}
                onClick={() => setActiveTab('products')}
                sx={{
                  borderRadius: '10px',
                  '&.Mui-selected': { backgroundColor: 'rgba(197, 160, 89, 0.15)', color: '#dfc285' },
                  '&:hover': { backgroundColor: '#18181b' }
                }}
              >
                <ListItemIcon sx={{ color: activeTab === 'products' ? '#c5a059' : '#71717a', minWidth: 38 }}>
                  <InventoryIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary="Quản Lý Sản Phẩm"
                  slotProps={{ primary: { fontSize: '0.88rem', fontWeight: activeTab === 'products' ? 600 : 400 } }}
                />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding sx={{ mb: 0.8 }}>
              <ListItemButton
                selected={activeTab === 'users'}
                onClick={() => setActiveTab('users')}
                sx={{
                  borderRadius: '10px',
                  '&.Mui-selected': { backgroundColor: 'rgba(197, 160, 89, 0.15)', color: '#dfc285' },
                  '&:hover': { backgroundColor: '#18181b' }
                }}
              >
                <ListItemIcon sx={{ color: activeTab === 'users' ? '#c5a059' : '#71717a', minWidth: 38 }}>
                  <PeopleIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary="Người Dùng"
                  slotProps={{ primary: { fontSize: '0.88rem', fontWeight: activeTab === 'users' ? 600 : 400 } }}
                />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding sx={{ mb: 0.8 }}>
              <ListItemButton
                selected={activeTab === 'orders'}
                onClick={() => setActiveTab('orders')}
                sx={{
                  borderRadius: '10px',
                  '&.Mui-selected': { backgroundColor: 'rgba(197, 160, 89, 0.15)', color: '#dfc285' },
                  '&:hover': { backgroundColor: '#18181b' }
                }}
              >
                <ListItemIcon sx={{ color: activeTab === 'orders' ? '#c5a059' : '#71717a', minWidth: 38 }}>
                  <ShoppingBagIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary="Đơn Hàng"
                  slotProps={{ primary: { fontSize: '0.88rem', fontWeight: activeTab === 'orders' ? 600 : 400 } }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>

        {/* Thông tin chân trang Sidebar */}
        <Box sx={{ p: 2.5, borderTop: '1px solid rgba(255, 255, 255, 0.08)', backgroundColor: '#0a0a0a' }}>
          <Typography variant="caption" sx={{ color: '#71717a', display: 'block', fontSize: '0.75rem' }}>Quản trị viên:</Typography>
          <Typography variant="body2" sx={{ fontWeight: 600, color: '#ffffff', mb: 1.2 }}>{currentUser.name}</Typography>
          <Button
            size="small"
            startIcon={<LogoutIcon sx={{ fontSize: '15px !important' }} />}
            onClick={handleLogout}
            sx={{ color: '#ef4444', textTransform: 'none', p: 0, fontSize: '0.82rem', '&:hover': { color: '#f87171' } }}
          >
            Đăng xuất
          </Button>
        </Box>
      </Drawer>

      {/* Nội Dung Chính */}
      <Box component="main" sx={{ flexGrow: 1, p: 5, mt: 8 }}>
        {renderContent()}
      </Box>

      {/* Popup Dialog Thêm Sản Phẩm Mới */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: '20px', p: 1 }
        }}
      >
        <DialogTitle sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 600, fontSize: '1.4rem' }}>
          Thêm Nước Hoa Mới
        </DialogTitle>
        <Box component="form" onSubmit={handleAddProduct}>
          <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 2.2 }}>
            <TextField
              label="Tên sản phẩm"
              fullWidth
              required
              size="small"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
            <TextField
              label="Phân loại (VD: Eau de Parfum, Extrait de Parfum)"
              fullWidth
              required
              size="small"
              value={newProduct.category}
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
            />
            <TextField
              label="Giá bán (VD: 4.200.000₫)"
              fullWidth
              required
              size="small"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            />
            <TextField
              label="Đường dẫn ảnh (URL)"
              fullWidth
              required
              size="small"
              value={newProduct.image}
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
            />
            <TextField
              label="Mô tả nốt hương"
              fullWidth
              multiline
              rows={3}
              size="small"
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            />
          </DialogContent>
          <DialogActions sx={{ p: 2.5 }}>
            <Button onClick={() => setOpenDialog(false)} sx={{ color: '#71717a', textTransform: 'none' }}>
              Hủy
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: '#18181b',
                color: '#ffffff',
                borderRadius: '9999px',
                px: 3,
                textTransform: 'none',
                fontWeight: 600,
                '&:hover': { backgroundColor: '#c5a059' }
              }}
            >
              Lưu Sản Phẩm
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};

export default AdminPage;