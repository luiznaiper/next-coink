import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState, useEffect, useContext } from 'react';
import Cookies from 'js-cookie';
import CheckoutWizard from '../components/CheckoutWizard';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import { toast } from 'react-toastify';
import { getError } from '../utils/error';
import axios from 'axios';

const PlaceOrderScreen = () => {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { cartItems, shippingAddress, paymentMethod } = cart;
  const router = useRouter();

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

  const itemsPrice = round2(
    cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );

  const shippingPrice = itemsPrice > 1000 ? 0 : 200;

  const totalPrice = round2(itemsPrice + shippingPrice);

  useEffect(() => {
    if (!paymentMethod) {
      router.push('/pago');
    }
  }, [paymentMethod, router]);

  const [loading, setLoading] = useState(false);
  const placeOrderHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post('/api/ordenes', {
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        totalPrice,
      });
      setLoading(false);
      dispatch({ type: 'CART_CLEAR_ITEMS' });
      Cookies.set(
        'cart',
        JSON.stringify({
          ...cart,
          cartItems: [],
        })
      );

      router.push(`/orden/${data._id}`);
    } catch (err) {
      setLoading(false);
      toast.error(getError(err));
    }
  };

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
                {/* <li>
                  <div className="mb-2 flex justify-between">
                    <div>Impuesto</div>
                    <div>${taxPrice}</div> 
                  </div>
                </li> */}
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Envío</div>
                    <div>${shippingPrice}</div>
                  </div>
                </li>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Total</div>
                    <div>${totalPrice}</div>
                  </div>
                </li>
                <li>
                  <button
                    disabled={loading}
                    onClick={placeOrderHandler}
                    className="primary-button w-full"
                  >
                    {loading ? 'Cargando' : 'Hacer orden'}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

PlaceOrderScreen.auth = true;
export default PlaceOrderScreen;
