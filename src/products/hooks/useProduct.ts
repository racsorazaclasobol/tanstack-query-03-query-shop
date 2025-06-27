import { useQuery } from "@tanstack/react-query"
import { productsActions } from "..";

interface GetProductsOptions {
    id: number;
}

export const useProduct = ({id}: GetProductsOptions) => {

    const productQuery = useQuery({
        queryKey: ['product', {id}],
        queryFn: () => productsActions.getProductById(id),
        staleTime: 1000 * 60 * 5 // 5 minutes
    });

    return { productQuery }
}