import { Product, ProductList } from ".."
import { useProducts } from "../hooks/useProducts";


export const CompleteListPage = () => {

  const { productsQuery } = useProducts({});
  const products = productsQuery.data || [] as Product[];

  return (
    <div className="flex-col">
      <h1 className="text-2xl font-bold">Todos los productos</h1>

      <ProductList products={ products } />

    </div>
  )
}