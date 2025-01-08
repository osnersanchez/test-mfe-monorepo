import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Grid from '@mui/material/Grid2';
import { Box, Typography, useTheme } from '@mui/material';
import { ProductDetail } from '../../commons/interfaces/product';
import ImageGallery from '../image-gallery/ImageGallery';
import FeatureSelector from '../feature-selector/FeatureSelector';
import RatingDisplay from '../rating-display/RatingDisplay';
import Price from '../price/Price';
import DescriptionBox from '../description-box/DescriptionBox';
import ProductActionCard from '../product-action-card/ProductActionCard';

type ProductDetailCardProps = {
  product: ProductDetail;
};

const ProductDetailCard: React.FC<ProductDetailCardProps> = ({ product }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [selectedInternalMemory, setSelectedInternalMemory] = useState('256');
  const [selectedMemory, setSelectedMemory] = useState('8');
  const [selectedColor, setSelectedColor] = useState('red');
  const images = [
    product.picture,
    'https://placehold.co/300x400/000000/FFFFFF?text=Image+1',
    'https://placehold.co/300x400/CCCCCC/FFFFFF?text=Image+2',
    'https://placehold.co/300x400/AAAAAA/FFFFFF?text=Image+3',
  ];

  const internalMemoryOptions = [
    { label: '256 GB', value: '256' },
    { label: '512 GB', value: '512' },
    { label: '1 TB', value: '1024' },
  ];
  const memoryOptions = [
    { label: '8 GB', value: '8' },
    { label: '16 GB', value: '16' },
    { label: '18 GB', value: '18' },
  ];
  const colorOptions = [
    { label: product.picture, value: 'original' },
    { label: product.picture, value: 'purple' },
    { label: product.picture, value: 'red' },
    { label: product.picture, value: 'green' },
  ];
  const rating = useMemo(
    () => Number((Math.random() * (5 - 1) + 1).toFixed(1)),
    []
  );
  const ratingCount = useMemo(
    () => Math.floor(Math.random() * (1000 - 20 + 1)) + 20,
    []
  );
  const oldPrice = useMemo(
    () =>
      product.price.amount + Math.floor(Math.random() * (1000000 - 2 + 1)) + 2,
    [product.price.amount]
  );

  return (
    <Grid bgcolor={theme.palette.background.paper} container>
      <Grid container>
        <Grid padding={3} size={{ xs: 4 }}>
          <ImageGallery images={images} />
        </Grid>
        <Grid py={3} size={{ xs: 4 }}>
          <Typography
            pb={1}
            fontSize={12}
            color='secondary'
            sx={{ opacity: 0.4 }}
          >
            {t(product.condition)}
          </Typography>
          <Typography pb={3} fontSize={22} fontWeight={600} variant='h1'>
            {product.title}
          </Typography>
          <Box pb={1}>
            <Price price={{ ...product.price, old_price: oldPrice }} />
          </Box>
          <Box pb={3}>
            <RatingDisplay rating={rating} reviewCount={ratingCount} />
          </Box>

          <Box display='flex' flexDirection='column' gap={1}>
            <FeatureSelector
              showAs='text'
              title={t('internal_memory')}
              options={internalMemoryOptions}
              selectedOption={selectedInternalMemory}
              onOptionSelect={setSelectedInternalMemory}
            />
            <FeatureSelector
              showAs='text'
              title={t('memory')}
              options={memoryOptions}
              selectedOption={selectedMemory}
              onOptionSelect={setSelectedMemory}
            />
            <FeatureSelector
              showAs='image'
              title={t('color')}
              options={colorOptions}
              selectedOption={selectedColor}
              onOptionSelect={setSelectedColor}
            />
          </Box>
        </Grid>
        <Grid size={{ xs: 4 }}>
          <ProductActionCard />
        </Grid>
      </Grid>
      <Grid
        borderTop={1}
        borderColor={`${theme.palette.secondary.main}1a`}
        margin={3}
        size={{ xs: 8 }}
      >
        <DescriptionBox description={product.description} />
      </Grid>
    </Grid>
  );
};

export default ProductDetailCard;
