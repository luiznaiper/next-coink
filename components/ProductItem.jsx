/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';

const ProductItem = ({ product, addToCartHandler }) => {
  return (
    <div className="card">
      <Link href={`/producto/${product.slug}`}>
        <a>
          <img
            src={product.image}
            alt={product.name}
            className="rounded shadow object-cover h-64 w-full"
          />
        </a>
      </Link>
      <div className="flex flex-col items-center justify-center p-5">
        <Link href={`/producto/${product.slug}`}>
          <a>
            <h2 className="text-lg">{product.name}</h2>
          </a>
        </Link>
        <p className="mb-2">{product.subcategory}</p>
        <p>${product.price}</p>
        <button
          className="primary-button"
          type="button"
          onClick={() => addToCartHandler(product)}
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
