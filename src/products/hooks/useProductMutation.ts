import { useMutation, useQueryClient} from "@tanstack/react-query"
import { Product, productsActions } from "..";


export const useProductMutation = () => {

  const queryClient = useQueryClient();

      const productMutation = useMutation({
        mutationFn: productsActions.createProduct,

        onMutate: (product) => {
          // * Optimistic product
          const optimisticProduct = {...product, id: Math.random() };

          // * Almacenar el producto en el cache del query client
          queryClient.setQueryData<Product[]>(['products', {filterKey: product.category}], 
            (oldData) => {
              if(!oldData) return [optimisticProduct]

              return [...oldData, optimisticProduct]
            });

          return {optimisticProduct}
        },

        onSuccess: (product, variables, context) => {
          console.log({product, variables, context});

          // * Eliminar el fetch del producto optimista del log
          queryClient.removeQueries({ queryKey: ["product", context?.optimisticProduct.id] })
          
          // * actualizar cache sin tener que hacer nuevamente el fetch
          queryClient.setQueryData<Product[]>(['products', {'filterKey': product.category}], (oldData) => {
            if (oldData) {
              // * Eliminamos el producto optimista del cache y agregamos el producto insertado correctamente
              return oldData.map( cacheProduct => {
                return cacheProduct.id === context?.optimisticProduct.id ? product : cacheProduct
              })
            }

            queryClient.invalidateQueries({
              queryKey: ['products', {'filterKey': product.category}]
            });

          }); 
        },
        onError: (error, variables, context) => {
          console.log({error, variables, context});

          // * Eliminar el fetch del producto optimista del log
          queryClient.removeQueries({ queryKey: ["product", context?.optimisticProduct.id] })

          // * actualizar cache sin tener que hacer nuevamente el fetch
          queryClient.setQueryData<Product[]>(['products', {'filterKey': variables.category}], 
            (oldData) => {
              if (!oldData) return []

              // * Eliminamos el producto optimista del cache y agregamos el producto insertado correctamente
              return oldData.filter( cacheProduct => 
                ( cacheProduct.id !== context?.optimisticProduct.id))
              
              }
              
          ); 

          alert("asjkdakjs")
        }
      })

    return { productMutation }
}