import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../components/Layout';

const Unauthorized = () => {
  const router = useRouter();
  const { message } = router.query;
  return (
    <Layout title="Página de No Autorizado">
      <h3 className="text-xl">Acceso Denegado</h3>
      {message && <div className="mb-4 text-red-500">{message}</div>}
    </Layout>
  );
};

export default Unauthorized;
