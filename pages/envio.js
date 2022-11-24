import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import CheckoutWizard from '../components/CheckoutWizard';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';

const ShippingScreen = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress } = cart;
  const router = useRouter();

  useEffect(() => {
    setValue('fullName', shippingAddress.fullName);
    setValue('country', shippingAddress.country);
    setValue('city', shippingAddress.city);
    setValue('postalCode', shippingAddress.postalCode);
    setValue('address', shippingAddress.address);
  }, [setValue, shippingAddress]);

  const submitHandler = ({ fullName, country, city, postalCode, address }) => {
    dispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: { fullName, country, city, postalCode, address },
    });
    Cookies.set(
      'cart',
      JSON.stringify({
        ...cart,
        shippingAddress: {
          fullName,
          country,
          city,
          postalCode,
          address,
        },
      })
    );
    router.push('/pago');
  };
  return (
    <Layout title="Dirección de Envío">
      <CheckoutWizard activeStep={1} />
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h3 className="mb-4 text-xl">Dirección de Envío</h3>
        <div className="mb-4">
          <label htmlFor="fullName">Nombre Completo</label>
          <input
            className="w-full"
            id="fullName"
            autoFocus
            {...register('fullName', {
              required: 'Por favor ingresa tu nombre completo',
            })}
          />
          {errors.fullName && (
            <div className="text-red-500">{errors.fullName.message} </div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="country">País</label>
          <input
            className="w-full"
            id="country"
            {...register('country', {
              required: 'Por favor ingresa tu país',
            })}
          />
          {errors.country && (
            <div className="text-red-500">{errors.country.message} </div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="city">Ciudad</label>
          <input
            className="w-full"
            id="city"
            {...register('city', {
              required: 'Por favor ingresa tu ciudad',
            })}
          />
          {errors.city && (
            <div className="text-red-500">{errors.city.message} </div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="postalCode">Código Postal</label>
          <input
            className="w-full"
            id="postalCode"
            {...register('postalCode', {
              required: 'Por favor ingresa tu código postal',
            })}
          />
          {errors.postalCode && (
            <div className="text-red-500">{errors.postalCode.message} </div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="address">Dirección</label>
          <input
            className="w-full"
            id="address"
            {...register('address', {
              required: 'Por favor ingresa tu dirección completa',
              minLength: {
                value: 3,
                message: 'La dirección tiene más de 2 caracteres :3',
              },
            })}
          />
          {errors.address && (
            <div className="text-red-500">{errors.address.message} </div>
          )}
        </div>
        <div className="mb-4 flex justify-between">
          <button className="primary-button">Siguiente</button>
        </div>
      </form>
    </Layout>
  );
};

export default ShippingScreen;

ShippingScreen.auth = true;
