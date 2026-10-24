import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Divider,
  CircularProgress,
  Dialog,
  DialogContent,
  IconButton,
  Button
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CloseIcon from '@mui/icons-material/Close';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const VNPayPaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { clearCart } = useCart();

  // Order data from router state or fallback
  const orderData = location.state || {
    recipientName: 'Quý khách',
    address: 'Địa chỉ nhận hàng',
    phone: '',
    totalAmount: 81990000,
    shippingFee: 0
  };

  const [selectedMethod, setSelectedMethod] = useState('');
  const [processing, setProcessing] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const formatPrice = (num) => {
    return new Intl.NumberFormat('vi-VN').format(num) + ' đ';
  };

  const saveVNPayOrder = async () => {
    const savedUser = JSON.parse(localStorage.getItem('user')) || {};
    const finalPayload = {
      ...orderData,
      userId: orderData.userId || savedUser.id || savedUser._id || null,
      userEmail: orderData.userEmail || savedUser.email || 'guest@gmail.com',
      items: (orderData.items || []).map(item => ({
        ...item,
        price: typeof item.price === 'number' ? item.price : parseInt(String(item.price).replace(/[^0-9]/g, ''), 10) || 0
      })),
      paymentMethod: 'VNPAY',
      paymentStatus: 'Paid'
    };

    let savedOrderRecord = null;
    try {
      const res = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalPayload)
      });
      if (res.ok) {
        savedOrderRecord = await res.json();
      }
    } catch (e) {
      console.error('Lỗi lưu đơn hàng VNPay:', e);
    }

    // Save order to local storage fallback
    try {
      const localOrders = JSON.parse(localStorage.getItem('user_orders') || '[]');
      const fallbackOrder = savedOrderRecord || {
        ...finalPayload,
        orderCode: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
        createdAt: new Date().toISOString(),
        orderStatus: 'Processing'
      };
      localStorage.setItem('user_orders', JSON.stringify([fallbackOrder, ...localOrders]));
    } catch (err) {
      console.error('Lỗi backup VNPay order:', err);
    }
  };

  const handleSelectOption = (methodId) => {
    setSelectedMethod(methodId);
    if (methodId === 'vnpay_qr' || methodId === 'vnpay_app') {
      setShowQRModal(true);
    } else {
      // Simulate payment processing
      setProcessing(true);
      setTimeout(() => {
        setProcessing(false);
        setIsSuccess(true);
        saveVNPayOrder();
        clearCart();
      }, 1200);
    }
  };

  const handleConfirmQRPayment = () => {
    setShowQRModal(false);
    setIsSuccess(true);
    saveVNPayOrder();
    clearCart();
  };

  return (
    <Box sx={{ backgroundColor: '#f0f4f9', minHeight: '100vh', py: { xs: 3, md: 5 } }}>
      {/* Top bar back button */}
      <Container maxWidth="sm" sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box
            onClick={() => navigate('/cart')}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              cursor: 'pointer',
              color: '#1e293b',
              fontSize: '0.9rem',
              fontWeight: 500,
              '&:hover': { color: '#0284c7' }
            }}
          >
            <Box
              sx={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                backgroundColor: '#1e293b',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <ArrowBackIcon sx={{ fontSize: 16 }} />
            </Box>
            <span>Quay lại</span>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <span style={{ fontSize: '1.1rem' }}>🇻🇳</span>
            <Typography variant="caption" sx={{ fontWeight: 600, color: '#334155' }}>VI</Typography>
          </Box>
        </Box>
      </Container>

      {/* Main Container */}
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            borderRadius: '16px',
            backgroundColor: '#ffffff',
            boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
            overflow: 'hidden',
            p: { xs: 3, sm: 4 }
          }}
        >
          {isSuccess ? (
            /* Thông báo thanh toán thành công */
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Box
                sx={{
                  width: 68,
                  height: 68,
                  borderRadius: '50%',
                  backgroundColor: '#ecfdf5',
                  color: '#10b981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 2.5
                }}
              >
                <CheckCircleOutlineOutlinedIcon sx={{ fontSize: 44 }} />
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#0f172a', mb: 1 }}>
                Thanh Toán VNPAY Thành Công!
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b', mb: 1 }}>
                Mã giao dịch: <strong>VNP{Date.now().toString().slice(-8)}</strong>
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b', mb: 3 }}>
                Số tiền thanh toán: <strong style={{ color: '#10b981', fontSize: '1.15rem' }}>{formatPrice(orderData.totalAmount)}</strong>
              </Typography>
              <Box sx={{ display: 'flex', gap: 1.5, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  onClick={() => navigate('/profile')}
                  sx={{
                    backgroundColor: '#10b981',
                    color: '#ffffff',
                    px: 3,
                    py: 1.2,
                    borderRadius: '9999px',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    textTransform: 'none',
                    '&:hover': { backgroundColor: '#059669' }
                  }}
                >
                  Xem Lịch Sử Đơn Hàng →
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/products')}
                  sx={{
                    borderColor: '#005baa',
                    color: '#005baa',
                    px: 3,
                    py: 1.2,
                    borderRadius: '9999px',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    textTransform: 'none',
                    '&:hover': { backgroundColor: 'rgba(0, 91, 170, 0.05)', borderColor: '#005baa' }
                  }}
                >
                  Tiếp Tục Mua Sắm
                </Button>
              </Box>
            </Box>
          ) : (
            <>
              {/* Header logos: Sacombank, VNPay */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 3,
                  py: 1,
                  mb: 3
                }}
              >
                {/* SACOMBANK Logo mockup */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 800,
                      letterSpacing: '0.04em',
                      color: '#004b93',
                      fontFamily: 'system-ui, sans-serif'
                    }}
                  >
                    SACOMBANK
                  </Typography>
                  <Box
                    sx={{
                      width: 18,
                      height: 18,
                      borderRadius: '50%',
                      backgroundColor: '#e11d48',
                      color: '#fff',
                      fontSize: '11px',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    S
                  </Box>
                </Box>

                <Divider orientation="vertical" flexItem sx={{ height: 28, borderColor: '#cbd5e1' }} />

                {/* VNPAY QR Logo mockup */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      background: 'linear-gradient(135deg, #005baa 50%, #ed1c24 50%)',
                      borderRadius: '4px',
                      transform: 'rotate(45deg)'
                    }}
                  />
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="caption" sx={{ fontSize: '0.62rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', lineHeight: 1 }}>
                      CỔNG THANH TOÁN
                    </Typography>
                    <Typography variant="subtitle2" sx={{ fontWeight: 900, lineHeight: 1.1, color: '#005baa' }}>
                      VNPAY<span style={{ color: '#ed1c24' }}>QR</span>
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Title */}
              <Typography
                variant="h6"
                sx={{
                  textAlign: 'center',
                  fontWeight: 600,
                  fontSize: '1.25rem',
                  color: '#334155',
                  mb: 3.5
                }}
              >
                Chọn phương thức thanh toán (Test)
              </Typography>

              {processing && (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 3, gap: 2 }}>
                  <CircularProgress size={24} sx={{ color: '#005baa' }} />
                  <Typography variant="body2" sx={{ color: '#64748b' }}>Đang kết nối cổng thanh toán an toàn...</Typography>
                </Box>
              )}

              {/* Danh sách 4 phương thức thanh toán */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {/* 1. App Ngân hàng và Ví điện tử (VNPAY QR) */}
                <Paper
                  elevation={0}
                  onClick={() => handleSelectOption('vnpay_qr')}
                  sx={{
                    p: 2.2,
                    border: '1px solid #e2e8f0',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      borderColor: '#005baa',
                      boxShadow: '0 4px 12px rgba(0, 91, 170, 0.08)',
                      backgroundColor: '#f8fafc'
                    }
                  }}
                >
                  <Typography sx={{ fontWeight: 600, fontSize: '0.96rem', color: '#1e293b' }}>
                    App Ngân hàng và Ví điện tử (<span style={{ color: '#005baa' }}>VN</span><span style={{ color: '#ed1c24' }}>PAY</span><sup style={{ fontSize: '0.65rem' }}>QR</sup>)
                  </Typography>

                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid #e2e8f0',
                      borderRadius: '6px',
                      p: 0.5,
                      width: 44,
                      height: 44,
                      backgroundColor: '#ffffff'
                    }}
                  >
                    <Box sx={{ textAlign: 'center' }}>
                      <Box sx={{ fontSize: '0.55rem', fontWeight: 800, color: '#ed1c24', lineHeight: 1 }}>VNPAY</Box>
                      <Box sx={{ fontSize: '18px', lineHeight: 1 }}>📱</Box>
                    </Box>
                  </Box>
                </Paper>

                {/* 2. Thẻ nội địa và tài khoản ngân hàng */}
                <Paper
                  elevation={0}
                  onClick={() => handleSelectOption('local_bank')}
                  sx={{
                    p: 2.2,
                    border: '1px solid #e2e8f0',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      borderColor: '#005baa',
                      boxShadow: '0 4px 12px rgba(0, 91, 170, 0.08)',
                      backgroundColor: '#f8fafc'
                    }
                  }}
                >
                  <Typography sx={{ fontWeight: 600, fontSize: '0.96rem', color: '#1e293b' }}>
                    Thẻ nội địa và tài khoản ngân hàng
                  </Typography>

                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '26px'
                    }}
                  >
                    🏛️
                  </Box>
                </Paper>

                {/* 3. Thẻ thanh toán quốc tế */}
                <Paper
                  elevation={0}
                  onClick={() => handleSelectOption('intl_card')}
                  sx={{
                    p: 2.2,
                    border: '1px solid #e2e8f0',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      borderColor: '#005baa',
                      boxShadow: '0 4px 12px rgba(0, 91, 170, 0.08)',
                      backgroundColor: '#f8fafc'
                    }
                  }}
                >
                  <Box>
                    <Typography sx={{ fontWeight: 600, fontSize: '0.96rem', color: '#1e293b', mb: 0.8 }}>
                      Thẻ thanh toán quốc tế
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 0.8, alignItems: 'center' }}>
                      <Box sx={{ px: 0.6, py: 0.1, border: '1px solid #e2e8f0', borderRadius: '3px', fontSize: '0.65rem', fontWeight: 800, color: '#1a1f71', backgroundColor: '#f8fafc' }}>
                        VISA
                      </Box>
                      <Box sx={{ px: 0.6, py: 0.1, border: '1px solid #e2e8f0', borderRadius: '3px', fontSize: '0.65rem', fontWeight: 800, color: '#eb001b', backgroundColor: '#f8fafc' }}>
                        Mastercard
                      </Box>
                      <Box sx={{ px: 0.6, py: 0.1, border: '1px solid #e2e8f0', borderRadius: '3px', fontSize: '0.65rem', fontWeight: 800, color: '#007940', backgroundColor: '#f8fafc' }}>
                        JCB
                      </Box>
                      <Box sx={{ px: 0.6, py: 0.1, border: '1px solid #e2e8f0', borderRadius: '3px', fontSize: '0.65rem', fontWeight: 800, color: '#006fcf', backgroundColor: '#f8fafc' }}>
                        AMEX
                      </Box>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '28px'
                    }}
                  >
                    💳
                  </Box>
                </Paper>

                {/* 4. App VNPAY */}
                <Paper
                  elevation={0}
                  onClick={() => handleSelectOption('vnpay_app')}
                  sx={{
                    p: 2.2,
                    border: '1px solid #e2e8f0',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      borderColor: '#005baa',
                      boxShadow: '0 4px 12px rgba(0, 91, 170, 0.08)',
                      backgroundColor: '#f8fafc'
                    }
                  }}
                >
                  <Typography sx={{ fontWeight: 600, fontSize: '0.96rem', color: '#1e293b' }}>
                    App <span style={{ color: '#005baa' }}>VN</span><span style={{ color: '#ed1c24' }}>PAY</span>
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Box
                      sx={{
                        width: 22,
                        height: 22,
                        background: 'linear-gradient(135deg, #005baa 50%, #ed1c24 50%)',
                        borderRadius: '4px',
                        transform: 'rotate(45deg)'
                      }}
                    />
                    <Box sx={{ fontSize: '0.72rem', fontWeight: 800, color: '#ed1c24' }}>
                      VNPAY<sup style={{ fontSize: '0.5rem', color: '#005baa' }}>APP</sup>
                    </Box>
                  </Box>
                </Paper>
              </Box>

              {/* Secure Footer */}
              <Box
                sx={{
                  mt: 4,
                  pt: 2.5,
                  borderTop: '1px solid #f1f5f9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: 1.5
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="caption" sx={{ fontSize: '14px' }}>✉️</Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: '#0284c7',
                      textDecoration: 'underline',
                      fontSize: '0.82rem',
                      fontWeight: 500
                    }}
                  >
                    hotrovnpay@vnpay.vn
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      backgroundColor: '#e0f2fe',
                      color: '#0369a1',
                      px: 1,
                      py: 0.3,
                      borderRadius: '4px',
                      fontSize: '0.68rem',
                      fontWeight: 700
                    }}
                  >
                    <LockOutlinedIcon sx={{ fontSize: 13 }} />
                    secure GlobalSign
                  </Box>
                  <Box
                    sx={{
                      backgroundColor: '#fef3c7',
                      color: '#b45309',
                      px: 0.8,
                      py: 0.3,
                      borderRadius: '4px',
                      fontSize: '0.65rem',
                      fontWeight: 800
                    }}
                  >
                    PCI DSS COMPLIANT
                  </Box>
                </Box>
              </Box>
            </>
          )}
        </Paper>

        <Typography
          variant="caption"
          sx={{
            display: 'block',
            textAlign: 'center',
            color: '#64748b',
            mt: 3,
            fontSize: '0.8rem'
          }}
        >
          Phát triển bởi <strong>VNPAY © 2026</strong>
        </Typography>
      </Container>

      {/* Simulated QR Code Modal */}
      <Dialog
        open={showQRModal}
        onClose={() => setShowQRModal(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: { borderRadius: '20px', p: 1 }
        }}
      >
        <DialogContent sx={{ textAlign: 'center', py: 3, px: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#005baa' }}>
              Quét mã VNPAY-QR để thanh toán
            </Typography>
            <IconButton size="small" onClick={() => setShowQRModal(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Typography variant="body2" sx={{ color: '#64748b', mb: 2 }}>
            Số tiền thanh toán: <strong style={{ color: '#e11d48', fontSize: '1.1rem' }}>{formatPrice(orderData.totalAmount)}</strong>
          </Typography>

          <Box
            sx={{
              p: 2,
              border: '2px dashed #005baa',
              borderRadius: '12px',
              backgroundColor: '#f8fafc',
              display: 'inline-block',
              mb: 2.5
            }}
          >
            <Box
              component="img"
              src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=VNPAY_TEST_PAYMENT_${orderData.totalAmount}`}
              alt="VNPAY QR Code"
              sx={{ width: 180, height: 180, display: 'block', mx: 'auto' }}
            />
            <Typography variant="caption" sx={{ color: '#64748b', mt: 1, display: 'block', fontWeight: 600 }}>
              Sử dụng App Ngân hàng hoặc Ví VNPAY quét mã
            </Typography>
          </Box>

          <Box
            onClick={handleConfirmQRPayment}
            sx={{
              backgroundColor: '#16a34a',
              color: '#ffffff',
              py: 1.2,
              borderRadius: '9999px',
              fontWeight: 700,
              fontSize: '0.88rem',
              cursor: 'pointer',
              textAlign: 'center',
              boxShadow: '0 4px 12px rgba(22, 163, 74, 0.25)',
              '&:hover': { backgroundColor: '#15803d' }
            }}
          >
            Xác nhận giả lập đã quét mã thành công
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default VNPayPaymentPage;
