import React from 'react';
import { Box, Typography } from '@mui/material';

interface PriceProps {
  price: {
    currency: string;
    amount: number;
    decimals: number;
    old_price: number;
  };
}

const Price: React.FC<PriceProps> = ({ price }) => {
  const { currency, amount, decimals, old_price } = price;

  const discount = Math.round(((old_price - amount) / old_price) * 100);

  const formatPrice = (value: number) => {
    return value.toLocaleString('es-CO', {
      style: 'currency',
      currency,
      minimumFractionDigits: decimals,
    });
  };

  return (
    <Box>
      {old_price ? (
        <Typography
          variant='body2'
          sx={{
            textDecoration: 'line-through',
            color: '#999',
            fontSize: '14px',
          }}
        >
          {formatPrice(old_price)}
        </Typography>
      ) : null}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Typography
          variant='h5'
          sx={{
            letterSpacing: '-.8px',
            lineHeight: 1,
          }}
        >
          {formatPrice(amount)}
        </Typography>
        {discount > 0 && (
          <Typography
            variant='body2'
            sx={{
              color: 'green',
              fontWeight: 'bold',
              fontSize: '14px',
            }}
          >
            {discount}% OFF
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Price;
