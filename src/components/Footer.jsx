import React from 'react';
import { Box, Container, Typography, Grid, TextField, Button, Divider } from '@mui/material';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#111111', color: '#e4e4e7', pt: { xs: 8, md: 10 }, pb: 5, mt: 'auto', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
      <Container maxWidth="lg">
        {/* Phần đăng ký nhận bản tin VIP - Tối giản & Tinh tế */}
        <Box
          sx={{
            backgroundColor: '#18181b',
            p: { xs: 4, md: 5 },
            borderRadius: '20px',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: { xs: 7, md: 9 },
            border: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
          }}
        >
          <Box sx={{ mb: { xs: 3, md: 0 }, textAlign: { xs: 'center', md: 'left' }, maxWidth: '520px' }}>
            <Typography variant="overline" sx={{ color: '#c5a059', letterSpacing: '0.2em', fontWeight: 600 }}>
              ESSENCE PRIVILEGE
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 600, color: '#ffffff', fontFamily: '"Playfair Display", serif', mt: 0.5, mb: 1 }}>
              Đăng Ký Nhận Đặc Quyền Mùi Hương
            </Typography>
            <Typography variant="body2" sx={{ color: '#a1a1aa', fontWeight: 300, lineHeight: 1.6, fontSize: '0.9rem' }}>
              Nhận thông báo ưu tiên về các phiên bản nước hoa niche giới hạn và lời mời tham dự sự kiện ra mắt riêng tư.
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', width: { xs: '100%', md: 'auto' }, gap: 1.5, flexWrap: { xs: 'wrap', sm: 'nowrap' } }}>
            <TextField
              placeholder="Nhập địa chỉ email của bạn..."
              variant="outlined"
              size="small"
              sx={{
                backgroundColor: '#27272a',
                borderRadius: '9999px',
                input: { color: '#ffffff', fontSize: '0.88rem', px: 2.5, py: 1.2 },
                '& .MuiOutlinedInput-root': {
                  borderRadius: '9999px',
                  '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
                  '&:hover fieldset': { borderColor: '#c5a059' },
                  '&.Mui-focused fieldset': { borderColor: '#c5a059' },
                },
                width: { xs: '100%', sm: '280px' }
              }}
            />
            <Button
              variant="contained"
              endIcon={<ArrowForwardIcon sx={{ fontSize: '16px !important' }} />}
              sx={{
                backgroundColor: '#c5a059',
                color: '#ffffff',
                fontWeight: 600,
                px: 3.5,
                py: 1.2,
                borderRadius: '9999px',
                whiteSpace: 'nowrap',
                '&:hover': { backgroundColor: '#b88f42' },
                textTransform: 'none',
                fontSize: '0.88rem',
                letterSpacing: '0.02em',
                width: { xs: '100%', sm: 'auto' }
              }}
            >
              Đăng Ký
            </Button>
          </Box>
        </Box>

        {/* Các cột thông tin chi tiết */}
        <Grid container spacing={5} sx={{ mb: 7 }}>
          {/* Cột 1: Thương hiệu */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                letterSpacing: '0.2em',
                mb: 2,
                fontFamily: '"Playfair Display", serif',
                color: '#ffffff',
                display: 'inline-flex',
                alignItems: 'baseline'
              }}
            >
              ESSENCE
              <Box component="span" sx={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#c5a059', ml: 0.5 }} />
            </Typography>
            <Typography variant="body2" sx={{ color: '#a1a1aa', lineHeight: 1.8, mb: 3, fontWeight: 300, fontSize: '0.88rem' }}>
              Ngôi nhà lưu giữ những nốt hương độc bản và nghệ thuật điều chế nước hoa đỉnh cao. Định hình khí chất và phong cách cá nhân của bạn.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, color: '#a1a1aa' }}>
              <Box sx={{ p: 1, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', cursor: 'pointer', transition: 'all 0.2s', '&:hover': { color: '#c5a059', borderColor: '#c5a059' } }}>
                <FacebookOutlinedIcon sx={{ fontSize: 18 }} />
              </Box>
              <Box sx={{ p: 1, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', cursor: 'pointer', transition: 'all 0.2s', '&:hover': { color: '#c5a059', borderColor: '#c5a059' } }}>
                <InstagramIcon sx={{ fontSize: 18 }} />
              </Box>
              <Box sx={{ p: 1, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', cursor: 'pointer', transition: 'all 0.2s', '&:hover': { color: '#c5a059', borderColor: '#c5a059' } }}>
                <TwitterIcon sx={{ fontSize: 18 }} />
              </Box>
            </Box>
          </Grid>

          {/* Cột 2: Khám Phá */}
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2.5, color: '#ffffff', fontSize: '0.88rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Bộ Sưu Tập
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.4 }}>
              <Typography component={Link} to="/" variant="body2" sx={{ color: '#a1a1aa', textDecoration: 'none', fontWeight: 300, fontSize: '0.88rem', '&:hover': { color: '#c5a059' } }}>Trang Chủ</Typography>
              <Typography component={Link} to="/products" variant="body2" sx={{ color: '#a1a1aa', textDecoration: 'none', fontWeight: 300, fontSize: '0.88rem', '&:hover': { color: '#c5a059' } }}>Eau de Parfum</Typography>
              <Typography component={Link} to="/products" variant="body2" sx={{ color: '#a1a1aa', textDecoration: 'none', fontWeight: 300, fontSize: '0.88rem', '&:hover': { color: '#c5a059' } }}>Extrait de Parfum</Typography>
              <Typography component={Link} to="/products" variant="body2" sx={{ color: '#a1a1aa', textDecoration: 'none', fontWeight: 300, fontSize: '0.88rem', '&:hover': { color: '#c5a059' } }}>Bản Giới Hạn</Typography>
            </Box>
          </Grid>

          {/* Cột 3: Hỗ Trợ Khách Hàng */}
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2.5, color: '#ffffff', fontSize: '0.88rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Dịch Vụ
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.4 }}>
              <Typography variant="body2" sx={{ color: '#a1a1aa', cursor: 'pointer', fontWeight: 300, fontSize: '0.88rem', '&:hover': { color: '#c5a059' } }}>Chính Sách Đổi Trả</Typography>
              <Typography variant="body2" sx={{ color: '#a1a1aa', cursor: 'pointer', fontWeight: 300, fontSize: '0.88rem', '&:hover': { color: '#c5a059' } }}>Vận Chuyển Toàn Quốc</Typography>
              <Typography variant="body2" sx={{ color: '#a1a1aa', cursor: 'pointer', fontWeight: 300, fontSize: '0.88rem', '&:hover': { color: '#c5a059' } }}>Tư Vấn Nốt Hương</Typography>
              <Typography variant="body2" sx={{ color: '#a1a1aa', cursor: 'pointer', fontWeight: 300, fontSize: '0.88rem', '&:hover': { color: '#c5a059' } }}>Hộp Quà Cao Cấp</Typography>
            </Box>
          </Grid>

          {/* Cột 4: Showroom & Liên Hệ */}
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2.5, color: '#ffffff', fontSize: '0.88rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Showroom & Liên Hệ
            </Typography>
            <Typography variant="body2" sx={{ color: '#a1a1aa', mb: 1.2, fontWeight: 300, fontSize: '0.88rem' }}>
              Flagship Boutique: Hà Đông, Hà Nội
            </Typography>
            <Typography variant="body2" sx={{ color: '#a1a1aa', mb: 1.2, fontWeight: 300, fontSize: '0.88rem' }}>
              Hotline Concierge: 0971 526 915
            </Typography>
            <Typography variant="body2" sx={{ color: '#a1a1aa', fontWeight: 300, fontSize: '0.88rem' }}>
              Email Hỗ Trợ: contact@essenceshop.com
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.08)', mb: 4 }} />

        {/* Bản quyền & Điều khoản */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', color: '#71717a', fontSize: '0.82rem', gap: 1.5 }}>
          <Typography variant="body2" sx={{ fontWeight: 300, fontSize: '0.82rem' }}>
            © 2026 ESSENCE Perfume Boutique. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3, fontWeight: 300 }}>
            <span style={{ cursor: 'pointer', transition: 'color 0.2s' }}>Chính sách bảo mật</span>
            <span style={{ cursor: 'pointer', transition: 'color 0.2s' }}>Điều khoản sử dụng</span>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;