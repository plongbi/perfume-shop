import React from 'react';
import { Box, Container, Typography, Grid, Card, CardMedia, CardContent, Button, Rating } from '@mui/material';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';

const products = [
  {
    id: 1,
    name: 'Santal 33 - Le Labo',
    category: 'Eau de Parfum',
    price: '3.850.000đ',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 2,
    name: 'Lost Cherry - Tom Ford',
    category: 'Eau de Parfum',
    price: '6.500.000đ',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 3,
    name: 'Bleu de Chanel',
    category: 'Eau de Toilette',
    price: '3.400.000đ',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 4,
    name: 'Baccarat Rouge 540',
    category: 'Extrait de Parfum',
    price: '7.200.000đ',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80',
  },
];

const ProductPage = () => {
  return (
    <Box sx={{ backgroundColor: '#faf9f6', minHeight: '100vh', pb: 8 }}>

      {/* 1. Ảnh bìa (Page Header Banner) */}
      <Box
        sx={{
          position: 'relative',
          height: '260px',
          width: '100%',
          backgroundImage: `url('https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=1600&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 6
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.45)',
            zIndex: 1
          }}
        />

        <Box sx={{ position: 'relative', zIndex: 2, textAlign: 'center', px: 2 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              fontFamily: '"Playfair Display", serif',
              color: '#fff',
              letterSpacing: '2px',
              mb: 1,
              fontSize: { xs: '2rem', md: '2.8rem' }
            }}
          >
            BỘ SƯU TẬP NƯỚC HOA
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#e0e0e0',
              fontWeight: 300,
              fontSize: { xs: '0.9rem', md: '1.05rem' }
            }}
          >
            Đỉnh cao hương thơm độc bản dành riêng cho bạn
          </Typography>
        </Box>
      </Box>

      {/* 2. Danh sách sản phẩm */}
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product.id}>
              <Card
                elevation={0}
                sx={{
                  height: '450px',
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: '#ffffff',
                  border: '1px solid #eaeaea',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: '0 16px 32px rgba(0,0,0,0.06)',
                    borderColor: 'transparent'
                  }
                }}
              >
                {/* Khung ảnh sản phẩm */}
                <Box
                  sx={{
                    height: '240px',
                    width: '100%',
                    position: 'relative',
                    overflow: 'hidden',
                    backgroundColor: '#f7f7f7'
                  }}
                >
                  <CardMedia
                    component="img"
                    image={product.image}
                    alt={product.name}
                    sx={{
                      height: '100%',
                      width: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease',
                      '&:hover': { transform: 'scale(1.08)' }
                    }}
                  />
                </Box>

                {/* Thông tin sản phẩm */}
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 2 }}>
                  <Box>
                    <Typography
                      variant="caption"
                      sx={{
                        color: '#b89735',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '1.5px',
                        fontSize: '0.7rem'
                      }}
                    >
                      {product.category}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        fontSize: '1rem',
                        my: 0.8,
                        color: '#1a1a1a',
                        fontFamily: '"Playfair Display", serif',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {product.name}
                    </Typography>
                    <Rating value={product.rating} precision={0.1} readOnly size="small" sx={{ color: '#b89735' }} />
                  </Box>

                  {/* Phần giá và nút bấm căn chỉnh khoảng cách an toàn */}
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pt: 1.5, borderTop: '1px solid #f0f0f0', mt: 1, gap: 1 }}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 700,
                        color: '#1a1a1a',
                        fontSize: '0.9rem',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {product.price}
                    </Typography>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<ShoppingBagOutlinedIcon sx={{ fontSize: '14px !important', mr: -0.5 }} />}
                      sx={{
                        borderColor: '#1a1a1a',
                        color: '#1a1a1a',
                        borderRadius: '20px',
                        textTransform: 'none',
                        px: 1.2,
                        py: 0.4,
                        fontSize: '0.75rem',
                        fontWeight: 500,
                        minWidth: 'auto',
                        whiteSpace: 'nowrap',
                        '&:hover': {
                          backgroundColor: '#1a1a1a',
                          color: '#fff',
                          borderColor: '#1a1a1a'
                        }
                      }}
                    >
                      Chọn Mua
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ProductPage;