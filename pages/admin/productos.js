import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useReducer } from 'react';
import Layout from '../../components/Layout';
import { getError } from '../../utils/error';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, products: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}

const AdminProductsScreen = () => {
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    loading: true,
    products: [],
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/admin/productos`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };

    fetchData();
  }, []);

  return (
    <Layout title="Administrador de Productos">
      <div className="grid md:grid-cols-4 md:gap-5">
        <div>
          <ul>
            <li>
              <Link href="/admin/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link href="/admin/ordenes">Órdenes </Link>
            </li>
            <li>
              <Link href="/admin/productos">
                <a className="font-bold">Productos</a>
              </Link>
            </li>
            <li>
              <Link href="/admin/usuarios">Usuarios</Link>
            </li>
          </ul>
        </div>
        <div className="overflow-x-auto md:col-span-3">
          <h4 className="mb-4 text-xl">Productos</h4>
          {loading ? (
            <div>Cargando...</div>
          ) : error ? (
            <div className="alert-error">{error}</div>
          ) : (
            <div className="overvlow-x-auto">
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th className="px-5 text-left">ID</th>
                    <th className="p-5 text-left">NOMBRE</th>
                    <th className="p-5 text-left">PRECIO</th>
                    <th className="p-5 text-left">CATEGORÍA</th>
                    <th className="p-5 text-left">CANTIDAD</th>
                    <th className="p-5 text-left">RATING</th>
                    <th className="p-5 text-left">ACCIONES</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id} className="border-b">
                      <td className=" p-5 ">{product._id.substring(20, 24)}</td>
                      <td className=" p-5 ">{product.name}</td>
                      <td className=" p-5 ">${product.price}</td>
                      <td className=" p-5 ">{product.category}</td>
                      <td className=" p-5 ">{product.countInStock}</td>
                      <td className=" p-5 ">{product.rating}</td>
                      <td className=" p-5 ">
                        <Link href={`/admin/producto/${product._id}`}>
                          Editar
                        </Link>
                        &nbsp;
                        <button>Eliminar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

AdminProductsScreen.auth = { adminOnly: true };
export default AdminProductsScreen;
