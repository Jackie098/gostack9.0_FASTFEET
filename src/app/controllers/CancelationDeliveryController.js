import Delivery from '../models/Delivery';
import Courier from '../models/Courier';

import CancelationMail from '../jobs/CancelationMail';

import Queue from '../../lib/Queue';

class CancelationDeliveryController {
  async update(req, res) {
    const id = req.params.delivery;

    const deliveryExists = await Delivery.findByPk(id);

    if (!deliveryExists) {
      return res.status(400).json({ error: 'Delivery not found' });
    }

    if (deliveryExists.end_date) {
      return res
        .status(400)
        .json({ error: 'Impossible to cancel a completed delivery' });
    }

    await deliveryExists.update({ canceled_at: new Date() });

    const delivery = await Delivery.findOne({
      where: { id },
      attributes: ['product', 'canceled_at'],
      include: {
        model: Courier,
        as: 'courier',
        attributes: ['name', 'email'],
      },
    });

    await Queue.add(CancelationMail.key, {
      delivery,
    });

    return res.json({ success: 'Delivery canceled successfully' });
  }
}

export default new CancelationDeliveryController();
