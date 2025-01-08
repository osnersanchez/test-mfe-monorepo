import React from 'react';
import { Routes, Route } from 'react-router-dom';

const ProductListingModule = React.lazy(() => import('product_listing/Module'));
const ProductDetailModule = React.lazy(() => import('product_detail/Module'));

const RoutesConfig = () => {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/products" element={<ProductListingModule />} />
        <Route path="/products/:id" element={<ProductDetailModule />} />
      </Routes>
    </React.Suspense>
  );
};

export default RoutesConfig;
