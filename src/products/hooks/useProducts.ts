import { useQuery } from "@tanstack/react-query"
import { productsActions } from "..";

interface GetProductsOptions {
    filterKey?: string;
}

export const useProducts = ({filterKey}: GetProductsOptions) => {

    const productsQuery = useQuery({
        queryKey: ['products', {filterKey}],
        queryFn: () => productsActions.getProducts({ filterKey }),
        staleTime: 1000 * 60 * 5 // 5 minutes
    });

    

    return {productsQuery}
}