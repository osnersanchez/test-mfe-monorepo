import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface Brand {
  name: string;
  logo: string;
}

interface BrandBannerProps {
  brands: Brand[];
}

const BrandBanner: React.FC<BrandBannerProps> = ({ brands }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [itemPadding, setItemPadding] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const updateStyles = () => {
      if (!containerRef.current) return;

      const containerWidth = containerRef.current.offsetWidth;
      const scrollWidth = containerRef.current.scrollWidth;
      const minItemWidth = 120;
      const visibleItems = Math.floor(containerWidth / minItemWidth);
      const remainingSpace = containerWidth - visibleItems * minItemWidth;

      const padding = remainingSpace / (visibleItems * 2);
      setItemPadding(padding);

      setCanScrollLeft(containerRef.current.scrollLeft > 0);
      setCanScrollRight(
        containerRef.current.scrollLeft + containerWidth < scrollWidth
      );
    };

    updateStyles();
    window.addEventListener('resize', updateStyles);
    containerRef.current?.addEventListener('scroll', updateStyles);

    return () => {
      window.removeEventListener('resize', updateStyles);
      containerRef.current?.removeEventListener('scroll', updateStyles);
    };
  }, []);

  const smoothScroll = (distance: number) => {
    if (!containerRef.current) return;

    const start = containerRef.current.scrollLeft;
    const end = start + distance;
    const duration = 300;
    const startTime = performance.now();

    const animateScroll = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);

      containerRef.current!.scrollLeft = start + (end - start) * progress;

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  };

  const scrollContainer = (direction: 'left' | 'right') => {
    if (!containerRef.current) return;

    const scrollAmount = 120 + itemPadding * 2;
    if (direction === 'left') {
      smoothScroll(-scrollAmount);
    } else {
      smoothScroll(scrollAmount);
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {canScrollLeft && (
        <IconButton
          onClick={() => scrollContainer('left')}
          color='info'
          sx={{
            position: 'absolute',
            left: -10,
            zIndex: 1,
          }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>
      )}

      <Box
        ref={containerRef}
        sx={{
          display: 'flex',
          overflowX: 'hidden',
          width: '100%',
        }}
      >
        {brands.map((brand, index) => (
          <Box
            key={index}
            sx={{
              padding: `0 ${itemPadding}px`,
            }}
          >
            <Box
              sx={{
                minWidth: '120px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <Box
                component='img'
                src={brand.logo}
                alt={brand.name}
                sx={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  objectFit: 'contain',
                  backgroundColor: '#fff',
                  padding: '20px',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                }}
              />
              <Typography variant='body2' fontWeight='bold' sx={{ mt: 1 }}>
                {brand.name}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      {canScrollRight && (
        <IconButton
          onClick={() => scrollContainer('right')}
          color='info'
          sx={{
            position: 'absolute',
            right: -10,
            zIndex: 1,
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      )}
    </Box>
  );
};

export default BrandBanner;
