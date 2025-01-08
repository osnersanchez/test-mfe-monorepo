import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import ResultsPage from '../pages/results/ResultPage';
import ProductDetailPage from '../pages/product-detail/ProductDetailPage';

const RoutesConfig = () => {
  const location = useLocation();

  if (location.pathname === '/items' && !location.search.includes('search=')) {
    return <Navigate to="/items?search=iphone" replace />;
  }

  return (
    <Routes>
      <Route path='/items' element={<ResultsPage />} />
      <Route path='/items/:id' element={<ProductDetailPage />} />
      <Route path="*" element={<Navigate to="/items?search=iphone" replace />} />
    </Routes>
  );
};

export default RoutesConfig;