import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Badge } from '@mui/material';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);

  // Lắng nghe sự thay đổi URL để cập nhật thông tin user từ localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      setUser(null);
    }
  }, [location.pathname]);

  // Xử lý sự kiện Đăng xuất
  const handleLogout = () => {
    localStorage.removeItem('user'); // Xóa tài khoản đăng nhập
    setUser(null);
    navigate('/login'); // Chuyển hướng ngay về trang Đăng nhập / Đăng ký
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#ffffff', color: '#1a1a1a', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
      <Toolbar disableGutters sx={{ justifyContent: 'space-between', px: { xs: 3, md: 6 }, width: '100%' }}>
        {/* Logo */}
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            fontWeight: 800,
            letterSpacing: '3px',
            color: '#111',
            textDecoration: 'none',
            fontFamily: '"Playfair Display", serif'
          }}
        >
          ESSENCE<span style={{ color: '#d4af37' }}>.</span>
        </Typography>

        {/* Links Navigation */}
        <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
          <Button component={Link} to="/" sx={{ color: '#1a1a1a', textTransform: 'none', fontWeight: 500 }}>
            Trang Chủ
          </Button>
          <Button component={Link} to="/products" sx={{ color: '#1a1a1a', textTransform: 'none', fontWeight: 500 }}>
            Sản Phẩm
          </Button>

          {/* Nút sang Trang Quản Trị dành riêng cho Admin */}
          {user && user.role === 'admin' && (
            <Button
              component={Link}
              to="/admin"
              startIcon={<AdminPanelSettingsOutlinedIcon />}
              sx={{
                color: '#b89735',
                borderColor: '#b89735',
                border: '1px solid',
                borderRadius: '20px',
                px: 2,
                py: 0.5,
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '0.85rem',
                '&:hover': { backgroundColor: '#b89735', color: '#fff' }
              }}
            >
              Trang Quản Trị
            </Button>
          )}

          {/* Biểu tượng Giỏ hàng */}
          <IconButton component={Link} to="/cart" sx={{ color: '#1a1a1a' }}>
            <Badge badgeContent={0} color="primary">
              <ShoppingBagOutlinedIcon />
            </Badge>
          </IconButton>

          {/* Khu vực Tài khoản / Đăng xuất */}
          {user ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Typography variant="body2" sx={{ fontWeight: 600, color: '#1a1a1a' }}>
                Hello, {user.name || 'Admin'}
              </Typography>
              <Button
                onClick={handleLogout}
                variant="text"
                size="small"
                sx={{ color: '#888', textTransform: 'none', minWidth: 'auto' }}
              >
                Đăng xuất
              </Button>
            </Box>
          ) : (
            <Button
              component={Link}
              to="/login"
              variant="contained"
              sx={{
                backgroundColor: '#1a1a1a',
                color: '#fff',
                borderRadius: '20px',
                px: 2.5,
                textTransform: 'none',
                '&:hover': { backgroundColor: '#b89735' }
              }}
            >
              Đăng Nhập
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;