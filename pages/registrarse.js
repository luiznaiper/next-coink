import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Layout from '../components/Layout';
import { getError } from '../utils/error';
import axios from 'axios';

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
    getValues,
    formState: { errors },
  } = useForm();
  const submitHandler = async ({ name, email, password }) => {
    try {
      await axios.post('api/auth/registrarse', {
        name,
        email,
        password,
      });
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
    <Layout title="Registrarse">
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h3 className="mb-4 text-xl">Crear cuenta</h3>
        <span>Es por seguridad, no vamos a mandar spam jamás, NETA</span>
        <div className="mb-4">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            className="w-full"
            id="name"
            autoFocus
            {...register('name', {
              required: 'Por favor ingresa tu nombre',
            })}
          ></input>
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
        </div>
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
          ></input>
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password">Contraseña</label>
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
          <label htmlFor="confirmPassword">Confirmar Contraseña</label>
          <input
            className="w-full"
            type="password"
            id="confirmPassword"
            {...register('confirmPassword', {
              required: 'Por favor confirma tu contraseña',
              validate: (value) => value === getValues('password'),
              minLength: {
                value: 6,
                message: 'Confirmar la contraseña tiene más de 5 caracteres',
              },
            })}
          />
          {errors.confirmPassword && (
            <div className="text-red-500 ">
              {errors.confirmPassword.message}
            </div>
          )}
          {errors.confirmPassword &&
            errors.confirmPassword.type === 'validate' && (
              <div className="text-red-500 ">Las contraseñas no coinciden</div>
            )}
        </div>
        <div className="mb-4">
          <button className="primary-button">Registrarme </button>
        </div>
        <div className="mb-4">
          ¿No tienes una cuenta? &nbsp;{' '}
          <Link href={`/registrarse?/redirect=${redirect || '/'}`}>
            Registrarse
          </Link>
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
