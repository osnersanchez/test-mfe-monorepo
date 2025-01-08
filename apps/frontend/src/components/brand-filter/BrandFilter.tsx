import React, { useState } from 'react';
import { Box, Typography, Link } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface Brand {
  name: string;
  count: number;
}

interface BrandFilterProps {
  filters: Brand[];
  type: string;
}

const BrandFilter: React.FC<BrandFilterProps> = ({ filters, type }) => {
  const [showAll, setShowAll] = useState(false);
  const { t } = useTranslation();
  const visibleBrands = showAll ? filters : filters.slice(0, 8);

  const handleToggle = () => {
    setShowAll(!showAll);
  };

  return (
    <Box>
      <Typography
        variant='h6'
        sx={{ marginBottom: 1, fontSize: 16, textTransform: 'capitalize' }}
      >
        {type}
      </Typography>
      <Box component='ul' sx={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {visibleBrands.map((brand, index) => (
          <Box
            component='li'
            key={index}
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              gap: '2px',
              marginBottom: 1,
              fontSize: '14px',
              color: '#666',
            }}
          >
            <span>{brand.name}</span>
            <span style={{ color: '#999' }}>({brand.count})</span>
          </Box>
        ))}
      </Box>
      <Link
        component='button'
        onClick={handleToggle}
        sx={{
          fontSize: '14px',
          color: '#007bff',
          textDecoration: 'none',
          cursor: 'pointer',
          textTransform: 'capitalize',
        }}
      >
        {`${t('show')} ${showAll ? t('less') : t('more')}`}
      </Link>
    </Box>
  );
};

export default BrandFilter;
