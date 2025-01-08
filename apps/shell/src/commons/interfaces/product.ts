export interface Product {
  id: string;
  title: string;
  price: {
    currency: string;
    amount: number;
    decimals: number;
  };
  picture: string;
  condition: 'new' | 'used';
  free_shipping: boolean;
}

export type ProductDetail = Product & {
  sold_quantity: number;
  description: string;
};

export interface SearchResponse {
  author: {
    name: string;
    lastName: string;
  };
  items: Product[];
  categories: string[];
}

export interface ProductDetailResponse {
  author: {
    name: string;
    lastName: string;
  };
  item: ProductDetail;
}
