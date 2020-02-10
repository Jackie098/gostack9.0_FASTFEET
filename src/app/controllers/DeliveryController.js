import * as Yup from 'yup';

import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import Courier from '../models/Courier';
import Signature from '../models/Signature';
import File from '../models/File';

import OrderMail from '../jobs/OrderMail';

import Queue from '../../lib/Queue';

class DeliveryController {
  async index(req, res) {
    const { page } = req.query;

    const deliveries = await Delivery.findAll({
      attributes: ['id', 'product', 'canceled_at', 'start_date', 'end_date'],
      limit: 5,
      offset: (page - 1) * 5,
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'id',
            'name',
            'street',
            'number',
            'complement',
            'state',
            'city',
            'cep',
          ],
        },
        {
          model: Courier,
          as: 'courier',
          attributes: ['id', 'name', 'email'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
        {
          model: Signature,
          as: 'signature',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json(deliveries);
  }

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

  async update(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number().integer(),
      courier_id: Yup.number().integer(),
      product: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const delivery = await Delivery.findByPk(req.params.id);
    const { recipient_id: recipientId, courier_id: courierId } = req.body;

    if (recipientId && recipientId !== delivery.recipient_id) {
      const recipientExists = await Recipient.findByPk(recipientId);

      if (!recipientExists) {
        return res.status(400).json({ error: 'Recipient does not exists' });
      }
    }

    if (courierId && courierId !== delivery.courierId) {
      const courierExists = await Courier.findByPk(courierId);

      if (!courierExists) {
        return res.status(400).json({ error: 'Courier does not exists' });
      }
    }

    const newDelivery = await delivery.update(req.body);

    return res.json(newDelivery);
  }

  async delete(req, res) {
    const delivery = await Delivery.findByPk(req.params.id);

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery does not exists' });
    }

    await delivery.destroy();

    return res.json({ message: 'Successful operation, delivery deleted' });
  }
}

export default new DeliveryController();
