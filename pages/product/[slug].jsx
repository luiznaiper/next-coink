import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../../components/Layout';
import data from '../../utils/data';
import { Store } from '../../utils/Store';

const ProductScreen = () => {
  const { state, dispatch } = useContext(Store);
  const { query } = useRouter();
  const { slug } = query;
  const product = data.products.find((product) => product.slug === slug);
  if (!product) {
    return <div>Producto no encontrado :(</div>;
  }
  const addToCartHandler = () => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    if (product.countInStock < quantity) {
      alert('No tenemos más de ese puerco por ahora XD');
      return;
    }

    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
  };
  return (
    <Layout title={product.name}>
      <div className="py-2">
        <Link href="/">Regresar a los productos</Link>
      </div>
      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2">
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            layout="responsive"
          ></Image>
        </div>
        <div>
          <ul>
            <li>
              <h4 className="text-lg">{product.name}</h4>
            </li>
            <li>Categoría: {product.category}</li>
            <li>Subcategoría: {product.subcategory}</li>
            <li>
              {product.rating} of {product.numReviews} Estrellitas
            </li>
            <li>Descripción: {product.description}</li>
          </ul>
        </div>
        <div>
          <div className="card p-5">
            <div className="mb-2 flex justify-between">
              <p>Precio:</p>
              <span>${product.price}</span>
            </div>
            <div className="mb-2 flex justify-between">
              <p>Estatus:</p>
              <span>
                {product.countInStock >= 0
                  ? 'Stock disponible'
                  : 'No disponible'}
              </span>
            </div>
            <button
              className="primary-button w-full"
              onClick={addToCartHandler}
            >
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductScreen;
