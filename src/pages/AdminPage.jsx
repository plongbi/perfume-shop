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

// Import Icons chuẩn từ Material UI
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

const drawerWidth = 260;

const AdminPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState([]);
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

  // Lấy thông tin Admin đăng nhập từ localStorage (Không tự động gán mặc định)
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

  useEffect(() => {
    fetchProducts();
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

  // Đăng xuất -> Xóa localStorage và đẩy về trang Đăng nhập / Đăng ký
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
            <Typography variant="h4" sx={{ fontWeight: 700, fontFamily: '"Playfair Display", serif', mb: 1, color: '#1a1a1a' }}>
              Dashboard
            </Typography>
            <Typography variant="body2" sx={{ color: '#777', mb: 4 }}>
              Tổng quan chỉ số hoạt động của cửa hàng nước hoa ESSENCE
            </Typography>

            {/* 3 Thẻ chỉ số tổng quan */}
            <Grid container spacing={3} sx={{ mb: 5 }}>
              <Grid item xs={12} sm={4}>
                <Paper elevation={0} sx={{ p: 3, borderRadius: '16px', background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)', color: '#fff' }}>
                  <Typography variant="subtitle2" sx={{ opacity: 0.9 }}>Users Volume</Typography>
                  <Typography variant="h3" sx={{ fontWeight: 700, my: 1.5 }}>8</Typography>
                  <Button size="small" onClick={() => setActiveTab('users')} endIcon={<ArrowForwardIcon fontSize="small" />} sx={{ color: '#fff', p: 0, textTransform: 'none' }}>
                    View Details
                  </Button>
                </Paper>
              </Grid>

              <Grid item xs={12} sm={4}>
                <Paper elevation={0} sx={{ p: 3, borderRadius: '16px', background: 'linear-gradient(135deg, #eab308 0%, #ca8a04 100%)', color: '#fff' }}>
                  <Typography variant="subtitle2" sx={{ opacity: 0.9 }}>Products Volume</Typography>
                  <Typography variant="h3" sx={{ fontWeight: 700, my: 1.5 }}>{products.length}</Typography>
                  <Button size="small" onClick={() => setActiveTab('products')} endIcon={<ArrowForwardIcon fontSize="small" />} sx={{ color: '#fff', p: 0, textTransform: 'none' }}>
                    View Details
                  </Button>
                </Paper>
              </Grid>

              <Grid item xs={12} sm={4}>
                <Paper elevation={0} sx={{ p: 3, borderRadius: '16px', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: '#fff' }}>
                  <Typography variant="subtitle2" sx={{ opacity: 0.9 }}>Orders Volume</Typography>
                  <Typography variant="h3" sx={{ fontWeight: 700, my: 1.5 }}>25</Typography>
                  <Button size="small" onClick={() => setActiveTab('orders')} endIcon={<ArrowForwardIcon fontSize="small" />} sx={{ color: '#fff', p: 0, textTransform: 'none' }}>
                    View Details
                  </Button>
                </Paper>
              </Grid>
            </Grid>

            {/* Bảng Xem Nhanh Sản Phẩm */}
            <Paper elevation={0} sx={{ p: 3, borderRadius: '16px', border: '1px solid #eaeaea' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, fontFamily: '"Playfair Display", serif' }}>
                  Sản phẩm mới cập nhật
                </Typography>
                <Button variant="outlined" size="small" onClick={() => setActiveTab('products')} sx={{ textTransform: 'none', borderColor: '#1a1a1a', color: '#1a1a1a' }}>
                  Xem tất cả
                </Button>
              </Box>
              <TableContainer>
                <Table>
                  <TableHead sx={{ backgroundColor: '#fafafa' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>Sản phẩm</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Loại</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Giá bán</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Đánh giá</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(Array.isArray(products) ? products : []).slice(0, 5).map((row) => (
                      <TableRow key={row._id || Math.random()} hover>
                        <TableCell sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar src={row.image} variant="rounded" sx={{ width: 40, height: 40 }} />
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>{row.name}</Typography>
                        </TableCell>
                        <TableCell><Chip label={row.category || 'N/A'} size="small" sx={{ backgroundColor: '#f0f0f0', fontSize: '0.75rem' }} /></TableCell>
                        <TableCell sx={{ color: '#d4af37', fontWeight: 600 }}>{row.price}</TableCell>
                        <TableCell>{row.rating || 5} ⭐</TableCell>
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
                <Typography variant="h4" sx={{ fontWeight: 700, fontFamily: '"Playfair Display", serif', color: '#1a1a1a' }}>
                  Quản Lý Sản Phẩm
                </Typography>
                <Typography variant="body2" sx={{ color: '#777' }}>
                  Danh sách nước hoa trong cơ sở dữ liệu MongoDB
                </Typography>
              </Box>

              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setOpenDialog(true)}
                sx={{ backgroundColor: '#1a1a1a', color: '#fff', borderRadius: '8px', px: 3, textTransform: 'none', '&:hover': { backgroundColor: '#b89735' } }}
              >
                Thêm sản phẩm mới
              </Button>
            </Box>

            <Paper elevation={0} sx={{ borderRadius: '16px', border: '1px solid #eaeaea', overflow: 'hidden' }}>
              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
                  <CircularProgress sx={{ color: '#b89735' }} />
                </Box>
              ) : (
                <TableContainer>
                  <Table>
                    <TableHead sx={{ backgroundColor: '#1a1a1a' }}>
                      <TableRow>
                        <TableCell sx={{ color: '#fff', fontWeight: 600 }}>Hình ảnh</TableCell>
                        <TableCell sx={{ color: '#fff', fontWeight: 600 }}>Tên nước hoa</TableCell>
                        <TableCell sx={{ color: '#fff', fontWeight: 600 }}>Phân loại</TableCell>
                        <TableCell sx={{ color: '#fff', fontWeight: 600 }}>Giá</TableCell>
                        <TableCell sx={{ color: '#fff', fontWeight: 600 }} align="right">Hành động</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Array.isArray(products) && products.length > 0 ? (
                        products.map((p) => (
                          <TableRow key={p._id || Math.random()} hover>
                            <TableCell>
                              <Avatar src={p.image} variant="rounded" sx={{ width: 48, height: 48 }} />
                            </TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>{p.name}</TableCell>
                            <TableCell>{p.category}</TableCell>
                            <TableCell sx={{ color: '#d4af37', fontWeight: 700 }}>{p.price}</TableCell>
                            <TableCell align="right">
                              <IconButton size="small" sx={{ color: '#666' }}><EditIcon fontSize="small" /></IconButton>
                              <IconButton size="small" sx={{ color: '#ef4444' }}><DeleteOutlineIcon fontSize="small" /></IconButton>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} align="center" sx={{ py: 4, color: '#777' }}>
                            Chưa có sản phẩm nào trong cơ sở dữ liệu. Hãy bấm "Thêm sản phẩm mới".
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
            <Typography variant="h4" sx={{ fontWeight: 700, fontFamily: '"Playfair Display", serif', mb: 1 }}>
              Quản Lý Người Dùng
            </Typography>
            <Typography variant="body2" sx={{ color: '#777', mb: 4 }}>
              Danh sách tài khoản khách hàng và quản trị viên
            </Typography>
            <Paper elevation={0} sx={{ p: 4, textAlign: 'center', borderRadius: '16px', border: '1px solid #eaeaea' }}>
              <Typography color="textSecondary">Danh sách người dùng đang được đồng bộ...</Typography>
            </Paper>
          </Box>
        );

      case 'orders':
        return (
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, fontFamily: '"Playfair Display", serif', mb: 1 }}>
              Quản Lý Đơn Hàng
            </Typography>
            <Typography variant="body2" sx={{ color: '#777', mb: 4 }}>
              Theo dõi tình trạng đơn hàng từ khách mua
            </Typography>
            <Paper elevation={0} sx={{ p: 4, textAlign: 'center', borderRadius: '16px', border: '1px solid #eaeaea' }}>
              <Typography color="textSecondary">Hiện tại chưa có đơn hàng mới nào.</Typography>
            </Paper>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: 'flex', backgroundColor: '#faf9f6', minHeight: '100vh' }}>
      {/* Header Phía Trên */}
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          backgroundColor: '#ffffff',
          color: '#1a1a1a',
          boxShadow: 'none',
          borderBottom: '1px solid #eaeaea'
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Hệ thống Quản trị ESSENCE
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              Welcome, {currentUser.name}!
            </Typography>
            <Avatar sx={{ width: 32, height: 32, backgroundColor: '#d4af37', fontSize: '0.85rem' }}>
              A
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
            justifyContent: 'space-between'
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box>
          {/* Logo ESSENCE - Nhấp vào để quay về Trang Chủ mua hàng */}
          <Box
            onClick={() => navigate('/')}
            sx={{
              p: 3,
              textAlign: 'center',
              cursor: 'pointer !important',
              userSelect: 'none',
              transition: 'all 0.2s ease',
              '&:hover': {
                opacity: 0.8,
                transform: 'scale(1.02)'
              },
              '& *': {
                cursor: 'pointer !important'
              }
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                letterSpacing: '3px',
                fontFamily: '"Playfair Display", serif',
                color: '#fff',
                cursor: 'pointer !important'
              }}
            >
              ESSENCE<span style={{ color: '#d4af37' }}>.</span>
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: '#777',
                fontSize: '0.7rem',
                letterSpacing: '1px',
                display: 'block',
                cursor: 'pointer !important'
              }}
            >
              ADMIN DASHBOARD
            </Typography>
          </Box>

          <Divider sx={{ borderColor: '#222' }} />

          <Typography variant="caption" sx={{ px: 3, pt: 2, pb: 1, display: 'block', color: '#555', fontWeight: 700 }}>
            FEATURES
          </Typography>

          <List sx={{ px: 1.5 }}>
            {/* Nút Chuyển Nhanh Về Trang Cửa Hàng */}
            <ListItem disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                onClick={() => navigate('/')}
                sx={{
                  borderRadius: '8px',
                  border: '1px dashed #d4af37',
                  color: '#d4af37',
                  '&:hover': { backgroundColor: '#1a1a1a' }
                }}
              >
                <ListItemIcon sx={{ color: '#d4af37', minWidth: 40 }}>
                  <StorefrontIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Xem Cửa Hàng"
                  slotProps={{ primary: { fontSize: '0.9rem', fontWeight: 600 } }}
                />
              </ListItemButton>
            </ListItem>

            {/* Nav Items */}
            <ListItem disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                selected={activeTab === 'dashboard'}
                onClick={() => setActiveTab('dashboard')}
                sx={{ borderRadius: '8px', '&.Mui-selected': { backgroundColor: '#222', color: '#d4af37' }, '&:hover': { backgroundColor: '#1a1a1a' } }}
              >
                <ListItemIcon sx={{ color: activeTab === 'dashboard' ? '#d4af37' : '#888', minWidth: 40 }}>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Dashboard"
                  slotProps={{ primary: { fontSize: '0.9rem', fontWeight: 500 } }}
                />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                selected={activeTab === 'users'}
                onClick={() => setActiveTab('users')}
                sx={{ borderRadius: '8px', '&.Mui-selected': { backgroundColor: '#222', color: '#d4af37' }, '&:hover': { backgroundColor: '#1a1a1a' } }}
              >
                <ListItemIcon sx={{ color: activeTab === 'users' ? '#d4af37' : '#888', minWidth: 40 }}>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText
                  primary="User"
                  slotProps={{ primary: { fontSize: '0.9rem', fontWeight: 500 } }}
                />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                selected={activeTab === 'products'}
                onClick={() => setActiveTab('products')}
                sx={{ borderRadius: '8px', '&.Mui-selected': { backgroundColor: '#222', color: '#d4af37' }, '&:hover': { backgroundColor: '#1a1a1a' } }}
              >
                <ListItemIcon sx={{ color: activeTab === 'products' ? '#d4af37' : '#888', minWidth: 40 }}>
                  <InventoryIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Product"
                  slotProps={{ primary: { fontSize: '0.9rem', fontWeight: 500 } }}
                />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                selected={activeTab === 'orders'}
                onClick={() => setActiveTab('orders')}
                sx={{ borderRadius: '8px', '&.Mui-selected': { backgroundColor: '#222', color: '#d4af37' }, '&:hover': { backgroundColor: '#1a1a1a' } }}
              >
                <ListItemIcon sx={{ color: activeTab === 'orders' ? '#d4af37' : '#888', minWidth: 40 }}>
                  <ShoppingBagIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Order"
                  slotProps={{ primary: { fontSize: '0.9rem', fontWeight: 500 } }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>

        {/* Thông tin chân trang Sidebar */}
        <Box sx={{ p: 2, borderTop: '1px solid #222', backgroundColor: '#0a0a0a' }}>
          <Typography variant="caption" sx={{ color: '#666', display: 'block' }}>Logged in as:</Typography>
          <Typography variant="body2" sx={{ fontWeight: 600, color: '#fff', mb: 1 }}>{currentUser.name}</Typography>
          <Button size="small" startIcon={<LogoutIcon fontSize="small" />} onClick={handleLogout} sx={{ color: '#ef4444', textTransform: 'none', p: 0, fontSize: '0.8rem' }}>
            Đăng xuất
          </Button>
        </Box>
      </Drawer>

      {/* Nội Dung Chính */}
      <Box component="main" sx={{ flexGrow: 1, p: 4, mt: 8 }}>
        {renderContent()}
      </Box>

      {/* Popup Dialog Thêm Sản Phẩm Mới */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 700 }}>Thêm nước hoa mới</DialogTitle>
        <Box component="form" onSubmit={handleAddProduct}>
          <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField label="Tên sản phẩm" fullWidth required size="small" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
            <TextField label="Phân loại (VD: Eau de Parfum)" fullWidth required size="small" value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} />
            <TextField label="Giá bán (VD: 4.200.000đ)" fullWidth required size="small" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
            <TextField label="Đường dẫn ảnh (URL)" fullWidth required size="small" value={newProduct.image} onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })} />
            <TextField label="Mô tả nốt hương" fullWidth multiline rows={3} size="small" value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} />
          </DialogContent>
          <DialogActions sx={{ p: 2.5 }}>
            <Button onClick={() => setOpenDialog(false)} sx={{ color: '#666' }}>Hủy</Button>
            <Button type="submit" variant="contained" sx={{ backgroundColor: '#1a1a1a', color: '#fff', '&:hover': { backgroundColor: '#b89735' } }}>Lưu sản phẩm</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};

export default AdminPage;