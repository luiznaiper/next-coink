import Link from 'next/link';
import Image from 'next/image';
import React, { useContext } from 'react';
import CheckoutWizard from '../components/CheckoutWizard';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';

const PlaceOrderScreen = () => {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { cartItems, shippingAddress, paymentMethod } = cart;
  return (
    <Layout title="Realizar pedido">
      <CheckoutWizard activeStep={3} />
      <h3 className="mb-4 text-xl">Realizar Pedido</h3>
      {cartItems.length === 0 ? (
        <div>
          El carrito está vacío. <Link href="/">Ve a comprar tu cerdo :3</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <div className="card p-5">
              <h4 className="mb-2 text-lg">Dirección de envío</h4>
              <div>
                {shippingAddress.fullName},{shippingAddress.country}, {'  '},
                {shippingAddress.city},{shippingAddress.address}, {'  '},
                {shippingAddress.postalCode},
              </div>
              <div>
                <Link href="/envio">Editar</Link>
              </div>
            </div>
            <div className="card p-5">
              <h4 className="mb-2 text-lg">Método de Pago</h4>
              <div>{paymentMethod}</div>
              <div>
                <Link href="/pago">Editar</Link>
              </div>
            </div>
            <div className="card overflow-x-auto p-5">
              <h4 className="mb-2 text-lg">Productos agregados</h4>
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th className="px-5 text-left">Producto</th>
                    <th className="px-5 text-right">Cantidad</th>
                    <th className="px-5 text-right">Precio</th>
                    <th className="px-5 text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item._id} className="border-b">
                      <td>
                        <Link href={`/product/${item.slug}`}>
                          <a className="flex items-center">
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={50}
                              height={50}
                            ></Image>
                            &nbsp;
                            {item.name}
                          </a>
                        </Link>
                      </td>
                      <td className=" p-5 text-right">{item.quantity}</td>
                      <td className="p-5 text-right">${item.price}</td>
                      <td className="p-5 text-right">
                        ${item.quantity * item.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div>
                <Link href="/carrito">Editar</Link>
              </div>
            </div>
          </div>
          <div>
            <div className="card p-5">
              <h4 className="mb-2 text-lg">Resumen de la orden</h4>
              <ul>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Productos</div>
                    <div>${itemsPrice}</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default PlaceOrderScreen;
