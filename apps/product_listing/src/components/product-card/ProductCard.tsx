import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import RatingDisplay from '../rating-display/RatingDisplay';
import Price from '../price/Price';
import { Product } from '../../commons/interfaces/product';
import { useTranslation } from 'react-i18next';

interface ProductCardProps {
  product: Product;
  rating?: number;
  ratingCount?: number;
  colorsAvailable?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  rating = 0,
  ratingCount = 0,
}) => {
  const { title, price, picture, free_shipping, id } = product;
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const quotas = 36;
  const colorsCount = Math.floor(Math.random() * (10 - 2 + 1)) + 2;
  const oldPrice =
    price.amount + Math.floor(Math.random() * (1000000 - 2 + 1)) + 2;
  const query = searchParams.get('search');

  const calculateQuota = (value: number, currency: string) => {
    return value.toLocaleString('es-CO', {
      style: 'currency',
      currency,
    });
  };

  return (
    <Link
      to={{
        pathname: `/items/${id}`,
      }}
      state={{ search: query }}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <Card
        sx={{
          display: 'flex',
          padding: '16px 25px',
          borderRadius: 0,
          boxShadow: 0,
          backgroundColor: '#fff',
          margin: '0 auto',
          cursor: 'pointer',
        }}
      >
        <CardMedia
          component='img'
          sx={{ width: 196, height: 'auto', objectFit: 'contain' }}
          image={picture}
          alt={title}
        />

        <CardContent
          sx={{ paddingBottom: 0, padding: 0, flex: 1, marginLeft: 3 }}
        >
          <Typography lineHeight={1.3} variant='h6' gutterBottom>
            {title}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
            }}
          >
            <Box
              sx={{
                flex: 1,
              }}
            >
              <Box>
                <Price price={{ ...price, old_price: oldPrice }} />
                <Typography margin={0} variant='caption'>
                  en 36x {calculateQuota(quotas, price.currency)}
                </Typography>
              </Box>

              {free_shipping && (
                <Typography
                  variant='body2'
                  sx={{
                    color: 'green',
                    mt: 1,
                    textTransform: 'capitalize',
                    fontWeight: 600,
                  }}
                >
                  {t('free_shipping')}
                </Typography>
              )}
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                mt: 3,
                flex: 1,
              }}
            >
              <RatingDisplay rating={rating} reviewCount={ratingCount} />
              <Typography marginTop={1} fontSize={12}>
                {t('available_colors', { count: colorsCount })}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
