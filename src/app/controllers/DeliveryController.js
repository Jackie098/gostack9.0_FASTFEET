import * as Yup from 'yup';

import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import Courier from '../models/Courier';
import Signature from '../models/Signature';

import OrderMail from '../jobs/OrderMail';

import Queue from '../../lib/Queue';

class DeliveryController {
  async store(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      courier_id: Yup.number().required(),
      product: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const recipient = await Recipient.findByPk(req.body.recipient_id);

    if (!recipient) {
      return res.status(400).json({ error: 'Recipient does not exists' });
    }

    const courier = await Courier.findByPk(req.body.courier_id);

    if (!courier) {
      return res.status(400).json({ error: 'Courier does not exists' });
    }

    const { id } = await Delivery.create(req.body);

    const delivery = await Delivery.findByPk(id, {
      attributes: ['id', 'product', 'created_at'],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['state', 'city', 'cep'],
        },
        {
          model: Courier,
          as: 'courier',
          attributes: ['name', 'email'],
        },
      ],
    });

    await Queue.add(OrderMail.key, {
      delivery,
    });

    return res.json(delivery);
  }
}

export default new DeliveryController();
