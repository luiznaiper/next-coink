import axios from 'axios';
import Link from 'next/link';
import React, { useReducer, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Legend,
  Tooltip,
} from 'chart.js';
import Layout from '../../components/Layout';
import { getError } from '../../utils/error';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
  },
};

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, summary: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}

const AdminDashBoardScreen = () => {
  const [{ loading, error, summary }, dispatch] = useReducer(reducer, {
    loading: true,
    summary: { salesData: [] },
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/admin/resumen`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchData();
  }, []);

  const data = {
    labels: summary.salesData.map((x) => x._id),
    datasets: [
      {
        label: 'Ventas',
        backgroundColor: 'rgba(162, 222, 208, 1',
        data: summary.salesData.map((x) => x.totalSales),
      },
    ],
  };

  return (
    <Layout title="Admin Dashboard">
      <div className="grid md:grid-cols-4 md:gap-5">
        <div>
          <ul>
            <li>
              <Link href="/admin/dashboard">
                <a className="font-bold">Dashboard</a>
              </Link>
            </li>
            <li>
              <Link href="/admin/ordenes">Órdenes</Link>
            </li>
            <li>
              <Link href="/admin/productos">Productos</Link>
            </li>
            <li>
              <Link href="/admin/usuarios">Usuarios</Link>
            </li>
          </ul>
        </div>
        <div className="md:col-span-3">
          <h4 className="mb-4 text-xl">Admin Dashboard</h4>
          {loading ? (
            <div>Cargando...</div>
          ) : error ? (
            <div className="alert-error">{error} </div>
          ) : (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-4">
                <div className="card m-5 p-5">
                  <p className="text-3xl">${summary.ordersPrice}</p>
                  <p>Ventas</p>
                  <Link href="/admin/ordenes">Ver ventas</Link>
                </div>
                <div className="card m-5 p-5">
                  <p className="text-3xl">{summary.ordersCount}</p>
                  <p>Órdenes</p>
                  <Link href="/admin/ordenes">Ver órdenes</Link>
                </div>
                <div className="card m-5 p-5">
                  <p className="text-3xl">{summary.productsCount}</p>
                  <p>Productos</p>
                  <Link href="/admin/ordenes">Ver productos</Link>
                </div>
                <div className="card m-5 p-5">
                  <p className="text-3xl">{summary.usersCount}</p>
                  <p>Usuarios</p>
                  <Link href="/admin/users">Ver usuarios</Link>
                </div>
              </div>
              <h3 className="text-xl">Reporte de Ventas</h3>
              <Bar
                options={{
                  legend: { display: true, position: 'right' },
                }}
                data={data}
              ></Bar>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

AdminDashBoardScreen.auth = { adminOnly: true };
export default AdminDashBoardScreen;
