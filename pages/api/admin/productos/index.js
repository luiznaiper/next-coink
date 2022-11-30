import { getSession } from 'next-auth/react';
import Product from '../../../../models/Products';
import db from '../../../../utils/db';

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session || !session.user.isAdmin) {
    return res
      .status(401)
      .send('Es necesario Iniciar Sesión como administrador');
  }
  if (req.method === 'GET') {
    return getHandler(req, res);
  } else {
    return res.status(400).send({ message: 'Método no permitido' });
  }
};

const getHandler = async (req, res) => {
  await db.connect();
  const products = await Product.find({});
  await db.disconnect();
  res.send(products);
};
export default handler;
