import React from 'react';
import { Box, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

interface RatingDisplayProps {
  rating: number;
  reviewCount: number;
}

const RatingDisplay: React.FC<RatingDisplayProps> = ({
  rating,
  reviewCount,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        color: 'gray',
        fontSize: '14px',
      }}
    >
      <Typography
        variant='body2'
        sx={{ color: '#666', fontWeight: 500, marginRight: '4px' }}
      >
        {rating.toFixed(1)}
      </Typography>

      {[...Array(5)].map((_, index) => (
        <StarIcon
          key={index}
          sx={{
            fontSize: 18,
            color: index < Math.round(rating) ? '#007bff' : '#dcdcdc',
            marginRight: '2px',
          }}
        />
      ))}

      <Typography variant='body2' sx={{ color: '#666', marginLeft: '4px' }}>
        ({reviewCount})
      </Typography>
    </Box>
  );
};

export default RatingDisplay;
