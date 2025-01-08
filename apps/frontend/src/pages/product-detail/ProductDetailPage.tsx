import { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { Box, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ProductDetail, ProductDetailResponse } from '../../commons/interfaces/product';
import Spinner from '../../components/spinner/Spinner';
import ErrorMessage from '../../components/error-message/ErrorMessage';
import ProductBreadcrumbs from '../../components/product-breadcrumbs/ProductBreadcrumbs';
import ProductDetailCard from '../../components/product-detail-card/ProductDetailCard';
import { useApi } from '../../context/fetch-provider/FetchProvider';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const theme = useTheme();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const { t } = useTranslation();
  const { fetchApi } = useApi();

  const searchQuery = location.state?.search || '';

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await fetchApi<ProductDetailResponse>(`/items/${id}`);
        const data = await response.data
        setProduct(data.item);
        setCategories(['Celulares y telefonos', 'Celulares y Smartphones']);
      } catch (err) {
        console.error(err);
        setError(t('error_loading'));
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, t]);

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <Box sx={{ padding: 4 }}>
      <Box py={2} display='flex' alignItems='center' gap={2}>
        <Box
          sx={{
            borderRight: '1px solid #0003',
            lineHeight: 1,
            pr: 2,
            color: theme.palette.info.main,
            fontSize: 14
          }}
        >
          <Link
            to={`/items?search=${searchQuery}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            Volver
          </Link>
        </Box>
        <ProductBreadcrumbs categories={categories} />
      </Box>
      {product ? (
        <>
          <ProductDetailCard product={product} />
        </>
      ) : (
        <ErrorMessage message={t('not_found')} />
      )}
    </Box>
  );
};

export default ProductDetailPage;
