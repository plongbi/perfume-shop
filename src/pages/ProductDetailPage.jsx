import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Chip,
  Paper,
  Divider,
  Rating,
  IconButton,
  Breadcrumbs,
  Alert
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

// Dữ liệu fallback cho 3 tầng nốt hương dựa theo category và tên
const getFragranceNotes = (productName = '', category = '') => {
  return {
    topNotes: ['Cam Bergamot Calabria', 'Quả Bưởi hồng', 'Hạt tiêu Tứ Xuyên'],
    heartNotes: ['Hoa Phong lữ Ai Cập', 'Oải hương Pháp', 'Tiêu hồng', 'Cỏ Vetiver'],
    baseNotes: ['Gỗ tuyết tùng Virginia', 'Hổ phách xám (Ambroxan)', 'Gỗ đàn hương', 'Xạ hương']
  };
};

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('100ml');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addedNotice, setAddedNotice] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`);
        if (res.ok) {
          const data = await res.json();
          setProduct(data);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.warn('Lỗi fetch sản phẩm theo id:', err);
      }

      // Fallback: Tìm từ danh sách API all products
      try {
        const resAll = await fetch('http://localhost:5000/api/products');
        if (resAll.ok) {
          const all = await resAll.json();
          const found = all.find(p => p._id === id || p.id === id);
          if (found) {
            setProduct(found);
            setLoading(false);
            return;
          }
        }
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    };

    fetchProduct();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ py: 12, textAlign: 'center', backgroundColor: '#fcfbf9', minHeight: '80vh' }}>
        <Typography variant="body1" sx={{ color: '#71717a' }}>Đang tải nốt hương tinh tế...</Typography>
      </Box>
    );
  }

  if (!product) {
    return (
      <Box sx={{ py: 12, textAlign: 'center', backgroundColor: '#fcfbf9', minHeight: '80vh' }}>
        <Container maxWidth="sm">
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: '#18181b' }}>
            Không tìm thấy sản phẩm này
          </Typography>
          <Button
            component={Link}
            to="/products"
            variant="contained"
            sx={{ backgroundColor: '#18181b', borderRadius: '9999px', textTransform: 'none' }}
          >
            Quay lại bộ sưu tập
          </Button>
        </Container>
      </Box>
    );
  }

  // Tính giá theo dung tích
  // Parse giá số từ chuỗi ví dụ "3.950.000₫"
  const rawPriceNumber = parseInt(product.price.replace(/[^\d]/g, ''), 10) || 3500000;
  const currentPriceNumber = selectedSize === '50ml'
    ? Math.round(rawPriceNumber * 0.65)
    : selectedSize === '200ml'
    ? Math.round(rawPriceNumber * 1.7)
    : rawPriceNumber;

  const formattedCurrentPrice = new Intl.NumberFormat('vi-VN').format(currentPriceNumber) + '₫';
  const notes = getFragranceNotes(product.name, product.category);

  const handleAddToCart = () => {
    // Thêm vào giỏ với biến thể dung tích và số lượng
    const itemToAdd = {
      ...product,
      _id: `${product._id || product.id}_${selectedSize}`,
      name: `${product.name} (${selectedSize})`,
      price: formattedCurrentPrice,
      size: selectedSize
    };
    addToCart(itemToAdd, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 3000);
  };

  return (
    <Box sx={{ backgroundColor: '#fcfbf9', minHeight: '90vh', py: { xs: 4, md: 6 } }}>
      <Container maxWidth="lg">
        {/* Breadcrumb & Nút quay lại */}
        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
          <Breadcrumbs separator="›" aria-label="breadcrumb">
            <Link to="/" style={{ color: '#71717a', textDecoration: 'none', fontSize: '0.88rem' }}>Trang chủ</Link>
            <Link to="/products" style={{ color: '#71717a', textDecoration: 'none', fontSize: '0.88rem' }}>Bộ sưu tập</Link>
            <Typography sx={{ color: '#18181b', fontSize: '0.88rem', fontWeight: 600 }}>{product.name}</Typography>
          </Breadcrumbs>

          <Button
            component={Link}
            to="/products"
            startIcon={<ArrowBackIcon sx={{ fontSize: 18 }} />}
            sx={{
              color: '#71717a',
              textTransform: 'none',
              fontWeight: 500,
              fontSize: '0.86rem',
              '&:hover': { color: '#18181b', backgroundColor: 'transparent' }
            }}
          >
            Quay lại danh sách
          </Button>
        </Box>

        {addedNotice && (
          <Alert
            icon={<CheckCircleOutlineOutlinedIcon fontSize="inherit" />}
            severity="success"
            sx={{
              mb: 4,
              borderRadius: '12px',
              backgroundColor: '#f0fdf4',
              color: '#166534',
              '& .MuiAlert-icon': { color: '#16a34a' }
            }}
            action={
              <Button component={Link} to="/cart" size="small" sx={{ color: '#166534', fontWeight: 700, textTransform: 'none' }}>
                Xem giỏ hàng →
              </Button>
            }
          >
            Đã thêm <strong>{quantity}x {product.name} ({selectedSize})</strong> vào giỏ hàng thành công!
          </Alert>
        )}

        <Grid container spacing={{ xs: 4, md: 7 }} alignItems="flex-start">
          {/* CỘT TRÁI: ẢNH SẢN PHẨM CAO CẤP */}
          <Grid item xs={12} md={5.5}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, sm: 5 },
                borderRadius: '24px',
                backgroundColor: '#ffffff',
                border: '1px solid rgba(0, 0, 0, 0.06)',
                textAlign: 'center',
                position: 'sticky',
                top: '100px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.03)'
              }}
            >
              {/* Badge Phân Loại */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Chip
                  label={product.category || 'Eau de Parfum'}
                  sx={{
                    backgroundColor: '#f4eedb',
                    color: '#856434',
                    fontWeight: 700,
                    fontSize: '0.78rem',
                    letterSpacing: '0.04em'
                  }}
                />
                <IconButton
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  sx={{
                    color: isWishlisted ? '#ef4444' : '#a1a1aa',
                    backgroundColor: '#faf9f6',
                    '&:hover': { backgroundColor: '#f4f4f5' }
                  }}
                >
                  {isWishlisted ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
              </Box>

              {/* Hình ảnh */}
              <Box
                component="img"
                src={product.image}
                alt={product.name}
                sx={{
                  width: '100%',
                  maxHeight: '380px',
                  objectFit: 'contain',
                  display: 'block',
                  mx: 'auto',
                  transition: 'transform 0.4s ease',
                  '&:hover': { transform: 'scale(1.05)' }
                }}
              />

              <Typography variant="caption" sx={{ color: '#a1a1aa', mt: 3, display: 'block', fontSize: '0.78rem' }}>
                ✦ Đóng chai thủ công nguyên bản từ Pháp & Ý
              </Typography>
            </Paper>
          </Grid>

          {/* CỘT PHẢI: THÔNG TIN CHI TIẾT & CHỌN SIZE & NỐT HƯƠNG */}
          <Grid item xs={12} md={6.5}>
            {/* Tên & Rating */}
            <Typography
              variant="overline"
              sx={{ color: '#c5a059', letterSpacing: '0.2em', fontWeight: 700, fontSize: '0.85rem' }}
            >
              ESSENCE LUXURY COLLECTION
            </Typography>

            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                color: '#18181b',
                fontFamily: '"Plus Jakarta Sans", "Montserrat", sans-serif',
                fontSize: { xs: '2rem', md: '2.5rem' },
                letterSpacing: '-0.02em',
                mt: 0.5,
                mb: 1.5
              }}
            >
              {product.name}
            </Typography>

            {/* Đánh giá sao */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
              <Rating value={product.rating || 5} precision={0.1} readOnly size="small" sx={{ color: '#c5a059' }} />
              <Typography sx={{ fontSize: '0.88rem', fontWeight: 600, color: '#18181b' }}>
                {product.rating || 5}.0
              </Typography>
              <Typography sx={{ fontSize: '0.84rem', color: '#a1a1aa' }}>
                (128 khách hàng đã trải nghiệm)
              </Typography>
            </Box>

            {/* Giá sản phẩm to rõ nét */}
            <Box sx={{ p: 2.5, backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.06)', mb: 3.5, display: 'inline-block', width: '100%' }}>
              <Typography variant="caption" sx={{ color: '#71717a', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Giá niêm yết chính hãng:
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 2, mt: 0.5 }}>
                <Typography
                  sx={{
                    fontSize: '2rem',
                    fontWeight: 800,
                    color: '#18181b',
                    fontFamily: '"Plus Jakarta Sans", sans-serif'
                  }}
                >
                  {formattedCurrentPrice}
                </Typography>
                <Typography sx={{ color: '#16a34a', fontSize: '0.88rem', fontWeight: 600 }}>
                  ✓ Đã bao gồm thuế VAT & Hộp quà cao cấp
                </Typography>
              </Box>
            </Box>

            {/* Mô tả ngắn */}
            <Typography variant="body1" sx={{ color: '#52525b', lineHeight: 1.8, mb: 3.5, fontSize: '0.96rem' }}>
              {product.description || 'Một tuyệt tác mùi hương kết hợp hài hòa giữa nét cổ điển quý phái và phong vị đương đại, lưu hương quyến rũ trên da suốt 8-12 giờ.'}
            </Typography>

            <Divider sx={{ mb: 3.5, borderColor: 'rgba(0,0,0,0.06)' }} />

            {/* CHỌN DUNG TÍCH (SIZE 50ml, 100ml, 200ml) */}
            <Box sx={{ mb: 4 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                <Typography sx={{ fontWeight: 700, color: '#18181b', fontSize: '0.92rem' }}>
                  Chọn dung tích chai:
                </Typography>
                <Typography variant="caption" sx={{ color: '#c5a059', fontWeight: 600 }}>
                  Đang chọn: {selectedSize}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', gap: 1.5 }}>
                {['50ml', '100ml', '200ml'].map((size) => (
                  <Box
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    sx={{
                      flex: 1,
                      py: 1.2,
                      px: 2,
                      borderRadius: '12px',
                      border: '2px solid',
                      borderColor: selectedSize === size ? '#18181b' : 'rgba(0,0,0,0.08)',
                      backgroundColor: selectedSize === size ? '#18181b' : '#ffffff',
                      color: selectedSize === size ? '#ffffff' : '#18181b',
                      textAlign: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      '&:hover': { borderColor: '#18181b' }
                    }}
                  >
                    <Typography sx={{ fontWeight: 700, fontSize: '0.95rem' }}>{size}</Typography>
                    <Typography variant="caption" sx={{ opacity: 0.8, fontSize: '0.72rem' }}>
                      {size === '50ml' ? 'Bản du lịch' : size === '100ml' ? 'Tiêu chuẩn (Bán chạy)' : 'Bản đại tiệc'}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* SỐ LƯỢNG VÀ NÚT THÊM GIỎ HÀNG */}
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 4.5, flexWrap: 'wrap' }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  border: '1px solid rgba(0,0,0,0.12)',
                  borderRadius: '9999px',
                  backgroundColor: '#ffffff',
                  p: 0.5
                }}
              >
                <IconButton
                  size="small"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  sx={{ color: '#18181b' }}
                >
                  <RemoveIcon sx={{ fontSize: 16 }} />
                </IconButton>
                <Typography sx={{ px: 2, fontWeight: 700, fontSize: '0.92rem', minWidth: '32px', textAlign: 'center' }}>
                  {quantity}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => setQuantity(quantity + 1)}
                  sx={{ color: '#18181b' }}
                >
                  <AddIcon sx={{ fontSize: 16 }} />
                </IconButton>
              </Box>

              <Button
                variant="contained"
                onClick={handleAddToCart}
                startIcon={<ShoppingBagOutlinedIcon />}
                sx={{
                  flex: 1,
                  minWidth: '220px',
                  py: 1.4,
                  borderRadius: '9999px',
                  backgroundColor: '#18181b',
                  color: '#ffffff',
                  fontWeight: 600,
                  fontSize: '0.92rem',
                  textTransform: 'none',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
                  '&:hover': {
                    backgroundColor: '#c5a059',
                    boxShadow: '0 10px 25px rgba(197, 160, 89, 0.35)'
                  }
                }}
              >
                Thêm Vào Giỏ Hàng
              </Button>
            </Box>

            {/* KHỐI 3 TẦNG NỐT HƯƠNG ĐẶC TRƯNG (OLFACTORY PYRAMID) */}
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: '16px',
                backgroundColor: '#ffffff',
                border: '1px solid rgba(0, 0, 0, 0.06)',
                mb: 4
              }}
            >
              <Typography sx={{ fontWeight: 700, color: '#18181b', mb: 2, fontSize: '1rem', display: 'flex', alignItems: 'center', gap: 1 }}>
                <span>🌿</span> Kim Tự Tháp Nốt Hương (Olfactory Pyramid)
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {/* Hương đầu */}
                <Box>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: '#c5a059', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    1. Hương Đầu (Top Notes - 15 phút đầu)
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 0.5 }}>
                    {notes.topNotes.map((note, idx) => (
                      <Chip key={idx} label={note} size="small" sx={{ backgroundColor: '#faf9f6', border: '1px solid #edebe8', fontSize: '0.78rem' }} />
                    ))}
                  </Box>
                </Box>

                {/* Hương giữa */}
                <Box>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: '#c5a059', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    2. Hương Giữa (Heart Notes - Tâm điểm tỏa hương)
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 0.5 }}>
                    {notes.heartNotes.map((note, idx) => (
                      <Chip key={idx} label={note} size="small" sx={{ backgroundColor: '#faf9f6', border: '1px solid #edebe8', fontSize: '0.78rem' }} />
                    ))}
                  </Box>
                </Box>

                {/* Hương cuối */}
                <Box>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: '#c5a059', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    3. Hương Cuối (Base Notes - Đọng hương sâu thẳm)
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 0.5 }}>
                    {notes.baseNotes.map((note, idx) => (
                      <Chip key={idx} label={note} size="small" sx={{ backgroundColor: '#faf9f6', border: '1px solid #edebe8', fontSize: '0.78rem' }} />
                    ))}
                  </Box>
                </Box>
              </Box>
            </Paper>

            {/* Cam kết thương hiệu */}
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, color: '#52525b' }}>
                  <VerifiedOutlinedIcon sx={{ color: '#c5a059', fontSize: 20 }} />
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>100% Chính Hãng EU</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, color: '#52525b' }}>
                  <LocalShippingOutlinedIcon sx={{ color: '#c5a059', fontSize: 20 }} />
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>Freeship Đơn Từ 2Tr</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, color: '#52525b' }}>
                  <AutorenewOutlinedIcon sx={{ color: '#c5a059', fontSize: 20 }} />
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>Đổi Trả 7 Ngày</Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProductDetailPage;
