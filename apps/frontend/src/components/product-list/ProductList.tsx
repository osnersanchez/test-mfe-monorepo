import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid2';
import { Product } from '../../commons/interfaces/product';
import ProductCard from '../../components/product-card/ProductCard';

interface ProductListProps {
  products: Product[];
  sortOrder: string;
}

const ProductList: React.FC<ProductListProps> = ({ products, sortOrder }) => {
  const [sortedProducts, setSortedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const sorted = [...products];
    switch (sortOrder) {
      case 'price-asc':
        sorted.sort((a, b) => a.price.amount - b.price.amount);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price.amount - a.price.amount);
        break;
      case 'title-asc':
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'title-desc':
        sorted.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }
    setSortedProducts(sorted);
  }, [products, sortOrder]);

  return (
    <Grid container>
      {sortedProducts.map((product) => (
        <Grid
          size={{ xs: 12 }}
          key={product.id}
          sx={{ borderBottom: '1px solid #eee' }}
        >
          <ProductCard
            product={product}
            rating={4.9}
            ratingCount={573}
            colorsAvailable={5}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;
