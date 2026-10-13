import React from 'react';
import { Box, Container, Typography, Grid, TextField, Button, Divider } from '@mui/material';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import SendIcon from '@mui/icons-material/Send';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#0d0d0d', color: '#e5e5e5', pt: 8, pb: 4, mt: 'auto' }}>
      <Container maxWidth="lg">
        {/* Phần đăng ký nhận bản tin */}
        <Box
          sx={{
            backgroundColor: '#161616',
            p: 5,
            borderRadius: '12px',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 8,
            border: '1px solid #262626'
          }}
        >
          <Box sx={{ mb: { xs: 3, md: 0 }, textAlign: { xs: 'center', md: 'left' }, maxWidth: '500px' }}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 1, color: '#fff', letterSpacing: '0.5px' }}>
              Đăng Ký Nhận Bản Tin Ưu Đãi
            </Typography>
            <Typography variant="body2" sx={{ color: '#999', fontWeight: 300, lineHeight: 1.6 }}>
              Nhận thông tin về các dòng nước hoa độc bản và các chương trình đặc quyền dành riêng cho thành viên.
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', width: { xs: '100%', md: 'auto' }, gap: 1.5 }}>
            <TextField
              placeholder="Nhập email của bạn..."
              variant="outlined"
              size="small"
              sx={{
                backgroundColor: '#1f1f1f',
                borderRadius: '6px',
                input: { color: '#fff', fontSize: '0.9rem' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#333' },
                  '&:hover fieldset': { borderColor: '#b89735' },
                  '&.Mui-focused fieldset': { borderColor: '#b89735' },
                },
                width: { xs: '100%', md: '300px' }
              }}
            />
            <Button
              variant="contained"
              endIcon={<SendIcon sx={{ fontSize: '16px !important' }} />}
              sx={{
                backgroundColor: '#b89735',
                color: '#111',
                fontWeight: 600,
                px: 3,
                '&:hover': { backgroundColor: '#a4842b' },
                textTransform: 'none',
                fontSize: '0.9rem'
              }}
            >
              Gửi
            </Button>
          </Box>
        </Box>

        {/* Các cột thông tin chi tiết */}
        <Grid container spacing={5} sx={{ mb: 6 }}>
          {/* Cột 1 */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: '2px', mb: 2, fontFamily: '"Playfair Display", serif', color: '#fff' }}>
              ESSENCE<span style={{ color: '#b89735' }}>.</span>
            </Typography>
            <Typography variant="body2" sx={{ color: '#999', lineHeight: 1.8, mb: 3, fontWeight: 300 }}>
              Nền tảng cung cấp nước hoa chính hãng và độc bản hàng đầu. Mang lại trải nghiệm hương thơm đỉnh cao định hình phong cách cá nhân của bạn.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2.5, color: '#ccc' }}>
              <FacebookOutlinedIcon sx={{ cursor: 'pointer', '&:hover': { color: '#b89735' }, transition: 'color 0.2s' }} />
              <InstagramIcon sx={{ cursor: 'pointer', '&:hover': { color: '#b89735' }, transition: 'color 0.2s' }} />
              <TwitterIcon sx={{ cursor: 'pointer', '&:hover': { color: '#b89735' }, transition: 'color 0.2s' }} />
            </Box>
          </Grid>

          {/* Cột 2 */}
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2.5, color: '#fff', fontSize: '0.95rem', letterSpacing: '0.5px' }}>
              Khám Phá
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Typography variant="body2" sx={{ color: '#999', cursor: 'pointer', fontWeight: 300, '&:hover': { color: '#b89735' } }}>Trang Chủ</Typography>
              <Typography variant="body2" sx={{ color: '#999', cursor: 'pointer', fontWeight: 300, '&:hover': { color: '#b89735' } }}>Bộ Sưu Tập</Typography>
              <Typography variant="body2" sx={{ color: '#999', cursor: 'pointer', fontWeight: 300, '&:hover': { color: '#b89735' } }}>Nước Hoa Nam</Typography>
              <Typography variant="body2" sx={{ color: '#999', cursor: 'pointer', fontWeight: 300, '&:hover': { color: '#b89735' } }}>Nước Hoa Nữ</Typography>
            </Box>
          </Grid>

          {/* Cột 3 */}
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2.5, color: '#fff', fontSize: '0.95rem', letterSpacing: '0.5px' }}>
              Hỗ Trợ
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Typography variant="body2" sx={{ color: '#999', cursor: 'pointer', fontWeight: 300, '&:hover': { color: '#b89735' } }}>Chính Sách Đổi Trả</Typography>
              <Typography variant="body2" sx={{ color: '#999', cursor: 'pointer', fontWeight: 300, '&:hover': { color: '#b89735' } }}>Vận Chuyển</Typography>
              <Typography variant="body2" sx={{ color: '#999', cursor: 'pointer', fontWeight: 300, '&:hover': { color: '#b89735' } }}>Hướng Dẫn Mua Hàng</Typography>
              <Typography variant="body2" sx={{ color: '#999', cursor: 'pointer', fontWeight: 300, '&:hover': { color: '#b89735' } }}>FAQs</Typography>
            </Box>
          </Grid>

          {/* Cột 4 */}
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2.5, color: '#fff', fontSize: '0.95rem', letterSpacing: '0.5px' }}>
              Liên Hệ
            </Typography>
            <Typography variant="body2" sx={{ color: '#999', mb: 1.2, fontWeight: 300 }}>
              Địa chỉ: Hà Đông, Hà Nội
            </Typography>
            <Typography variant="body2" sx={{ color: '#999', mb: 1.2, fontWeight: 300 }}>
              Điện thoại: 0971 526 915
            </Typography>
            <Typography variant="body2" sx={{ color: '#999', fontWeight: 300 }}>
              Email: contact@essenceshop.com
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: '#222', mb: 4 }} />

        {/* Bản quyền */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', color: '#777', fontSize: '0.85rem' }}>
          <Typography variant="body2" sx={{ fontWeight: 300 }}>
            © 2026 ESSENCE Perfume Shop. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3, mt: { xs: 2, md: 0 }, fontWeight: 300 }}>
            <span style={{ cursor: 'pointer' }}>Quyền riêng tư</span>
            <span style={{ cursor: 'pointer' }}>Điều khoản dịch vụ</span>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;