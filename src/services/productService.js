import { publicRequest, userRequest } from '../utils/RequestMethods';

export const getProductsService = async (category = '') => {
  const { data } = await publicRequest.get(`/products${category ? `?category=${category}` : ''}`);
  return data;
};

export const getProductByIdService = async (id) => {
  const { data } = await publicRequest.get(`/products/find/${id}`);
  return data;
};

export const createProductService = async (product) => {
  const { data } = await userRequest.post('/products', product);
  return data;
};

export const updateProductService = async ({ id, product }) => {
  const { data } = await userRequest.put(`/products/${id}`, product);
  return data;
};

export const deleteProductService = async (id) => {
  const { data } = await userRequest.delete(`/products/${id}`);
  return data;
};
