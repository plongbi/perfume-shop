import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Badge, Container } from '@mui/material';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalItems } = useCart();
  const [user, setUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      setUser(null);
    }
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.92)' : 'rgba(252, 251, 249, 0.96)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid',
        borderColor: scrolled ? 'rgba(0, 0, 0, 0.08)' : 'rgba(0, 0, 0, 0.04)',
        transition: 'all 0.3s ease',
        color: '#18181b',
        zIndex: 1100
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between', height: { xs: 70, md: 80 } }}>
          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              component={Link}
              to="/"
              sx={{
                fontWeight: 700,
                fontSize: { xs: '1.4rem', md: '1.7rem' },
                letterSpacing: '0.2em',
                color: '#18181b',
                textDecoration: 'none',
                fontFamily: '"Playfair Display", serif',
                display: 'inline-flex',
                alignItems: 'baseline',
                transition: 'opacity 0.2s',
                '&:hover': { opacity: 0.85 }
              }}
            >
              ESSENCE
              <Box
                component="span"
                sx={{
                  display: 'inline-block',
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: '#c5a059',
                  ml: 0.5
                }}
              />
            </Typography>
          </Box>

          {/* Links Navigation */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 4, alignItems: 'center' }}>
            <Button
              component={Link}
              to="/"
              sx={{
                color: isActive('/') ? '#18181b' : '#71717a',
                textTransform: 'none',
                fontWeight: isActive('/') ? 600 : 400,
                fontSize: '0.92rem',
                letterSpacing: '0.04em',
                position: 'relative',
                p: '6px 2px',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: isActive('/') ? '100%' : '0%',
                  height: '1.5px',
                  backgroundColor: '#c5a059',
                  transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                },
                '&:hover': {
                  color: '#18181b',
                  backgroundColor: 'transparent',
                  '&::after': { width: '100%' }
                }
              }}
            >
              Trang Chủ
            </Button>
            <Button
              component={Link}
              to="/products"
              sx={{
                color: isActive('/products') ? '#18181b' : '#71717a',
                textTransform: 'none',
                fontWeight: isActive('/products') ? 600 : 400,
                fontSize: '0.92rem',
                letterSpacing: '0.04em',
                position: 'relative',
                p: '6px 2px',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: isActive('/products') ? '100%' : '0%',
                  height: '1.5px',
                  backgroundColor: '#c5a059',
                  transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                },
                '&:hover': {
                  color: '#18181b',
                  backgroundColor: 'transparent',
                  '&::after': { width: '100%' }
                }
              }}
            >
              Bộ Sưu Tập
            </Button>

            {/* Nút sang Trang Quản Trị dành riêng cho Admin */}
            {user && user.role === 'admin' && (
              <Button
                component={Link}
                to="/admin"
                startIcon={<AdminPanelSettingsOutlinedIcon sx={{ fontSize: '18px !important' }} />}
                sx={{
                  color: '#c5a059',
                  backgroundColor: 'rgba(197, 160, 89, 0.08)',
                  borderRadius: '9999px',
                  px: 2.2,
                  py: 0.6,
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '0.82rem',
                  letterSpacing: '0.03em',
                  border: '1px solid rgba(197, 160, 89, 0.3)',
                  transition: 'all 0.25s ease',
                  '&:hover': {
                    backgroundColor: '#c5a059',
                    color: '#ffffff',
                    borderColor: '#c5a059'
                  }
                }}
              >
                Trang Quản Trị
              </Button>
            )}
          </Box>

          {/* Action Area */}
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <IconButton
              component={Link}
              to="/cart"
              sx={{
                color: '#18181b',
                p: 1.2,
                borderRadius: '50%',
                border: '1px solid rgba(0, 0, 0, 0.06)',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  borderColor: 'rgba(0, 0, 0, 0.15)'
                }
              }}
            >
              <Badge
                badgeContent={totalItems}
                sx={{
                  '& .MuiBadge-badge': {
                    backgroundColor: '#c5a059',
                    color: '#fff',
                    fontSize: '0.7rem',
                    fontWeight: 600
                  }
                }}
              >
                <ShoppingBagOutlinedIcon sx={{ fontSize: '20px' }} />
              </Badge>
            </IconButton>

            {user ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.8 }}>
                <Box
                  component={Link}
                  to="/profile"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    textDecoration: 'none',
                    cursor: 'pointer',
                    '&:hover Typography': { color: '#c5a059' }
                  }}
                >
                  {user.avatar ? (
                    <Box
                      component="img"
                      src={user.avatar}
                      alt={user.name}
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '1.5px solid #c5a059'
                      }}
                    />
                  ) : (
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        backgroundColor: '#f4eedb',
                        color: '#a78241',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 600,
                        fontSize: '0.82rem'
                      }}
                    >
                      {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </Box>
                  )}
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#27272a', fontSize: '0.88rem', transition: 'color 0.2s' }}>
                    {user.name || 'Người dùng'}
                  </Typography>
                </Box>
                <Button
                  onClick={handleLogout}
                  variant="text"
                  size="small"
                  startIcon={<LogoutOutlinedIcon sx={{ fontSize: '15px !important' }} />}
                  sx={{
                    color: '#a1a1aa',
                    textTransform: 'none',
                    minWidth: 'auto',
                    fontSize: '0.82rem',
                    p: '4px 8px',
                    borderRadius: '6px',
                    '&:hover': { color: '#ef4444', backgroundColor: 'rgba(239, 68, 68, 0.05)' }
                  }}
                >
                  Thoát
                </Button>
              </Box>
            ) : (
              <Button
                component={Link}
                to="/login"
                startIcon={<PersonOutlineOutlinedIcon sx={{ fontSize: '17px !important' }} />}
                variant="outlined"
                sx={{
                  color: '#18181b',
                  borderColor: '#18181b',
                  borderRadius: '9999px',
                  px: 2.8,
                  py: 0.7,
                  fontSize: '0.84rem',
                  fontWeight: 500,
                  letterSpacing: '0.03em',
                  textTransform: 'none',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: '#18181b',
                    color: '#ffffff',
                    borderColor: '#18181b'
                  }
                }}
              >
                Đăng Nhập
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;