import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid, Card, CardMedia, CardContent, Button, Rating, CircularProgress } from '@mui/material';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Gọi API từ Backend Node.js khi component được mount
  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Lỗi kết nối API:', err);
        setLoading(false);
      });
  }, []);

  return (
    <Box sx={{ py: 8, backgroundColor: '#faf9f6', minHeight: '80vh' }}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            fontFamily: '"Playfair Display", serif',
            mb: 1,
            color: '#1a1a1a',
            textAlign: 'center'
          }}
        >
          Bộ Sưu Tập Nước Hoa
        </Typography>
        <Typography variant="body2" sx={{ color: '#777', mb: 6, textAlign: 'center' }}>
          Khám phá những nốt hương độc bản được chế tác từ các nhà hương hàng đầu
        </Typography>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress sx={{ color: '#b89735' }} />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product._id}>
                <Card
                  elevation={0}
                  sx={{
                    height: '450px',
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: '#ffffff',
                    border: '1px solid #eaeaea',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      boxShadow: '0 16px 32px rgba(0,0,0,0.06)'
                    }
                  }}
                >
                  <Box sx={{ height: '240px', width: '100%', position: 'relative', overflow: 'hidden', backgroundColor: '#f2f2f2' }}>
                    <CardMedia
                      component="img"
                      image={product.image}
                      alt={product.name}
                      sx={{ height: '100%', width: '100%', objectFit: 'cover' }}
                    />
                  </Box>

                  <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 2.5 }}>
                    <Box>
                      <Typography variant="caption" sx={{ color: '#b89735', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1.5px', fontSize: '0.7rem' }}>
                        {product.category}
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1.1rem', my: 0.8, color: '#1a1a1a', fontFamily: '"Playfair Display", serif', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {product.name}
                      </Typography>
                      <Rating value={product.rating || 5} precision={0.1} readOnly size="small" sx={{ color: '#b89735' }} />
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pt: 1.5, borderTop: '1px solid #eaeaea', mt: 1, gap: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1a1a1a', fontSize: '0.95rem' }}>
                        {product.price}
                      </Typography>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<ShoppingBagOutlinedIcon sx={{ fontSize: '14px !important' }} />}
                        sx={{
                          borderColor: '#1a1a1a',
                          color: '#1a1a1a',
                          borderRadius: '20px',
                          textTransform: 'none',
                          px: 1.5,
                          py: 0.4,
                          fontSize: '0.75rem',
                          fontWeight: 500,
                          '&:hover': { backgroundColor: '#1a1a1a', color: '#fff' }
                        }}
                      >
                        Thêm Giỏ Hàng
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default ProductPage;