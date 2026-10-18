import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Rating,
  CircularProgress,
  Chip
} from '@mui/material';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductPage = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  // Gọi API từ Backend Node.js
  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Lỗi kết nối API:', err);
        setLoading(false);
      });
  }, []);

  const categories = ['All', 'Eau de Parfum', 'Extrait de Parfum', 'Eau de Toilette', 'Eau de Cologne'];

  const filteredProducts = filter === 'All'
    ? products
    : products.filter(p => p.category?.toLowerCase() === filter.toLowerCase());

  return (
    <Box sx={{ py: { xs: 5, md: 7 }, backgroundColor: '#fcfbf9', minHeight: '85vh' }}>
      {/* Thu hẹp bề ngang tổng thể trang web về kích thước tiêu chuẩn lg (1140px) */}
      <Container maxWidth="lg" sx={{ px: { xs: 2, md: 3 } }}>
        {/* Tiêu đề & Giới thiệu */}
        <Box sx={{ textAlign: 'center', mb: 4.5 }}>
          <Typography
            variant="overline"
            sx={{
              color: '#c5a059',
              letterSpacing: '0.25em',
              fontWeight: 600,
              fontSize: '0.8rem',
              display: 'block',
              mb: 1
            }}
          >
            Curated Fragrance Collection
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 600,
              fontFamily: '"Playfair Display", serif',
              mb: 1.5,
              color: '#18181b',
              fontSize: { xs: '1.8rem', md: '2.4rem' },
              letterSpacing: '-0.02em'
            }}
          >
            Bộ Sưu Tập Nước Hoa
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: '#71717a',
              maxWidth: '520px',
              mx: 'auto',
              lineHeight: 1.6,
              fontSize: '0.88rem'
            }}
          >
            Khám phá 50 kiệt tác hương thơm danh tiếng được tuyển chọn theo từng cấp độ nồng độ.
          </Typography>

          {/* Bộ lọc nhanh Category */}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1.2, mt: 3, flexWrap: 'wrap' }}>
            {categories.map((cat) => (
              <Button
                key={cat}
                onClick={() => setFilter(cat)}
                variant={filter === cat ? 'contained' : 'outlined'}
                sx={{
                  borderRadius: '9999px',
                  px: 2.2,
                  py: 0.55,
                  fontSize: '0.78rem',
                  letterSpacing: '0.02em',
                  fontWeight: filter === cat ? 600 : 400,
                  backgroundColor: filter === cat ? '#18181b' : 'transparent',
                  color: filter === cat ? '#ffffff' : '#71717a',
                  borderColor: filter === cat ? '#18181b' : 'rgba(0, 0, 0, 0.1)',
                  '&:hover': {
                    backgroundColor: filter === cat ? '#27272a' : 'rgba(0, 0, 0, 0.04)',
                    borderColor: '#18181b',
                    color: '#18181b'
                  }
                }}
              >
                {cat === 'All' ? 'Tất cả' : cat}
              </Button>
            ))}
          </Box>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 12 }}>
            <CircularProgress sx={{ color: '#c5a059' }} size={42} thickness={3} />
          </Box>
        ) : filteredProducts.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 10, color: '#a1a1aa' }}>
            <Typography variant="body1">Chưa có sản phẩm nào trong danh mục này.</Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(2, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(4, 1fr)',
              lg: 'repeat(4, 1fr)'
            },
            gap: 2.5
          }}
        >
          {filteredProducts.map((product) => {
            const productId = product._id || product.id;
            return (
              <Card
                key={productId || Math.random()}
                elevation={0}
                sx={{
                  height: '355px',
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: '#ffffff',
                  border: '1px solid rgba(0, 0, 0, 0.06)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  position: 'relative',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 10px 24px -8px rgba(0, 0, 0, 0.08)',
                    borderColor: 'rgba(197, 160, 89, 0.45)',
                    '& .product-media': {
                      transform: 'scale(1.05)'
                    }
                  }
                }}
              >
                {/* Khung ảnh cao 185px, click để xem chi tiết sản phẩm */}
                <Box
                  component={Link}
                  to={`/products/${productId}`}
                  sx={{
                    height: '185px',
                    minHeight: '185px',
                    maxHeight: '185px',
                    width: '100%',
                    position: 'relative',
                    overflow: 'hidden',
                    backgroundColor: '#f8f7f4',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                >
                    <CardMedia
                      component="img"
                      image={product.image}
                      alt={product.name}
                      className="product-media"
                      sx={{
                        height: '100%',
                        width: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center',
                        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                      }}
                    />

                    {/* Tag danh mục nhỏ */}
                    <Chip
                      label={product.category || 'Eau de Parfum'}
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 8,
                        left: 8,
                        backgroundColor: 'rgba(255, 255, 255, 0.94)',
                        backdropFilter: 'blur(6px)',
                        color: '#18181b',
                        fontSize: '0.62rem',
                        fontWeight: 600,
                        letterSpacing: '0.02em',
                        border: '1px solid rgba(0,0,0,0.04)',
                        height: '20px'
                      }}
                    />

                    {/* Nút thích */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        width: 26,
                        height: 26,
                        borderRadius: '50%',
                        backgroundColor: 'rgba(255, 255, 255, 0.94)',
                        backdropFilter: 'blur(6px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        color: '#71717a',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          color: '#e11d48',
                          backgroundColor: '#ffffff'
                        }
                      }}
                    >
                      <FavoriteBorderOutlinedIcon sx={{ fontSize: '14px' }} />
                    </Box>
                  </Box>

                  {/* Nội dung card tinh gọn, chia đều kích thước */}
                  <CardContent
                    sx={{
                      flexGrow: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      p: 1.5,
                      '&:last-child': { pb: 1.5 }
                    }}
                  >
                    <Box>
                      {/* Tên sản phẩm cố định chiều cao đúng 2 dòng, click mở chi tiết */}
                      <Typography
                        component={Link}
                        to={`/products/${productId}`}
                        variant="subtitle2"
                        title={product.name}
                        sx={{
                          fontWeight: 600,
                          fontSize: '0.88rem',
                          color: '#18181b',
                          textDecoration: 'none',
                          fontFamily: '"Playfair Display", serif',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          lineHeight: 1.3,
                          height: '2.6em',
                          mb: 0.5,
                          cursor: 'pointer',
                          '&:hover': { color: '#c5a059' }
                        }}
                      >
                        {product.name}
                      </Typography>

                      {/* Đánh giá sao */}
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6, mb: 0.6 }}>
                        <Rating
                          value={product.rating || 5}
                          precision={0.5}
                          readOnly
                          size="small"
                          sx={{ color: '#c5a059', fontSize: '0.75rem' }}
                        />
                        <Typography variant="caption" sx={{ color: '#a1a1aa', fontSize: '0.7rem' }}>
                          ({product.rating || 5}.0)
                        </Typography>
                      </Box>

                      {/* Mô tả nốt hương chuẩn đúng 2 dòng bằng nhau cho mọi card */}
                      <Typography
                        variant="body2"
                        sx={{
                          color: '#71717a',
                          fontSize: '0.75rem',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          lineHeight: 1.35,
                          height: '2.7em',
                          mb: 1
                        }}
                      >
                        {product.description || 'Hương thơm cao cấp với độ lưu hương dài lâu và khí chất sang trọng.'}
                      </Typography>
                    </Box>

                    {/* Giá & Nút Thêm Giỏ Hàng */}
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        pt: 1,
                        borderTop: '1px solid rgba(0, 0, 0, 0.05)',
                        mt: 'auto'
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: 700,
                          color: '#18181b',
                          fontSize: '0.98rem',
                          fontFamily: '"Plus Jakarta Sans", "Montserrat", sans-serif',
                          letterSpacing: '-0.01em'
                        }}
                      >
                        {product.price}
                      </Typography>

                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => addToCart(product)}
                        startIcon={<ShoppingBagOutlinedIcon sx={{ fontSize: '13px !important' }} />}
                        sx={{
                          backgroundColor: '#18181b',
                          color: '#ffffff',
                          borderRadius: '9999px',
                          textTransform: 'none',
                          px: 1.5,
                          py: 0.35,
                          fontSize: '0.72rem',
                          fontWeight: 500,
                          letterSpacing: '0.02em',
                          boxShadow: 'none',
                          minWidth: 'auto',
                          '&:hover': {
                            backgroundColor: '#c5a059',
                            boxShadow: '0 4px 10px rgba(197, 160, 89, 0.3)'
                          }
                        }}
                      >
                        Thêm
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              );
            })}
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default ProductPage;