import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { CssBaseline, Box, Container, Typography, Button } from '@mui/material';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import Footer from './components/Footer';
import ProductPage from './pages/ProductPage';
import AuthPage from './pages/AuthPage';
import './App.css';

const HomePage = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 12, minutes: 45, seconds: 30 });

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

      {/* Phần Deal of the Day */}
      <Box sx={{ py: 10, backgroundColor: '#fcfbfa', borderBottom: '1px solid #eaeaea' }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              gap: 6,
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              border: '1px solid #eaeaea',
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0,0,0,0.03)'
            }}
          >
            <Box
              sx={{
                flex: 1,
                height: { xs: '300px', md: '450px' },
                width: '100%',
                backgroundImage: `url('https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative'
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: 20,
                  left: 20,
                  backgroundColor: '#b89735',
                  color: '#fff',
                  px: 2,
                  py: 0.6,
                  borderRadius: '20px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}
              >
                Giảm 35% Hôm Nay
              </Box>
            </Box>

            <Box sx={{ flex: 1, p: { xs: 3, md: 6 }, textAlign: { xs: 'center', md: 'left' } }}>
              <Typography variant="caption" sx={{ color: '#b89735', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase' }}>
                Best Price For You
              </Typography>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  fontFamily: '"Playfair Display", serif',
                  color: '#1a1a1a',
                  my: 1.5,
                  fontSize: { xs: '2rem', md: '2.5rem' }
                }}
              >
                Deal of the Day
              </Typography>
              <Typography variant="body2" sx={{ color: '#666', mb: 3, lineHeight: 1.7, fontWeight: 300 }}>
                Trải nghiệm nốt hương quyến rũ bậc nhất từ Tom Ford với mức giá đặc quyền chỉ có trong ngày hôm nay dành riêng cho thành viên.
              </Typography>

              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, fontFamily: '"Playfair Display", serif', color: '#1a1a1a', mb: 0.5 }}>
                  Lost Cherry - Tom Ford (Eau de Parfum)
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', md: 'flex-start' }, gap: 2 }}>
                  <Typography variant="body1" sx={{ color: '#999', textDecoration: 'line-through', fontWeight: 500 }}>
                    6.500.000đ
                  </Typography>
                  <Typography variant="h5" sx={{ color: '#b89735', fontWeight: 700 }}>
                    4.225.000đ
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' }, gap: 3, mb: 4 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: '#1a1a1a', fontFamily: '"Playfair Display", serif' }}>12</Typography>
                  <Typography variant="caption" sx={{ color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>Giờ</Typography>
                </Box>
                <Typography variant="h4" sx={{ color: '#ccc', fontWeight: 300 }}>:</Typography>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: '#1a1a1a', fontFamily: '"Playfair Display", serif' }}>
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>Phút</Typography>
                </Box>
                <Typography variant="h4" sx={{ color: '#ccc', fontWeight: 300 }}>:</Typography>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: '#b89735', fontFamily: '"Playfair Display", serif' }}>
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>Giây</Typography>
                </Box>
              </Box>

              <Button
                component={Link}
                to="/products"
                variant="contained"
                startIcon={<ShoppingBagOutlinedIcon />}
                sx={{
                  backgroundColor: '#1a1a1a',
                  color: '#fff',
                  borderRadius: '30px',
                  px: 4,
                  py: 1.2,
                  textTransform: 'none',
                  fontWeight: 600,
                  '&:hover': { backgroundColor: '#b89735' }
                }}
              >
                Sở Hữu Ngay Deal Sốc
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

// Component layout chính để tự động ẩn Header và Footer khi ở trang Login
const MainLayout = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login';

  return (
    <>
      {!isAuthPage && <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/login" element={<AuthPage />} />
      </Routes>
      {!isAuthPage && <Footer />}
    </>
  );
};

function App() {
  return (
    <Router>
      <CssBaseline />
      <MainLayout />
    </Router>
  );
}

export default App;