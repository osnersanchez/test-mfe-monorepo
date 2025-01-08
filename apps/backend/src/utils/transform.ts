import { config } from './config';


interface Price {
  currency: string;
  amount: number;
  decimals: number;
}

interface Item {
  id: string;
  title: string;
  price: Price;
  picture: string;
  condition: string;
  free_shipping: boolean;
}

interface SearchResponse {
  author: string;
  categories: string[];
  items: Item[];
}

interface DetailResponse {
  author: string;
  item: {
    id: string;
    title: string;
    price: Price;
    picture: string;
    condition: string;
    free_shipping: boolean;
    sold_quantity: number;
    description: string;
  };
}

export const transformSearchResponse = (data: any): SearchResponse => ({
  author: `${config.author.name} ${config.author.lastName}`,
  categories:
    data.filters
      .find((f: any) => f.id === 'category')
      ?.values[0]?.path_from_root.map((c: any) => c.name) || [],
  items: data.results.slice(0, 4).map((item: any) => ({
    id: item.id,
    title: item.title,
    price: {
      currency: item.currency_id,
      amount: Math.floor(item.price),
      decimals: Number((item.price % 1).toFixed(2).substring(2)),
    },
    picture: item.thumbnail,
    condition: item.condition,
    free_shipping: item.shipping.free_shipping,
  })),
});

export const transformDetailResponse = (
  item: any,
  description: any
): DetailResponse => ({
  author: `${config.author.name} ${config.author.lastName}`,
  item: {
    id: item.id,
    title: item.title,
    price: {
      currency: item.currency_id,
      amount: Math.floor(item.price),
      decimals: Number((item.price % 1).toFixed(2).substring(2)),
    },
    picture: item.pictures[0]?.url || item.thumbnail,
    condition: item.condition,
    free_shipping: item.shipping.free_shipping,
    sold_quantity: item.sold_quantity,
    description: description.plain_text,
  },
});
