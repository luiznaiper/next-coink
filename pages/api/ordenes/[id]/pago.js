import { getSession } from 'next-auth/react';
import Order from '../../../../models/Order';
import db from '../../../../utils/db';

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send('Error, es necesario iniciar sesión');
  }
  await db.connect();
  const order = await Order.findById(req.query.id);
  if (order) {
    if (order.isPaid) {
      return res
        .status(400)
        .send({ message: 'Error, la orden ya está pagada' });
    }
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      email_address: req.body.email_address,
    };
    const paidOrder = await order.save();
    await db.disconnect();
    res.send({ message: 'Orden pagada satisfactoriamente', order: paidOrder });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'Error, orden no encontrada' });
  }
};

export default handler;
