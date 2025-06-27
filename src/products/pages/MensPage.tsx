import { Product, ProductList } from ".."
import { useProducts } from "../hooks/useProducts";

export const MensPage = () => {

    const { productsQuery } = useProducts({ filterKey: "men's clothing" });
    const products = productsQuery.data || [] as Product[];

  return (
    <div className="flex-col">
      <h1 className="text-2xl font-bold">Productos para hombres</h1>

      <ProductList products={products} />

    </div>
  )
}