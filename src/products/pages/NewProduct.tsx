import { Button, Image, Input, Textarea } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { useProductMutation } from "../hooks/useProductMutation";

interface FormInput {
  title:       string;
  price:       number;
  description: string;
  category:    string;
  image:       string;
}

export const NewProduct = () => {

  const { productMutation } = useProductMutation();

  const {register, handleSubmit} = useForm<FormInput>({
    defaultValues: {
      title: 'Teclado mecánico',
      price: 10,
      description: 'Teclado mecánico de alta calidad con retroiluminación RGB y teclas personalizables.',
      category: "men's clothing",
      image: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg'
    }
  });

  const onSubmit = (data: FormInput) => {
    productMutation.mutate(data);
  }

  return (
    <div className="w-full flex-col">
      <h1 className="text-2xl font-bold">Nuevo producto</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full">

        <div className="flex justify-around items-center">
          
          <div className="flex-col w-[500px]">

            <Input {...register('title')} className="mt-2" type="text" label="Titulo del producto" />
            <Input {...register('price')} className="mt-2" type="number" label="Precio del producto" />
            <Input {...register('image')} className="mt-2" type="url" label="Url imagen del producto" />
            <Textarea {...register('description')} className="mt-2" label="Descripcion del producto" />
            <select {...register('category')} className="rounded-md p-3 mt-2 bg-gray-800 w-full">
              <option value="men's clothing">Men's clothing</option>
              <option value="women's clothing">Women's clothing</option>
              <option value="jewelery">Jewelery</option>
              <option value="electronics">Electronics</option>
            </select>

            <br />
            <Button isDisabled={productMutation.isPending} type="submit" className="mt-2" color="primary">{productMutation.isPending ? 'cargando...' : 'crear'}</Button>
          </div>

          <div className="bg-white rounded-2xl p-10 flex items-center" style={{
            width: '500px',
            height: '600px',
          }}>

            <Image
              src="https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg"
            />
          </div>
          
        </div>


      </form>

    </div>
  )
}