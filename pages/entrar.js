import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import signIn, { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Layout from '../components/Layout';
import { getError } from '../utils/error';

const LoginScreen = () => {
  const { data: session } = useSession();

  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/');
    }
  }, [router, session, redirect]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const submitHandler = async ({ email, password }) => {
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };
  return (
    <Layout title="Iniciar Sesión">
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h3 className="mb-4 text-xl">Iniciar Sesión</h3>
        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            {...register('email', {
              required: 'Por favor ingresa un email',
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i,
                message: 'Ingresa un email válido',
              },
            })}
            className="w-full"
            id="email"
            autoFocus
          ></input>
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            {...register('password', {
              required: 'Por favor ingresa tu contraseña',
              minLength: {
                value: 6,
                message: 'La contraseña debe ser mayor de 5 caracteres',
              },
            })}
            className="w-full"
            id="password"
            autoFocus
          ></input>
          {errors.password && (
            <div className="text-red-500">{errors.password.message} </div>
          )}
        </div>
        <div className="mb-4">
          <button className="primary-button">Entrar </button>
        </div>
        <div className="mb-4">
          ¿No tienes una cuenta? &nbsp;{' '}
          <Link href="registrarse">Registrarse</Link>
          <p>
            Pedimos una cuenta para evitar el fraude, prometemos no mandarte
            spam nunca 🙏🏻
          </p>
        </div>
      </form>
    </Layout>
  );
};

export default LoginScreen;
