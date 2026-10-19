import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { createTheme, ThemeProvider, CssBaseline, Box, Container, Typography, Button, Grid } from '@mui/material';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CardGiftcardOutlinedIcon from '@mui/icons-material/CardGiftcardOutlined';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import Footer from './components/Footer';
import ProductPage from './pages/ProductPage';
import AuthPage from './pages/AuthPage';
import AdminPage from './pages/AdminPage';
import CartPage from './pages/CartPage';
import VNPayPaymentPage from './pages/VNPayPaymentPage';
import ProfilePage from './pages/ProfilePage';
import ProductDetailPage from './pages/ProductDetailPage';
import { CartProvider, useCart } from './context/CartContext';
import './App.css';

// Thiết lập theme tùy biến toàn diện cho Material UI phù hợp thời đại hiện nay
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#18181b',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#c5a059',
      light: '#e2c68e',
      dark: '#a78241',
    },
    background: {
      default: '#fcfbf9',
      paper: '#ffffff',
    },
    text: {
      primary: '#18181b',
      secondary: '#71717a',
    },
    divider: 'rgba(0, 0, 0, 0.06)',
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", "Montserrat", sans-serif',
    h1: { fontFamily: '"Playfair Display", serif' },
    h2: { fontFamily: '"Playfair Display", serif' },
    h3: { fontFamily: '"Playfair Display", serif' },
    h4: { fontFamily: '"Playfair Display", serif' },
    h5: { fontFamily: '"Playfair Display", serif' },
    h6: { fontFamily: '"Playfair Display", serif' },
    button: {
      textTransform: 'none',
      letterSpacing: '0.02em',
    },
  },
  shape: {
    borderRadius: 8,
  },
});

// Component kiểm tra quyền truy cập Admin
const ProtectedAdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user || user.role !== 'admin') {
    alert('Bạn không có quyền truy cập vào trang Quản trị!');
    return <Navigate to="/" replace />;
  }
  return children;
};

