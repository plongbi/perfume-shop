import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Tabs, Tab, Paper, Fade } from '@mui/material';
import { Link } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const AuthPage = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const authConfig = [
    {
      image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1200&q=80',
      quote: '“Hương thơm là bản tuyên ngôn không lời của phong cách và đẳng cấp.”',
      subQuote: 'ESSENCE PERFUME HOUSE',
      reverse: false
    },
    {
      image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1200&q=80',
      quote: '“Khởi đầu hành trình khám phá những nốt hương độc bản.”',
      subQuote: 'ĐẶC QUYỀN THÀNH VIÊN',
      reverse: true
    }
  ];

  const currentConfig = authConfig[tabIndex];

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f2f0eb',
        position: 'relative',
        p: 2
      }}
    >
      {/* Nút quay lại trang chủ */}
      <Button
        component={Link}
        to="/"
        startIcon={<ArrowBackIcon />}
        sx={{
          position: 'absolute',
          top: 24,
          left: 24,
          color: '#1a1a1a',
          textTransform: 'none',
          fontWeight: 600,
          backgroundColor: '#fff',
          px: 2,
          py: 0.8,
          borderRadius: '20px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          zIndex: 10,
          '&:hover': { backgroundColor: '#faf9f6' }
        }}
      >
        Trang chủ
      </Button>

      {/* Hộp Card tổng thể */}
      <Paper
        elevation={0}
        sx={{
          width: '100%',
          maxWidth: '920px',
          height: '580px',
          display: 'flex',
          flexDirection: { xs: 'column', md: currentConfig.reverse ? 'row-reverse' : 'row' },
          borderRadius: '24px',
          overflow: 'hidden',
          boxShadow: '0 24px 48px rgba(0,0,0,0.08)',
          border: '1px solid #eaeaea',
          backgroundColor: '#fff',
          transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        {/* 1. Phần Hình ảnh nghệ thuật kèm Typography cao cấp */}
        <Box
          sx={{
            display: { xs: 'none', md: 'block' },
            flex: 1.2,
            position: 'relative',
            backgroundImage: `url('${currentConfig.image}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transition: 'background-image 0.6s ease-in-out'
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0.1) 100%)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              p: 6
            }}
          >
            <Fade in={true} timeout={800} key={tabIndex}>
              <Box>
                <Typography
                  variant="h4"
                  sx={{
                    color: '#ffffff',
                    fontFamily: '"Playfair Display", serif',
                    fontWeight: 600,
                    fontStyle: 'italic',
                    mb: 2,
                    lineHeight: 1.4,
                    letterSpacing: '0.5px',
                    textShadow: '0 2px 10px rgba(0,0,0,0.3)'
                  }}
                >
                  {currentConfig.quote}
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: '#d4af37',
                    fontWeight: 600,
                    letterSpacing: '3px',
                    fontSize: '0.75rem',
                    textTransform: 'uppercase'
                  }}
                >
                  {currentConfig.subQuote}
                </Typography>
              </Box>
            </Fade>
          </Box>
        </Box>

        {/* 2. Phần Form Nhập liệu */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            px: { xs: 4, md: 6 },
            py: 4,
            backgroundColor: '#ffffff'
          }}
        >
          <Box sx={{ width: '100%', maxWidth: '360px' }}>
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                fontWeight: 800,
                letterSpacing: '3px',
                color: '#111',
                textDecoration: 'none',
                fontFamily: '"Playfair Display", serif',
                display: 'block',
                mb: 0.5,
                textAlign: 'center'
              }}
            >
              ESSENCE<span style={{ color: '#d4af37' }}>.</span>
            </Typography>
            <Typography variant="body2" sx={{ color: '#666', mb: 3, fontWeight: 300, textAlign: 'center', fontSize: '0.85rem' }}>
              {tabIndex === 0 ? 'Đăng nhập để tiếp tục trải nghiệm mua sắm' : 'Đăng ký tài khoản để nhận đặc quyền riêng'}
            </Typography>

            <Tabs
              value={tabIndex}
              onChange={handleTabChange}
              centered
              sx={{
                mb: 3,
                borderBottom: '1px solid #eaeaea',
                '& .MuiTabs-indicator': { backgroundColor: '#b89735', height: '2px' },
                '& .MuiTab-root': {
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  color: '#777',
                  '&.Mui-selected': { color: '#1a1a1a' }
                }
              }}
            >
              <Tab label="Đăng Nhập" />
              <Tab label="Đăng Ký" />
            </Tabs>

            <Fade in={true} timeout={500} key={tabIndex}>
              <Box>
                {tabIndex === 0 ? (
                  <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                      label="Email của bạn"
                      type="email"
                      variant="outlined"
                      fullWidth
                      size="small"
                      InputProps={{
                        startAdornment: <EmailOutlinedIcon sx={{ color: '#888', mr: 1, fontSize: '18px' }} />,
                      }}
                      sx={{ '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: '#b89735' } } }}
                    />
                    <TextField
                      label="Mật khẩu"
                      type="password"
                      variant="outlined"
                      fullWidth
                      size="small"
                      InputProps={{
                        startAdornment: <LockOutlinedIcon sx={{ color: '#888', mr: 1, fontSize: '18px' }} />,
                      }}
                      sx={{ '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: '#b89735' } } }}
                    />
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{
                        backgroundColor: '#1a1a1a',
                        color: '#fff',
                        py: 1,
                        textTransform: 'none',
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        borderRadius: '6px',
                        '&:hover': { backgroundColor: '#b89735' },
                        mt: 1
                      }}
                    >
                      Đăng Nhập
                    </Button>
                  </Box>
                ) : (
                  <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                      label="Họ và tên"
                      variant="outlined"
                      fullWidth
                      size="small"
                      InputProps={{
                        startAdornment: <PersonOutlineOutlinedIcon sx={{ color: '#888', mr: 1, fontSize: '18px' }} />,
                      }}
                      sx={{ '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: '#b89735' } } }}
                    />
                    <TextField
                      label="Email của bạn"
                      type="email"
                      variant="outlined"
                      fullWidth
                      size="small"
                      InputProps={{
                        startAdornment: <EmailOutlinedIcon sx={{ color: '#888', mr: 1, fontSize: '18px' }} />,
                      }}
                      sx={{ '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: '#b89735' } } }}
                    />
                    <TextField
                      label="Mật khẩu"
                      type="password"
                      variant="outlined"
                      fullWidth
                      size="small"
                      InputProps={{
                        startAdornment: <LockOutlinedIcon sx={{ color: '#888', mr: 1, fontSize: '18px' }} />,
                      }}
                      sx={{ '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: '#b89735' } } }}
                    />
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{
                        backgroundColor: '#1a1a1a',
                        color: '#fff',
                        py: 1,
                        textTransform: 'none',
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        borderRadius: '6px',
                        '&:hover': { backgroundColor: '#b89735' },
                        mt: 1
                      }}
                    >
                      Đăng Ký Tài Khoản
                    </Button>
                  </Box>
                )}
              </Box>
            </Fade>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default AuthPage;