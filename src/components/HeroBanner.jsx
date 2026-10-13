import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import bannerImage from '../assets/images/lelabo.jpg';

const HeroBanner = () => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${bannerImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100vw', // Tràn toàn bộ chiều rộng màn hình
        marginLeft: 'calc(50% - 50vw)', // Mẹo CSS giúp box tràn viền tuyệt đối ngay cả khi nằm trong container khác
        minHeight: 'calc(100vh - 120px)',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Lớp phủ màu đen trong suốt */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.45)',
          zIndex: 1,
        }}
      />

      {/* Nội dung Banner căn giữa */}
      <Box sx={{ position: 'relative', zIndex: 2, textAlign: 'center', px: 2, maxWidth: '800px' }}>
        <Typography
          variant="h3"
          sx={{
            color: 'white',
            fontWeight: 'bold',
            letterSpacing: '2px',
            mb: 2,
            textTransform: 'uppercase',
            fontSize: { xs: '2rem', md: '3.5rem' }
          }}
        >
          Khám Phá Hương Thơm Độc Bản
        </Typography>

        <Typography
          variant="h6"
          sx={{
            color: '#e0e0e0',
            mb: 4,
            fontWeight: 300,
            fontSize: { xs: '0.9rem', md: '1.1rem' }
          }}
        >
          OFFERING THE MOST TAILORED SOLUTIONS FOR OUR SHOPPERS.
        </Typography>

        <Button
          variant="outlined"
          sx={{
            color: 'white',
            borderColor: '#8bc34a',
            borderWidth: '2px',
            borderRadius: '25px',
            padding: '10px 35px',
            fontWeight: 'bold',
            '&:hover': {
              borderColor: '#7cb342',
              backgroundColor: 'rgba(139, 195, 74, 0.2)',
              borderWidth: '2px',
            }
          }}
        >
          VIEW DETAILS
        </Button>
      </Box>
    </Box>
  );
};

export default HeroBanner;