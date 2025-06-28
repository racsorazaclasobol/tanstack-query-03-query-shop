import { productsApi } from "../api/productsApi";
import { Product, ProductLike } from "../interfaces/products";

interface GetProductOptions {
  filterKey?: string;
}

export const getProducts = async ({ filterKey }: GetProductOptions) => {

  const params = new URLSearchParams();

  if (filterKey) {
    params.append('category', filterKey);
  }

  const { data } = await productsApi.get<Product[]>('/products', {params});

  return data;
}

export const getProductById = async (id: number) => {

  const { data } = await productsApi.get<Product>(`/products/${id}`);

  return data;
}

export const createProduct = async (product: ProductLike) => {

  throw new Error("Error creando producto");

  const {data} = await productsApi.post(`/products/`, product);

  return data;
}