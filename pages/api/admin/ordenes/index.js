import { getSession } from 'next-auth/react';
import Order from '../../../../models/Order';
import db from '../../../../utils/db';

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session || (session && !session.user.isAdmin)) {
    return res.status(401).send('Inicio de sesión requerido');
  }
  if (req.method === 'GET') {
    await db.connect();
    const orders = await Order.find({}).populate('user', 'name');
    await db.disconnect();
    res.send(orders);
  } else {
    return res.status(400).send({ message: 'El método no es permitido' });
  }
};

export default handler;
