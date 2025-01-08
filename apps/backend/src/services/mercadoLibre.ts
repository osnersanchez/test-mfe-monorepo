import axios from 'axios';
import cache from '../utils/cache';
import { transformDetailResponse, transformSearchResponse } from '../utils/transform';


interface SearchResponse {
  [key: string]: any;
}

interface DetailResponse {
  [key: string]: any;
}

export const getItems = async (query: string): Promise<SearchResponse> => {
  const cacheKey = `search_${query}`;
  const cachedData = cache.get(cacheKey);
  if (cachedData) return cachedData;

  const response = await axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${query}`);
  const transformedData = transformSearchResponse(response.data);
  cache.set(cacheKey, transformedData);
  return transformedData;
};

export const getItemDetail = async (id: string): Promise<DetailResponse> => {
  const cacheKey = `detail_${id}`;
  const cachedData = cache.get(cacheKey);
  if (cachedData) return cachedData;

  const [itemResponse, descriptionResponse] = await Promise.all([
    axios.get(`https://api.mercadolibre.com/items/${id}`),
    axios.get(`https://api.mercadolibre.com/items/${id}/description`),
  ]);

  const transformedData = transformDetailResponse(itemResponse.data, descriptionResponse.data);
  cache.set(cacheKey, transformedData);
  return transformedData;
};
