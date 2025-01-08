import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import BoltIcon from '@mui/icons-material/Bolt';
import PublicIcon from '@mui/icons-material/Public';
import { useTranslation } from 'react-i18next';
import { Product, SearchResponse } from '../commons/interfaces/product';
import Spinner from '../components/spinner/Spinner';
import ErrorMessage from '../components/error-message/ErrorMessage';
import ProductBreadcrumbs from '../components/product-breadcrumbs/ProductBreadcrumbs';
import { useApi } from '../context/fetch-provider/FetchProvider';
import FilterOption from '../components/filter-option/FilterOption';
import BrandFilter from '../components/brand-filter/BrandFilter';
import BrandBanner from '../components/brand-banner/BrandBanner';
import FilterMenu from '../components/filter-menu/FilterMenu';
import ProductList from '../components/product-list/ProductList';
import { BrandsBanner, BrandsMock } from '../commons/mocks/search-mocks';

const ResultsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();
  const { fetchApi } = useApi();
  const query = searchParams.get('search');
  const [sortOrder, setSortOrder] = useState('relevance');
  const [fullActive, setFullActive] = useState(false);
  const [freeShippingActive, setFreeShippingActive] = useState(false);
  const [internationalActive, setInternationalActive] = useState(false);

  useEffect(() => {
    if (!query) return;

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetchApi<SearchResponse>(`/items?q=${query}`);
        if (response.error) {
          setError(response.error);
          setProducts([]);
          setCategories([]);
        } else {
          setProducts(response.data.items);
          setCategories(response.data.categories || []);
          setError('');
        }
      } catch (err) {
        console.error(err);
        setError(t('error_fetching_results'));
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query, fetchApi, t]);

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!products.length) return <ErrorMessage message={t('no_results')} />;

  return (
    <Grid container spacing={7}>
      <Grid size={{ xs: 12, md: 3 }}>
        <ProductBreadcrumbs categories={categories} />
        <Typography
          variant='h5'
          sx={{ marginTop: 2, textTransform: 'capitalize' }}
        >
          {query}
        </Typography>
        <Typography variant='body2' sx={{ marginBottom: 4 }}>
          {products.length} {t('results')}
        </Typography>
        <Box
          sx={{
            backgroundColor: '#f5f5f5',
            borderRadius: '8px',
            marginBottom: 4,
          }}
        >
          <FilterOption
            description={t('in_the_cart_from', { amount: '$90.000' })}
            isActive={fullActive}
            onToggle={() => setFullActive(!fullActive)}
          >
            <Box display='flex' alignItems={'center'}>
              <BoltIcon sx={{ color: '#00a650' }} />
              <Typography
                fontStyle={'italic'}
                fontSize={14}
                fontWeight={600}
                color='#00a650'
              >
                FULL
              </Typography>
              <Typography noWrap fontSize={14} pl={0.5}>
                te da envío gratis
              </Typography>
            </Box>
          </FilterOption>
          <FilterOption
            title={t('free_shipping')}
            isActive={freeShippingActive}
            onToggle={() => setFreeShippingActive(!freeShippingActive)}
          />
          <FilterOption
            description={t(
              'thousands_of_products_from_around_the_world_to_your_home'
            )}
            isActive={internationalActive}
            onToggle={() => setInternationalActive(!internationalActive)}
          >
            <Box gap={0.5} mb={1} display='flex' alignItems={'center'}>
              <PublicIcon fontSize='small' sx={{ color: '#204e96' }} />
              <Typography
                noWrap
                fontStyle='italic'
                fontWeight={600}
                letterSpacing={-0.2}
                color='#204e96'
                fontSize={12}
              >
                COMPRA INTERNACIONAL
              </Typography>
            </Box>
          </FilterOption>
        </Box>
        <BrandFilter type={t('brand')} filters={BrandsMock} />
      </Grid>

      <Grid size={{ xs: 12, md: 9 }}>
        <Grid display={'flex'} justifyContent={'flex-end'}>
          <FilterMenu sortOrder={sortOrder} onSortChange={setSortOrder} />
        </Grid>

        <Grid pb={6}>
          <BrandBanner brands={BrandsBanner} />
        </Grid>

        <ProductList products={products} sortOrder={sortOrder} />
      </Grid>
    </Grid>
  );
};

export default ResultsPage;
