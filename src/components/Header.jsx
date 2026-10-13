import React from 'react';
import { AppBar, Box, Toolbar, Typography, Button, IconButton, Badge } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  // Lấy đường dẫn hiện tại của trang web (ví dụ: "/" hoặc "/products")
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: '#ffffff',
        color: '#1a1a1a',
        borderBottom: '1px solid #eaeaea',
        width: '100%',
        boxSizing: 'border-box'
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          px: { xs: 3, md: 6 },
          py: 1.5,
          minHeight: '75px !important'
        }}
      >

        {/* 1. Logo thương hiệu */}
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            fontWeight: 800,
            letterSpacing: '3px',
            color: '#111',
            cursor: 'pointer',
            textDecoration: 'none',
            fontSize: { xs: '1.2rem', md: '1.5rem' },
            fontFamily: '"Playfair Display", serif',
          }}
        >
          ESSENCE<span style={{ color: '#d4af37' }}>.</span>
        </Typography>

        {/* 2. Menu điều hướng giữa */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 4 }}>
          {/* Nút Trang Chủ: Chỉ in đậm khi đang ở đúng trang chủ "/" */}
          <Button
            component={Link}
            to="/"
            sx={{
              color: currentPath === '/' ? '#111' : '#555',
              fontWeight: currentPath === '/' ? 700 : 500,
              fontSize: '0.95rem',
              borderBottom: currentPath === '/' ? '2px solid #b89735' : '2px solid transparent',
              borderRadius: 0,
              pb: 0.5,
              textTransform: 'none',
              '&:hover': { color: '#b89735', backgroundColor: 'transparent' }
            }}
          >
            Trang Chủ
          </Button>

          {/* Nút Bộ Sưu Tập: Chỉ in đậm khi đang ở trang sản phẩm "/products" */}
          <Button
            component={Link}
            to="/products"
            sx={{
              color: currentPath === '/products' ? '#111' : '#555',
              fontWeight: currentPath === '/products' ? 700 : 500,
              fontSize: '0.95rem',
              borderBottom: currentPath === '/products' ? '2px solid #b89735' : '2px solid transparent',
              borderRadius: 0,
              pb: 0.5,
              textTransform: 'none',
              '&:hover': { color: '#b89735', backgroundColor: 'transparent' }
            }}
          >
            Bộ Sưu Tập
          </Button>

          {/* Nút Thương Hiệu: Có thể để dẫn về trang sản phẩm hoặc trang chung */}
          <Button
            component={Link}
            to="/products"
            sx={{
              color: '#555',
              fontWeight: 500,
              fontSize: '0.95rem',
              borderBottom: '2px solid transparent',
              borderRadius: 0,
              pb: 0.5,
              textTransform: 'none',
              '&:hover': { color: '#b89735', backgroundColor: 'transparent' }
            }}
          >
            Thương Hiệu
          </Button>
        </Box>

        {/* 3. Khu vực Icon bên phải */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <IconButton sx={{ color: '#333' }}>
            <SearchIcon />
          </IconButton>

          <IconButton sx={{ color: '#333' }}>
            <Badge>
              <ShoppingBagOutlinedIcon />
            </Badge>
          </IconButton>

          <Button
            component={Link}
            to="/login"
            variant="outlined"
            startIcon={<PersonOutlineOutlinedIcon />}
            sx={{
              borderColor: '#1a1a1a',
              color: '#1a1a1a',
              borderRadius: '20px',
              textTransform: 'none',
              px: 2.5,
              py: 0.8,
              fontWeight: 600,
              '&:hover': {
                borderColor: '#d4af37',
                backgroundColor: '#d4af37',
                color: '#fff'
              }
            }}
          >
            Đăng Nhập
          </Button>
        </Box>

      </Toolbar>
    </AppBar>
  );
};

export default Header;