const HomePage = () => {
  const { addToCart } = useCart();
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 28, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <HeroBanner />

      {/* Cam kết thương hiệu (Values Bar) - 5 Giá trị Cốt Lõi lấp đầy không gian */}
      <Box sx={{ borderBottom: '1px solid rgba(0,0,0,0.06)', backgroundColor: '#ffffff', py: 4 }}>
        <Container maxWidth="xl" sx={{ px: { xs: 2, md: 5 } }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
                lg: 'repeat(5, 1fr)'
              },
              gap: { xs: 2.5, lg: 3 },
              alignItems: 'center'
            }}
          >
            {/* 1. Chính Hãng */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, px: 1 }}>
              <Box sx={{ p: 1.3, borderRadius: '50%', backgroundColor: 'rgba(197, 160, 89, 0.1)', color: '#c5a059', display: 'flex', flexShrink: 0 }}>
                <VerifiedOutlinedIcon fontSize="medium" />
              </Box>
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: '0.88rem', color: '#18181b', lineHeight: 1.3 }}>100% Chính Hãng</Typography>
                <Typography variant="caption" sx={{ color: '#71717a', fontSize: '0.76rem' }}>Nhập khẩu trực tiếp EU/US</Typography>
              </Box>
            </Box>

            {/* 2. Giao Hàng */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, px: 1 }}>
              <Box sx={{ p: 1.3, borderRadius: '50%', backgroundColor: 'rgba(197, 160, 89, 0.1)', color: '#c5a059', display: 'flex', flexShrink: 0 }}>
                <LocalShippingOutlinedIcon fontSize="medium" />
              </Box>
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: '0.88rem', color: '#18181b', lineHeight: 1.3 }}>Giao Hàng Hoả Tốc</Typography>
                <Typography variant="caption" sx={{ color: '#71717a', fontSize: '0.76rem' }}>Đóng gói chống sốc cao cấp</Typography>
              </Box>
            </Box>

            {/* 3. Mùi Hương Độc Quyền */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, px: 1 }}>
              <Box sx={{ p: 1.3, borderRadius: '50%', backgroundColor: 'rgba(197, 160, 89, 0.1)', color: '#c5a059', display: 'flex', flexShrink: 0 }}>
                <WorkspacePremiumOutlinedIcon fontSize="medium" />
              </Box>
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: '0.88rem', color: '#18181b', lineHeight: 1.3 }}>Mùi Hương Độc Quyền</Typography>
                <Typography variant="caption" sx={{ color: '#71717a', fontSize: '0.76rem' }}>Niche & Limited Edition</Typography>
              </Box>
            </Box>

            {/* 4. Hộp Quà & Mẫu Thử */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, px: 1 }}>
              <Box sx={{ p: 1.3, borderRadius: '50%', backgroundColor: 'rgba(197, 160, 89, 0.1)', color: '#c5a059', display: 'flex', flexShrink: 0 }}>
                <CardGiftcardOutlinedIcon fontSize="medium" />
              </Box>
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: '0.88rem', color: '#18181b', lineHeight: 1.3 }}>Quà Tặng & Mẫu Thử</Typography>
                <Typography variant="caption" sx={{ color: '#71717a', fontSize: '0.76rem' }}>Tặng kèm Vial chiết với mỗi đơn</Typography>
              </Box>
            </Box>

            {/* 5. Bảo Mật & Hỗ Trợ */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, px: 1 }}>
              <Box sx={{ p: 1.3, borderRadius: '50%', backgroundColor: 'rgba(197, 160, 89, 0.1)', color: '#c5a059', display: 'flex', flexShrink: 0 }}>
                <LockOutlinedIcon fontSize="medium" />
              </Box>
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: '0.88rem', color: '#18181b', lineHeight: 1.3 }}>Bảo Mật & Hỗ Trợ</Typography>
                <Typography variant="caption" sx={{ color: '#71717a', fontSize: '0.76rem' }}>Đổi trả linh hoạt trong 7 ngày</Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Phần Deal of the Day - Tinh giản & Sang trọng */}
      <Box sx={{ py: { xs: 8, md: 12 }, backgroundColor: '#fcfbf9' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="overline" sx={{ color: '#c5a059', letterSpacing: '0.25em', fontWeight: 600, textTransform: 'uppercase' }}>
              Special Curation
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 600, color: '#18181b', mt: 1, letterSpacing: '-0.02em', fontSize: { xs: '1.8rem', md: '2.5rem' } }}>
              Nốt Hương Đặc Quyền Trong Ngày
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'stretch',
              backgroundColor: '#ffffff',
              borderRadius: '24px',
              border: '1px solid rgba(0, 0, 0, 0.06)',
              overflow: 'hidden',
              boxShadow: '0 20px 50px -15px rgba(0, 0, 0, 0.05)'
            }}
          >
            <Box
              sx={{
                flex: 1.1,
                minHeight: { xs: '320px', md: '480px' },
                backgroundImage: `url('https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1000&q=80')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative'
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: 24,
                  left: 24,
                  backgroundColor: 'rgba(24, 24, 27, 0.85)',
                  backdropFilter: 'blur(10px)',
                  color: '#ffffff',
                  px: 2.5,
                  py: 0.8,
                  borderRadius: '9999px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  border: '1px solid rgba(255, 255, 255, 0.15)'
                }}
              >
                ƯU ĐÃI ĐỘC QUYỀN -35%
              </Box>
            </Box>

            <Box sx={{ flex: 1, p: { xs: 4, md: 7 }, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Typography variant="overline" sx={{ color: '#c5a059', fontWeight: 600, letterSpacing: '0.2em' }}>
                TOM FORD PRIVATE BLEND
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 600,
                  color: '#18181b',
                  mt: 1,
                  mb: 2,
                  fontSize: { xs: '1.8rem', md: '2.2rem' }
                }}
              >
                Lost Cherry (Eau de Parfum)
              </Typography>
              <Typography variant="body2" sx={{ color: '#71717a', mb: 3.5, lineHeight: 1.8, fontSize: '0.92rem' }}>
                Một hành trình mùi hương lôi cuốn và bí ẩn. Hương anh đào chín mọng quyện cùng rượu hạnh nhân và hoa hồng Thổ Nhĩ Kỳ, tạo nên dấu ấn gợi cảm khó quên.
              </Typography>

              {/* Price */}
              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 2, mb: 4 }}>
                <Typography variant="h4" sx={{ color: '#c5a059', fontWeight: 800, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                  4.225.000₫
                </Typography>
                <Typography variant="body1" sx={{ color: '#a1a1aa', textDecoration: 'line-through', fontWeight: 500, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                  6.500.000₫
                </Typography>
              </Box>

              {/* Countdown Timer */}
              <Box sx={{ mb: 4.5 }}>
                <Typography variant="caption" sx={{ color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', mb: 1.5, fontWeight: 500 }}>
                  Thời gian ưu đãi còn lại:
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ textAlign: 'center', p: '10px 18px', backgroundColor: '#fcfbf9', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.05)' }}>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#18181b', fontFamily: '"Playfair Display", serif' }}>{timeLeft.hours}</Typography>
                    <Typography variant="caption" sx={{ color: '#a1a1aa', fontSize: '0.7rem', textTransform: 'uppercase' }}>Giờ</Typography>
                  </Box>
                  <Typography variant="h6" sx={{ color: '#d4d4d8' }}>:</Typography>
                  <Box sx={{ textAlign: 'center', p: '10px 18px', backgroundColor: '#fcfbf9', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.05)' }}>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#18181b', fontFamily: '"Playfair Display", serif' }}>{String(timeLeft.minutes).padStart(2, '0')}</Typography>
                    <Typography variant="caption" sx={{ color: '#a1a1aa', fontSize: '0.7rem', textTransform: 'uppercase' }}>Phút</Typography>
                  </Box>
                  <Typography variant="h6" sx={{ color: '#d4d4d8' }}>:</Typography>
                  <Box sx={{ textAlign: 'center', p: '10px 18px', backgroundColor: '#fcfbf9', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.05)' }}>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#c5a059', fontFamily: '"Playfair Display", serif' }}>{String(timeLeft.seconds).padStart(2, '0')}</Typography>
                    <Typography variant="caption" sx={{ color: '#a1a1aa', fontSize: '0.7rem', textTransform: 'uppercase' }}>Giây</Typography>
                  </Box>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  component={Link}
                  to="/products"
                  variant="contained"
                  startIcon={<ShoppingBagOutlinedIcon sx={{ fontSize: '18px !important' }} />}
                  sx={{
                    backgroundColor: '#18181b',
                    color: '#ffffff',
                    borderRadius: '9999px',
                    px: 3.5,
                    py: 1.4,
                    fontWeight: 500,
                    fontSize: '0.9rem',
                    letterSpacing: '0.04em',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
                    '&:hover': {
                      backgroundColor: '#c5a059',
                      boxShadow: '0 12px 25px rgba(197, 160, 89, 0.35)'
                    }
                  }}
                >
                  Khám Phá Chi Tiết
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => {
                    addToCart({
                      _id: 'sample-1',
                      name: 'Lost Cherry - Tom Ford (100ml)',
                      category: 'Eau de Parfum',
                      price: '4.225.000₫',
                      originalPrice: '6.500.000₫',
                      isSale: true,
                      discountPercent: 35,
                      rawPrice: 4225000,
                      image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1000&q=80'
                    }, 1);
                  }}
                  sx={{
                    borderColor: '#c5a059',
                    color: '#c5a059',
                    borderRadius: '9999px',
                    px: 3,
                    py: 1.4,
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    letterSpacing: '0.02em',
                    '&:hover': {
                      backgroundColor: 'rgba(197, 160, 89, 0.08)',
                      borderColor: '#b88f42'
                    }
                  }}
                >
                  Thêm Ngay Vào Giỏ
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

// Component layout chính
const MainLayout = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login';

  // Chỉ hiển thị Footer ở trang chính ('/') và danh sách sản phẩm ('/products')
  const showFooter = location.pathname === '/' || location.pathname === '/products';

  return (
    <>
      {!isAuthPage && <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/payment/vnpay" element={<VNPayPaymentPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/login" element={<AuthPage />} />

        {/* Route Admin được bảo vệ */}
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminPage />
            </ProtectedAdminRoute>
          }
        />
      </Routes>
      {showFooter && <Footer />}
    </>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CartProvider>
        <Router>
          <CssBaseline />
          <MainLayout />
        </Router>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;