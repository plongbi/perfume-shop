import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom';
import bannerImage from '../assets/images/lelabo.jpg';

const HeroBanner = () => {
  return (
    <Box sx={{ py: { xs: 3, md: 5 }, px: { xs: 2, sm: 3, md: 4 }, backgroundColor: '#fcfbf9' }}>
      <Container maxWidth="xl" disableGutters>
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            maxWidth: '1280px',
            mx: 'auto',
            minHeight: { xs: '480px', sm: '540px', md: '600px' },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: { xs: '20px', md: '32px' },
            overflow: 'hidden',
            backgroundImage: `url(${bannerImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 40%',
            backgroundRepeat: 'no-repeat',
            boxShadow: '0 20px 50px -10px rgba(0, 0, 0, 0.12), 0 10px 20px -5px rgba(0, 0, 0, 0.04)',
            border: '1px solid rgba(0, 0, 0, 0.06)'
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(15, 15, 15, 0.45) 0%, rgba(15, 15, 15, 0.72) 100%)',
              zIndex: 1,
            }}
          />

          <Box sx={{ position: 'relative', zIndex: 2, textAlign: 'center', px: { xs: 3, sm: 6 }, py: 6, maxWidth: '780px' }}>
            <Typography
              variant="overline"
              sx={{
                display: 'inline-block',
                color: '#dfc285',
                letterSpacing: '0.28em',
                fontSize: { xs: '0.72rem', md: '0.82rem' },
                fontWeight: 600,
                mb: 1.5,
                textTransform: 'uppercase',
                borderBottom: '1px solid rgba(223, 194, 133, 0.35)',
                pb: 0.4
              }}
            >
              Haute Parfumerie & Artistry
            </Typography>

            <Typography
              variant="h1"
              sx={{
                color: '#ffffff',
                fontWeight: 600,
                fontFamily: '"Playfair Display", serif',
                letterSpacing: '-0.02em',
                lineHeight: { xs: 1.2, md: 1.15 },
                mb: 2.5,
                fontSize: { xs: '2rem', sm: '2.8rem', md: '3.6rem' },
                textShadow: '0 4px 20px rgba(0,0,0,0.5)'
              }}
            >
              Khơi Dậy Nốt Hương <br />
              <Box
                component="span"
                sx={{
                  fontStyle: 'italic',
                  fontWeight: 400,
                  background: 'linear-gradient(135deg, #ffffff 40%, #dfc285 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Độc Bản Của Riêng Bạn
              </Box>
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: 'rgba(255, 255, 255, 0.85)',
                maxWidth: '520px',
                mx: 'auto',
                mb: 4,
                fontWeight: 300,
                fontSize: { xs: '0.9rem', md: '1rem' },
                lineHeight: 1.7,
                letterSpacing: '0.01em'
              }}
            >
              Tuyển chọn những kiệt tác mùi hương niche từ các nhà điều chế hương thơm danh tiếng trên thế giới.
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                component={Link}
                to="/products"
                variant="contained"
                endIcon={<ArrowForwardIcon sx={{ fontSize: '18px !important', transition: 'transform 0.25s' }} />}
                sx={{
                  backgroundColor: '#c5a059',
                  color: '#ffffff',
                  borderRadius: '9999px',
                  px: 3.8,
                  py: 1.25,
                  fontWeight: 500,
                  fontSize: '0.88rem',
                  letterSpacing: '0.04em',
                  textTransform: 'none',
                  boxShadow: '0 10px 25px rgba(197, 160, 89, 0.35)',
                  '&:hover': {
                    backgroundColor: '#b88f42',
                    boxShadow: '0 14px 30px rgba(197, 160, 89, 0.5)',
                    '& .MuiButton-endIcon': {
                      transform: 'translateX(4px)'
                    }
                  }
                }}
              >
                Khám Phá Bộ Sưu Tập
              </Button>

              <Button
                component={Link}
                to="/products"
                variant="outlined"
                sx={{
                  color: '#ffffff',
                  borderColor: 'rgba(255, 255, 255, 0.4)',
                  borderRadius: '9999px',
                  px: 3.2,
                  py: 1.25,
                  fontWeight: 400,
                  fontSize: '0.88rem',
                  letterSpacing: '0.04em',
                  textTransform: 'none',
                  backdropFilter: 'blur(8px)',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  '&:hover': {
                    borderColor: '#ffffff',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)'
                  }
                }}
              >
                Xem Chi Tiết
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroBanner;