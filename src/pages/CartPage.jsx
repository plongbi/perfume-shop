import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  IconButton,
  Divider,
  Paper,
  TextField,
  Avatar,
  Chip
} from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import CardGiftcardOutlinedIcon from '@mui/icons-material/CardGiftcardOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { Link, useNavigate } from 'react-router-dom';
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl
} from '@mui/material';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart, clearCart, subtotal, totalItems } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoApplied, setPromoApplied] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(false);

  // Step state: 'cart' or 'checkout'
  const [step, setStep] = useState('cart');

  // Recipient form data
  const savedUserData = (() => {
    try {
      return JSON.parse(localStorage.getItem('user')) || {};
    } catch (e) {
      return {};
    }
  })();

  const [recipientName, setRecipientName] = useState(savedUserData.name || '');
  const [recipientAddress, setRecipientAddress] = useState(savedUserData.address || '');
  const [recipientPhone, setRecipientPhone] = useState(savedUserData.phone || '');
  const [formError, setFormError] = useState('');

  // Payment method: 'cod' or 'vnpay'
  const [paymentMethod, setPaymentMethod] = useState('cod');

  // Shipping fee calculation
  const shippingFee = subtotal > 2000000 || subtotal === 0 ? 0 : 40000;
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const finalTotal = subtotal - discountAmount + shippingFee;

  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (code === 'ESSENCE10' || code === 'VIP10') {
      setDiscountPercent(10);
      setPromoApplied(code);
      setPromoError('');
    } else if (code === 'LUXURY20') {
      setDiscountPercent(20);
      setPromoApplied(code);
      setPromoError('');
    } else {
      setPromoError('Mã ưu đãi không hợp lệ. Thử: ESSENCE10 hoặc LUXURY20');
      setDiscountPercent(0);
      setPromoApplied('');
    }
  };

  const handleProceedToCheckout = () => {
    setStep('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleConfirmOrder = async () => {
    if (!recipientName.trim() || !recipientAddress.trim() || !recipientPhone.trim()) {
      setFormError('Vui lòng điền đầy đủ Tên người nhận, Địa chỉ và Số điện thoại');
      return;
    }
    setFormError('');

    const savedUser = JSON.parse(localStorage.getItem('user')) || {};
    const orderPayload = {
      userId: savedUser.id || savedUser._id || null,
      userEmail: savedUser.email || 'guest@gmail.com',
      recipientName,
      phone: recipientPhone,
      address: recipientAddress,
      items: cart.map(item => ({
        productId: item._id || item.id,
        name: item.name,
        price: item.rawPrice || (typeof item.price === 'number' ? item.price : parseInt(String(item.price).replace(/[^0-9]/g, ''), 10)) || 0,
        quantity: item.quantity,
        image: item.image,
        category: item.category
      })),
      totalAmount: finalTotal,
      shippingFee,
      paymentMethod: paymentMethod === 'vnpay' ? 'VNPAY' : 'COD',
      paymentStatus: paymentMethod === 'vnpay' ? 'Paid' : 'Pending'
    };

    if (paymentMethod === 'vnpay') {
      // Redirect to VNPay payment page
      navigate('/payment/vnpay', {
        state: {
          ...orderPayload,
          totalAmount: finalTotal,
          shippingFee
        }
      });
    } else {
      // Handle COD order
      let savedOrderRecord = null;
      try {
        const res = await fetch('http://localhost:5000/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderPayload)
        });
        if (res.ok) {
          savedOrderRecord = await res.json();
        }
      } catch (err) {
        console.error('Lỗi lưu đơn hàng:', err);
      }

      // Save order to local storage fallback
      try {
        const localOrders = JSON.parse(localStorage.getItem('user_orders') || '[]');
        const fallbackOrder = savedOrderRecord || {
          ...orderPayload,
          orderCode: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
          createdAt: new Date().toISOString(),
          orderStatus: 'Processing'
        };
        localStorage.setItem('user_orders', JSON.stringify([fallbackOrder, ...localOrders]));
      } catch (e) {
        console.error('Lỗi lưu local orders:', e);
      }

      setOrderSuccess(true);
      clearCart();
    }
  };

  const formatPrice = (num) => {
    return new Intl.NumberFormat('vi-VN').format(num) + ' đ';
  };

  if (orderSuccess) {
    return (
      <Box sx={{ py: 12, backgroundColor: '#fcfbf9', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
        <Container maxWidth="sm">
          <Paper
            elevation={0}
            sx={{
              p: { xs: 4, md: 6 },
              textAlign: 'center',
              borderRadius: '24px',
              border: '1px solid rgba(0, 0, 0, 0.06)',
              backgroundColor: '#ffffff',
              boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.05)'
            }}
          >
            <Box
              sx={{
                width: 72,
                height: 72,
                borderRadius: '50%',
                backgroundColor: 'rgba(197, 160, 89, 0.12)',
                color: '#c5a059',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 3
              }}
            >
              <CheckCircleOutlineOutlinedIcon sx={{ fontSize: 44 }} />
            </Box>

            <Typography variant="overline" sx={{ color: '#c5a059', letterSpacing: '0.25em', fontWeight: 600 }}>
              Order Completed
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 600, fontFamily: '"Playfair Display", serif', color: '#18181b', mt: 0.5, mb: 1.5 }}>
              Đặt Hàng Thành Công!
            </Typography>
            <Typography variant="body2" sx={{ color: '#71717a', lineHeight: 1.7, mb: 4 }}>
              Cảm ơn quý khách đã lựa chọn <strong>ESSENCE Boutique</strong>. Chuyên viên mùi hương của chúng tôi sẽ liên hệ xác nhận và chuẩn bị đóng gói chống sốc cao cấp gửi đến quý khách.
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                component={Link}
                to="/profile"
                variant="contained"
                sx={{
                  backgroundColor: '#c5a059',
                  color: '#ffffff',
                  borderRadius: '9999px',
                  px: 3.5,
                  py: 1.3,
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  letterSpacing: '0.02em',
                  textTransform: 'none',
                  '&:hover': { backgroundColor: '#b88f42' }
                }}
              >
                Xem Lịch Sử Đơn Hàng →
              </Button>
              <Button
                component={Link}
                to="/products"
                variant="outlined"
                sx={{
                  borderColor: '#18181b',
                  color: '#18181b',
                  borderRadius: '9999px',
                  px: 3.5,
                  py: 1.3,
                  fontSize: '0.88rem',
                  fontWeight: 500,
                  letterSpacing: '0.02em',
                  textTransform: 'none',
                  '&:hover': { backgroundColor: 'rgba(0,0,0,0.05)', borderColor: '#18181b' }
                }}
              >
                Tiếp Tục Mua Sắm
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ py: { xs: 5, md: 8 }, backgroundColor: '#fcfbf9', minHeight: '85vh' }}>
      <Container maxWidth="lg" sx={{ px: { xs: 2, md: 3 } }}>
        {/* Nút quay lại */}
        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Button
            component={Link}
            to="/products"
            startIcon={<ArrowBackIcon sx={{ fontSize: '18px !important' }} />}
            sx={{
              color: '#71717a',
              textTransform: 'none',
              fontWeight: 500,
              fontSize: '0.86rem',
              p: 0,
              '&:hover': { color: '#18181b', backgroundColor: 'transparent' }
            }}
          >
            Tiếp tục khám phá nước hoa
          </Button>

          <Typography variant="body2" sx={{ color: '#a1a1aa', fontSize: '0.84rem' }}>
            Giỏ hàng của bạn: <strong style={{ color: '#18181b' }}>{totalItems} sản phẩm</strong>
          </Typography>
        </Box>

        {/* Tiêu đề giỏ hàng */}
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            fontFamily: '"Plus Jakarta Sans", "Montserrat", sans-serif',
            color: '#18181b',
            mb: 4,
            fontSize: { xs: '1.75rem', md: '2.3rem' },
            letterSpacing: '-0.03em'
          }}
        >
          Giỏ Hàng Quý Khách
        </Typography>

        {cart.length === 0 ? (
          /* Trường hợp giỏ hàng rỗng */
          <Paper
            elevation={0}
            sx={{
              p: { xs: 6, md: 10 },
              textAlign: 'center',
              borderRadius: '20px',
              border: '1px solid rgba(0, 0, 0, 0.06)',
              backgroundColor: '#ffffff'
            }}
          >
            <Box
              sx={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                backgroundColor: '#faf9f6',
                color: '#a1a1aa',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 2.5
              }}
            >
              <ShoppingBagOutlinedIcon sx={{ fontSize: 32 }} />
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#18181b', mb: 1 }}>
              Giỏ hàng của bạn đang trống
            </Typography>
            <Typography variant="body2" sx={{ color: '#71717a', mb: 4, maxWidth: '420px', mx: 'auto' }}>
              Hãy dạo quanh bộ sưu tập 50 nốt hương độc bản của ESSENCE để chọn cho mình mùi hương ưng ý nhất.
            </Typography>
            <Button
              component={Link}
              to="/products"
              variant="contained"
              sx={{
                backgroundColor: '#18181b',
                color: '#ffffff',
                borderRadius: '9999px',
                px: 4,
                py: 1.2,
                fontSize: '0.86rem',
                textTransform: 'none',
                fontWeight: 600,
                '&:hover': { backgroundColor: '#c5a059' }
              }}
            >
              Khám Phá Sản Phẩm Ngay
            </Button>
          </Paper>
        ) : step === 'checkout' ? (
          /* ========================================================
             BƯỚC 2: ĐIỀN THÔNG TIN NGƯỜI NHẬN & PHƯƠNG THỨC THANH TOÁN
             (KHỚP CHÍNH XÁC SCREENSHOT 1 CỦA NGƯỜI DÙNG)
             ======================================================== */
          <Grid container spacing={3.5} justifyContent="center">
            {/* Cột Trái: Thông Tin Người Nhận */}
            <Grid item xs={12} md={7}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3, sm: 4 },
                  borderRadius: '16px',
                  backgroundColor: '#ffffff',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                  border: '1px solid #edebe8',
                  minHeight: '380px'
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    color: '#18181b',
                    fontSize: { xs: '1.35rem', sm: '1.5rem' },
                    mb: 3,
                    fontFamily: '"Plus Jakarta Sans", sans-serif'
                  }}
                >
                  Thông Tin Người Nhận
                </Typography>

                {formError && (
                  <Box
                    sx={{
                      mb: 2.5,
                      p: 1.5,
                      borderRadius: '8px',
                      backgroundColor: '#fef2f2',
                      border: '1px solid #fecaca',
                      color: '#dc2626',
                      fontSize: '0.84rem'
                    }}
                  >
                    ⚠️ {formError}
                  </Box>
                )}

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                  {/* Tên người nhận */}
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 600, color: '#3f3f46', mb: 1, fontSize: '0.92rem' }}
                    >
                      Tên người nhận
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Nhập họ và tên người nhận"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      variant="outlined"
                      size="small"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px',
                          backgroundColor: '#ffffff',
                          '& fieldset': { borderColor: '#d4d4d8' },
                          '&:hover fieldset': { borderColor: '#a1a1aa' },
                          '&.Mui-focused fieldset': { borderColor: '#8b5cf6' }
                        }
                      }}
                    />
                  </Box>

                  {/* Địa chỉ người nhận */}
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 600, color: '#3f3f46', mb: 1, fontSize: '0.92rem' }}
                    >
                      Địa chỉ người nhận
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành"
                      value={recipientAddress}
                      onChange={(e) => setRecipientAddress(e.target.value)}
                      variant="outlined"
                      size="small"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px',
                          backgroundColor: '#ffffff',
                          '& fieldset': { borderColor: '#d4d4d8' },
                          '&:hover fieldset': { borderColor: '#a1a1aa' },
                          '&.Mui-focused fieldset': { borderColor: '#8b5cf6' }
                        }
                      }}
                    />
                  </Box>

                  {/* Số điện thoại */}
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 600, color: '#3f3f46', mb: 1, fontSize: '0.92rem' }}
                    >
                      Số điện thoại
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Nhập số điện thoại liên hệ"
                      value={recipientPhone}
                      onChange={(e) => setRecipientPhone(e.target.value)}
                      variant="outlined"
                      size="small"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px',
                          backgroundColor: '#ffffff',
                          '& fieldset': { borderColor: '#d4d4d8' },
                          '&:hover fieldset': { borderColor: '#a1a1aa' },
                          '&.Mui-focused fieldset': { borderColor: '#8b5cf6' }
                        }
                      }}
                    />
                  </Box>
                </Box>
              </Paper>
            </Grid>

            {/* Cột Phải: Thông Tin Thanh Toán */}
            <Grid item xs={12} md={5}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3, sm: 4 },
                  borderRadius: '16px',
                  backgroundColor: '#ffffff',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                  border: '1px solid #edebe8',
                  minHeight: '380px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <Box>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      color: '#18181b',
                      fontSize: { xs: '1.35rem', sm: '1.5rem' },
                      mb: 2.5,
                      fontFamily: '"Plus Jakarta Sans", sans-serif'
                    }}
                  >
                    Thông Tin Thanh Toán
                  </Typography>

                  {/* Danh sách tóm tắt các sản phẩm trong đơn */}
                  <Typography sx={{ color: '#52525b', fontSize: '0.88rem', fontWeight: 600, mb: 1.2 }}>
                    Sản phẩm thanh toán ({totalItems}):
                  </Typography>
                  <Box sx={{ mb: 2.5, maxHeight: '160px', overflowY: 'auto', pr: 0.5, display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {cart.map((item, idx) => (
                      <Box key={idx} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.84rem' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, overflow: 'hidden' }}>
                          <Typography sx={{ fontSize: '0.84rem', fontWeight: 600, color: '#18181b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '180px' }}>
                            {item.name}
                          </Typography>
                          {(item.isSale || item.name?.toLowerCase().includes('lost cherry')) && (
                            <Chip label="DEAL" size="small" sx={{ height: '18px', fontSize: '0.58rem', backgroundColor: '#ef4444', color: '#fff', fontWeight: 700 }} />
                          )}
                          <Typography sx={{ color: '#71717a', fontSize: '0.78rem' }}>x{item.quantity}</Typography>
                        </Box>
                        <Typography sx={{ fontWeight: 700, color: (item.isSale || item.name?.toLowerCase().includes('lost cherry')) ? '#ef4444' : '#18181b', fontSize: '0.86rem' }}>
                          {formatPrice((item.rawPrice || 0) * item.quantity)}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                  <Divider sx={{ mb: 2, borderColor: 'rgba(0,0,0,0.06)' }} />

                  {/* Phí vận chuyển */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography sx={{ color: '#52525b', fontSize: '0.92rem' }}>
                      Phí vận chuyển
                    </Typography>
                    <Typography sx={{ fontWeight: 600, color: '#18181b', fontSize: '0.95rem' }}>
                      {shippingFee === 0 ? '0 đ' : formatPrice(shippingFee)}
                    </Typography>
                  </Box>

                  {/* Chọn phương thức thanh toán */}
                  <Typography sx={{ color: '#52525b', fontSize: '0.92rem', fontWeight: 600, mb: 1 }}>
                    Chọn phương thức thanh toán:
                  </Typography>

                  <FormControl component="fieldset" sx={{ width: '100%', mb: 3 }}>
                    <RadioGroup
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                      <FormControlLabel
                        value="cod"
                        control={
                          <Radio
                            sx={{
                              color: '#8b5cf6',
                              '&.Mui-checked': { color: '#6366f1' }
                            }}
                          />
                        }
                        label={
                          <Typography sx={{ fontSize: '0.92rem', color: '#18181b', fontWeight: paymentMethod === 'cod' ? 600 : 400 }}>
                            Thanh toán khi nhận hàng (COD)
                          </Typography>
                        }
                      />

                      <FormControlLabel
                        value="vnpay"
                        control={
                          <Radio
                            sx={{
                              color: '#8b5cf6',
                              '&.Mui-checked': { color: '#6366f1' }
                            }}
                          />
                        }
                        label={
                          <Typography sx={{ fontSize: '0.92rem', color: '#18181b', fontWeight: paymentMethod === 'vnpay' ? 600 : 400 }}>
                            Thanh toán qua VNPay
                          </Typography>
                        }
                      />
                    </RadioGroup>
                  </FormControl>

                  {/* Tổng số tiền */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3.5, pt: 1 }}>
                    <Typography sx={{ fontWeight: 600, color: '#52525b', fontSize: '0.95rem' }}>
                      Tổng số tiền
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: 800,
                        color: '#16a34a',
                        fontSize: '1.35rem',
                        fontFamily: '"Plus Jakarta Sans", sans-serif'
                      }}
                    >
                      {formatPrice(finalTotal)}
                    </Typography>
                  </Box>
                </Box>

                {/* Các nút hành động: XÁC NHẬN THANH TOÁN & QUAY VỀ GIỎ HÀNG */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={handleConfirmOrder}
                    sx={{
                      py: 1.2,
                      borderRadius: '9999px',
                      borderColor: '#86efac',
                      color: '#16a34a',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      backgroundColor: '#f0fdf4',
                      borderWidth: '1.5px',
                      '&:hover': {
                        backgroundColor: '#16a34a',
                        borderColor: '#16a34a',
                        color: '#ffffff'
                      }
                    }}
                  >
                    XÁC NHẬN THANH TOÁN
                  </Button>

                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => {
                      setStep('cart');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    sx={{
                      py: 1.1,
                      borderRadius: '9999px',
                      borderColor: '#cbd5e1',
                      color: '#64748b',
                      fontWeight: 500,
                      fontSize: '0.88rem',
                      textTransform: 'none',
                      backgroundColor: '#ffffff',
                      '&:hover': {
                        backgroundColor: '#f8fafc',
                        borderColor: '#94a3b8',
                        color: '#334155'
                      }
                    }}
                  >
                    ← Quay về giỏ hàng
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        ) : (
          /* Danh sách giỏ hàng & Cột Tóm tắt thanh toán (BƯỚC 1) */
          <Grid container spacing={4}>
            {/* Cột 1: Danh sách sản phẩm trong giỏ */}
            <Grid item xs={12} lg={8}>
              <Paper
                elevation={0}
                sx={{
                  borderRadius: '20px',
                  border: '1px solid rgba(0, 0, 0, 0.06)',
                  backgroundColor: '#ffffff',
                  overflow: 'hidden'
                }}
              >
                {/* Header danh sách */}
                <Box
                  sx={{
                    p: 2.5,
                    borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
                    display: { xs: 'none', sm: 'grid' },
                    gridTemplateColumns: '4fr 2fr 2.5fr 1fr',
                    color: '#71717a',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase'
                  }}
                >
                  <Box>Sản Phẩm</Box>
                  <Box sx={{ textAlign: 'center' }}>Số Lượng</Box>
                  <Box sx={{ textAlign: 'right' }}>Thành Tiền</Box>
                  <Box sx={{ textAlign: 'right' }}>Xóa</Box>
                </Box>

                {/* Các hàng sản phẩm */}
                {cart.map((item, index) => {
                  const unitPrice = item.rawPrice || 0;
                  return (
                    <Box
                      key={item._id || index}
                      sx={{
                        p: { xs: 2.5, sm: 3 },
                        borderBottom: index < cart.length - 1 ? '1px solid rgba(0, 0, 0, 0.05)' : 'none',
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        alignItems: { xs: 'flex-start', sm: 'center' },
                        gap: 2.5
                      }}
                    >
                      {/* Ảnh & Tên sản phẩm */}
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5, flex: 4, width: '100%' }}>
                        <Avatar
                          src={item.image}
                          variant="rounded"
                          sx={{
                            width: 74,
                            height: 74,
                            borderRadius: '12px',
                            backgroundColor: '#f6f5f1',
                            border: '1px solid rgba(0,0,0,0.06)'
                          }}
                        />
                        <Box sx={{ flex: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.8, flexWrap: 'wrap' }}>
                            <Chip
                              label={item.category || 'Eau de Parfum'}
                              size="small"
                              sx={{
                                backgroundColor: '#f4eedb',
                                color: '#856434',
                                fontSize: '0.68rem',
                                fontWeight: 700,
                                height: '22px'
                              }}
                            />
                            {(item.isSale || item.name?.toLowerCase().includes('lost cherry')) && (
                              <Chip
                                label={`DEAL -${item.discountPercent || 35}%`}
                                size="small"
                                sx={{
                                  backgroundColor: '#ef4444',
                                  color: '#ffffff',
                                  fontSize: '0.65rem',
                                  fontWeight: 700,
                                  height: '22px'
                                }}
                              />
                            )}
                          </Box>
                          <Typography
                            variant="subtitle1"
                            sx={{
                              fontWeight: 700,
                              fontSize: '1.02rem',
                              color: '#18181b',
                              fontFamily: '"Plus Jakarta Sans", sans-serif',
                              lineHeight: 1.35
                            }}
                          >
                            {item.name}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                            <Typography variant="body2" sx={{ color: (item.isSale || item.name?.toLowerCase().includes('lost cherry')) ? '#ef4444' : '#c5a059', fontWeight: 700, fontSize: '0.96rem' }}>
                              {formatPrice(unitPrice)}
                            </Typography>
                            {(item.originalPrice || ((item.isSale || item.name?.toLowerCase().includes('lost cherry')) && '6.500.000₫')) && (
                              <Typography variant="caption" sx={{ color: '#a1a1aa', textDecoration: 'line-through', fontWeight: 500, fontSize: '0.82rem' }}>
                                {item.originalPrice || '6.500.000₫'}
                              </Typography>
                            )}
                          </Box>
                        </Box>
                      </Box>

                      {/* Bộ tăng giảm số lượng & Tiền */}
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: { xs: '100%', sm: 'auto' }, gap: 3, flex: 5.5 }}>
                        <Box
                          sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            border: '1.5px solid rgba(0, 0, 0, 0.12)',
                            borderRadius: '9999px',
                            p: '3px 10px',
                            backgroundColor: '#faf9f6'
                          }}
                        >
                          <IconButton
                            size="small"
                            onClick={() => updateQuantity(item._id || item.name, -1)}
                            sx={{ p: 0.5, color: '#71717a', '&:hover': { color: '#18181b' } }}
                          >
                            <RemoveIcon sx={{ fontSize: 15 }} />
                          </IconButton>
                          <Typography sx={{ px: 1.5, fontWeight: 700, fontSize: '0.92rem', color: '#18181b', minWidth: '26px', textAlign: 'center' }}>
                            {item.quantity}
                          </Typography>
                          <IconButton
                            size="small"
                            onClick={() => updateQuantity(item._id || item.name, 1)}
                            sx={{ p: 0.5, color: '#71717a', '&:hover': { color: '#18181b' } }}
                          >
                            <AddIcon sx={{ fontSize: 15 }} />
                          </IconButton>
                        </Box>

                        {/* Tổng thành tiền sản phẩm - TO, ĐẬM, SẮC NÉT */}
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 700,
                            color: '#18181b',
                            fontSize: '1.2rem',
                            fontFamily: '"Plus Jakarta Sans", "Montserrat", sans-serif',
                            display: { xs: 'none', sm: 'block' },
                            minWidth: '130px',
                            textAlign: 'right',
                            letterSpacing: '-0.02em'
                          }}
                        >
                          {formatPrice(unitPrice * item.quantity)}
                        </Typography>

                        {/* Nút xóa */}
                        <IconButton
                          onClick={() => removeFromCart(item._id || item.name)}
                          size="small"
                          sx={{
                            color: '#a1a1aa',
                            p: 1,
                            '&:hover': { color: '#ef4444', backgroundColor: 'rgba(239, 68, 68, 0.08)' }
                          }}
                        >
                          <DeleteOutlineOutlinedIcon sx={{ fontSize: 20 }} />
                        </IconButton>
                      </Box>
                    </Box>
                  );
                })}
              </Paper>

              {/* Cam kết đính kèm dưới giỏ hàng */}
              <Box sx={{ display: 'flex', gap: 3, mt: 3, flexWrap: 'wrap' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, color: '#71717a' }}>
                  <VerifiedOutlinedIcon sx={{ color: '#c5a059', fontSize: 18 }} />
                  <Typography variant="caption" sx={{ fontSize: '0.78rem' }}>100% Auth Chuẩn EU/US</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, color: '#71717a' }}>
                  <LocalShippingOutlinedIcon sx={{ color: '#c5a059', fontSize: 18 }} />
                  <Typography variant="caption" sx={{ fontSize: '0.78rem' }}>Miễn phí giao hàng đơn từ 2.000.000₫</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, color: '#71717a' }}>
                  <CardGiftcardOutlinedIcon sx={{ color: '#c5a059', fontSize: 18 }} />
                  <Typography variant="caption" sx={{ fontSize: '0.78rem' }}>Tặng kèm hộp quà & mẫu thử vial</Typography>
                </Box>
              </Box>
            </Grid>

            {/* Cột 2: Tóm tắt đơn hàng & Mã giảm giá */}
            <Grid item xs={12} lg={4}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3, md: 4 },
                  borderRadius: '20px',
                  border: '1px solid rgba(0, 0, 0, 0.06)',
                  backgroundColor: '#ffffff',
                  boxShadow: '0 15px 35px -10px rgba(0, 0, 0, 0.03)'
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 700, fontFamily: '"Plus Jakarta Sans", "Montserrat", sans-serif', color: '#18181b', mb: 2.5, fontSize: '1.2rem' }}>
                  Tóm Tắt Đơn Hàng
                </Typography>

                {/* Khung nhập voucher */}
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <TextField
                      placeholder="Mã ưu đãi (VD: ESSENCE10)"
                      variant="outlined"
                      size="small"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      sx={{
                        flex: 1,
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '9999px',
                          fontSize: '0.84rem',
                          '& fieldset': { borderColor: 'rgba(0,0,0,0.12)' },
                          '&.Mui-focused fieldset': { borderColor: '#c5a059' }
                        }
                      }}
                    />
                    <Button
                      variant="outlined"
                      onClick={handleApplyPromo}
                      sx={{
                        borderRadius: '9999px',
                        borderColor: '#18181b',
                        color: '#18181b',
                        textTransform: 'none',
                        px: 2.5,
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        '&:hover': { backgroundColor: '#18181b', color: '#fff', borderColor: '#18181b' }
                      }}
                    >
                      Áp Dụng
                    </Button>
                  </Box>

                  {promoApplied && (
                    <Typography variant="caption" sx={{ color: '#10b981', mt: 0.8, display: 'block', fontWeight: 600 }}>
                      ✓ Đã áp dụng mã {promoApplied} (-{discountPercent}%)
                    </Typography>
                  )}
                  {promoError && (
                    <Typography variant="caption" sx={{ color: '#ef4444', mt: 0.8, display: 'block' }}>
                      {promoError}
                    </Typography>
                  )}
                </Box>

                <Divider sx={{ borderColor: 'rgba(0, 0, 0, 0.06)', mb: 2.5 }} />

                {/* Các khoản thanh toán */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.8, mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', color: '#71717a', fontSize: '0.92rem' }}>
                    <span>Tạm tính ({totalItems} món):</span>
                    <span style={{ color: '#18181b', fontWeight: 700, fontSize: '1.02rem' }}>{formatPrice(subtotal)}</span>
                  </Box>

                  {discountAmount > 0 && (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', color: '#10b981', fontSize: '0.92rem' }}>
                      <span>Ưu đãi thành viên ({discountPercent}%):</span>
                      <span style={{ fontWeight: 700, fontSize: '1.02rem' }}>-{formatPrice(discountAmount)}</span>
                    </Box>
                  )}

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', color: '#71717a', fontSize: '0.92rem' }}>
                    <span>Phí vận chuyển:</span>
                    <span style={{ color: shippingFee === 0 ? '#10b981' : '#18181b', fontWeight: 700, fontSize: shippingFee === 0 ? '0.95rem' : '1.02rem' }}>
                      {shippingFee === 0 ? 'Miễn phí' : formatPrice(shippingFee)}
                    </span>
                  </Box>
                </Box>

                <Divider sx={{ borderColor: 'rgba(0, 0, 0, 0.06)', mb: 3 }} />

                {/* Tổng thanh toán - TO RÕ NÉT */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 3.5 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#18181b', fontSize: '1.05rem' }}>
                    Tổng Thanh Toán:
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 800,
                      color: '#c5a059',
                      fontFamily: '"Plus Jakarta Sans", "Montserrat", sans-serif',
                      fontSize: '1.85rem',
                      letterSpacing: '-0.03em'
                    }}
                  >
                    {formatPrice(finalTotal)}
                  </Typography>
                </Box>

                {/* Nút bấm chuyển sang bước Điền Thông Tin Đặt Hàng */}
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleProceedToCheckout}
                  sx={{
                    backgroundColor: '#18181b',
                    color: '#ffffff',
                    py: 1.4,
                    borderRadius: '9999px',
                    fontSize: '0.92rem',
                    fontWeight: 600,
                    letterSpacing: '0.04em',
                    textTransform: 'none',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
                    '&:hover': {
                      backgroundColor: '#c5a059',
                      boxShadow: '0 10px 25px rgba(197, 160, 89, 0.35)'
                    }
                  }}
                >
                  Tiến Hành Đặt Hàng
                </Button>

                <Typography variant="caption" sx={{ color: '#a1a1aa', textAlign: 'center', display: 'block', mt: 2, fontSize: '0.72rem' }}>
                  Bằng việc bấm Đặt hàng, quý khách đồng ý với Điều khoản dịch vụ của ESSENCE Boutique.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default CartPage;
