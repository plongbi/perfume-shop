import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Tabs,
  Tab,
  Paper,
  Fade,
  Alert,
  CircularProgress
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const AuthPage = () => {
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useState(0);

  // Form Login State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Form Register State
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
    setErrorMsg('');
    setSuccessMsg('');
  };

  // Xử lý Đăng Nhập
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Đăng nhập không thành công');
      }

      // Lưu thông tin người dùng vào localStorage
      localStorage.setItem('user', JSON.stringify(data.user));

      // Phân quyền điều hướng
      if (data.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Xử lý Đăng Ký
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: regName, email: regEmail, password: regPassword })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Đăng ký không thành công');
      }

      setSuccessMsg('Đăng ký tài khoản thành công! Vui lòng chuyển sang Đăng nhập.');
      setTabIndex(0);
      setLoginEmail(regEmail);
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  const authConfig = [
    {
      image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1200&q=80',
      quote: '“Hương thơm là bản tuyên ngôn không lời của phong cách và đẳng cấp.”',
      subQuote: 'ESSENCE HAUTE PARFUMERIE',
      reverse: false
    },
    {
      image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1200&q=80',
      quote: '“Khởi đầu hành trình đánh thức những xúc cảm độc bản.”',
      subQuote: 'ĐẶC QUYỀN THÀNH VIÊN',
      reverse: true
    }
  ];

  const currentConfig = authConfig[tabIndex];

  return (
    <Box
      sx={{
        width: '100vw',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f6f4ee',
        position: 'relative',
        p: { xs: 2, md: 4 }
      }}
    >
      {/* Nút quay lại trang chủ */}
      <Button
        component={Link}
        to="/"
        startIcon={<ArrowBackIcon sx={{ fontSize: '18px !important' }} />}
        sx={{
          position: 'absolute',
          top: 24,
          left: 24,
          color: '#18181b',
          textTransform: 'none',
          fontWeight: 500,
          fontSize: '0.86rem',
          backgroundColor: '#ffffff',
          px: 2.4,
          py: 0.9,
          borderRadius: '9999px',
          boxShadow: '0 4px 14px rgba(0,0,0,0.04)',
          border: '1px solid rgba(0,0,0,0.06)',
          zIndex: 10,
          '&:hover': { backgroundColor: '#fcfbf9', borderColor: '#18181b' }
        }}
      >
        Về Trang Chủ
      </Button>

      {/* Card Form Xác thực Tổng thể */}
      <Paper
        elevation={0}
        sx={{
          width: '100%',
          maxWidth: '960px',
          minHeight: '600px',
          display: 'flex',
          flexDirection: { xs: 'column', md: currentConfig.reverse ? 'row-reverse' : 'row' },
          borderRadius: '24px',
          overflow: 'hidden',
          boxShadow: '0 25px 60px -15px rgba(0,0,0,0.08)',
          border: '1px solid rgba(0,0,0,0.06)',
          backgroundColor: '#ffffff',
          transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* 1. Phần Hình ảnh nghệ thuật & Quote */}
        <Box
          sx={{
            display: { xs: 'none', md: 'block' },
            flex: 1.1,
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
              inset: 0,
              background: 'linear-gradient(to top, rgba(17,17,17,0.85) 0%, rgba(17,17,17,0.3) 60%, rgba(17,17,17,0.1) 100%)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              p: 6
            }}
          >
            <Fade in={true} timeout={700} key={tabIndex}>
              <Box>
                <Typography
                  variant="overline"
                  sx={{
                    color: '#c5a059',
                    fontWeight: 600,
                    letterSpacing: '0.25em',
                    fontSize: '0.75rem',
                    display: 'block',
                    mb: 1
                  }}
                >
                  {currentConfig.subQuote}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    color: '#ffffff',
                    fontFamily: '"Playfair Display", serif',
                    fontWeight: 500,
                    fontStyle: 'italic',
                    lineHeight: 1.5,
                    letterSpacing: '0.02em',
                    textShadow: '0 2px 12px rgba(0,0,0,0.5)'
                  }}
                >
                  {currentConfig.quote}
                </Typography>
              </Box>
            </Fade>
          </Box>
        </Box>

        {/* 2. Phần Form Nhập Liệu */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            px: { xs: 3.5, md: 6 },
            py: 6,
            backgroundColor: '#ffffff'
          }}
        >
          <Box sx={{ width: '100%', maxWidth: '380px' }}>
            <Box sx={{ textAlign: 'center', mb: 3.5 }}>
              <Typography
                variant="h5"
                component={Link}
                to="/"
                sx={{
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                  color: '#18181b',
                  textDecoration: 'none',
                  fontFamily: '"Playfair Display", serif',
                  display: 'inline-flex',
                  alignItems: 'baseline',
                  mb: 1
                }}
              >
                ESSENCE
                <Box component="span" sx={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#c5a059', ml: 0.5 }} />
              </Typography>
              <Typography variant="body2" sx={{ color: '#71717a', fontSize: '0.88rem' }}>
                {tabIndex === 0 ? 'Chào mừng quý khách trở lại trải nghiệm' : 'Đăng ký thành viên để nhận đặc quyền riêng'}
              </Typography>
            </Box>

            {/* Thông báo Alert */}
            {errorMsg && (
              <Alert severity="error" sx={{ mb: 2.5, borderRadius: '10px', fontSize: '0.84rem' }}>
                {errorMsg}
              </Alert>
            )}
            {successMsg && (
              <Alert severity="success" sx={{ mb: 2.5, borderRadius: '10px', fontSize: '0.84rem' }}>
                {successMsg}
              </Alert>
            )}

            <Tabs
              value={tabIndex}
              onChange={handleTabChange}
              centered
              sx={{
                mb: 3.5,
                borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
                '& .MuiTabs-indicator': { backgroundColor: '#c5a059', height: '2px' },
                '& .MuiTab-root': {
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '0.92rem',
                  letterSpacing: '0.02em',
                  color: '#71717a',
                  pb: 1.5,
                  '&.Mui-selected': { color: '#18181b' }
                }
              }}
            >
              <Tab label="Đăng Nhập" />
              <Tab label="Đăng Ký" />
            </Tabs>

            <Fade in={true} timeout={400} key={tabIndex}>
              <Box>
                {tabIndex === 0 ? (
                  /* Form Đăng Nhập */
                  <Box component="form" onSubmit={handleLoginSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.2 }}>
                    <TextField
                      label="Email của bạn"
                      type="email"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      variant="outlined"
                      fullWidth
                      size="small"
                      InputProps={{
                        startAdornment: <EmailOutlinedIcon sx={{ color: '#a1a1aa', mr: 1, fontSize: '18px' }} />,
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '10px',
                          '& fieldset': { borderColor: 'rgba(0,0,0,0.1)' },
                          '&.Mui-focused fieldset': { borderColor: '#c5a059' }
                        }
                      }}
                    />
                    <TextField
                      label="Mật khẩu"
                      type="password"
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      variant="outlined"
                      fullWidth
                      size="small"
                      InputProps={{
                        startAdornment: <LockOutlinedIcon sx={{ color: '#a1a1aa', mr: 1, fontSize: '18px' }} />,
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '10px',
                          '& fieldset': { borderColor: 'rgba(0,0,0,0.1)' },
                          '&.Mui-focused fieldset': { borderColor: '#c5a059' }
                        }
                      }}
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={loading}
                      fullWidth
                      sx={{
                        backgroundColor: '#18181b',
                        color: '#ffffff',
                        py: 1.2,
                        textTransform: 'none',
                        fontWeight: 600,
                        fontSize: '0.88rem',
                        letterSpacing: '0.04em',
                        borderRadius: '9999px',
                        boxShadow: 'none',
                        mt: 1,
                        '&:hover': { backgroundColor: '#c5a059' }
                      }}
                    >
                      {loading ? <CircularProgress size={20} sx={{ color: '#fff' }} /> : 'Đăng Nhập'}
                    </Button>
                  </Box>
                ) : (
                  /* Form Đăng Ký */
                  <Box component="form" onSubmit={handleRegisterSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.2 }}>
                    <TextField
                      label="Họ và tên"
                      required
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      variant="outlined"
                      fullWidth
                      size="small"
                      InputProps={{
                        startAdornment: <PersonOutlineOutlinedIcon sx={{ color: '#a1a1aa', mr: 1, fontSize: '18px' }} />,
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '10px',
                          '& fieldset': { borderColor: 'rgba(0,0,0,0.1)' },
                          '&.Mui-focused fieldset': { borderColor: '#c5a059' }
                        }
                      }}
                    />
                    <TextField
                      label="Email của bạn"
                      type="email"
                      required
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      variant="outlined"
                      fullWidth
                      size="small"
                      InputProps={{
                        startAdornment: <EmailOutlinedIcon sx={{ color: '#a1a1aa', mr: 1, fontSize: '18px' }} />,
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '10px',
                          '& fieldset': { borderColor: 'rgba(0,0,0,0.1)' },
                          '&.Mui-focused fieldset': { borderColor: '#c5a059' }
                        }
                      }}
                    />
                    <TextField
                      label="Mật khẩu"
                      type="password"
                      required
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      variant="outlined"
                      fullWidth
                      size="small"
                      InputProps={{
                        startAdornment: <LockOutlinedIcon sx={{ color: '#a1a1aa', mr: 1, fontSize: '18px' }} />,
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '10px',
                          '& fieldset': { borderColor: 'rgba(0,0,0,0.1)' },
                          '&.Mui-focused fieldset': { borderColor: '#c5a059' }
                        }
                      }}
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={loading}
                      fullWidth
                      sx={{
                        backgroundColor: '#18181b',
                        color: '#ffffff',
                        py: 1.2,
                        textTransform: 'none',
                        fontWeight: 600,
                        fontSize: '0.88rem',
                        letterSpacing: '0.04em',
                        borderRadius: '9999px',
                        boxShadow: 'none',
                        mt: 1,
                        '&:hover': { backgroundColor: '#c5a059' }
                      }}
                    >
                      {loading ? <CircularProgress size={20} sx={{ color: '#fff' }} /> : 'Tạo Tài Khoản'}
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