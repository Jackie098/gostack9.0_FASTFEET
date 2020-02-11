import { Op } from 'sequelize';
import { startOfYear } from 'date-fns';
import Delivery from '../models/Delivery';
import Courier from '../models/Courier';
import Signature from '../models/Signature';

class DeliveryFinishedController {
  async index(req, res) {
    const { id } = req.params;
    const { page } = req.query;

    const today = new Date();

    const deliveriesFinished = await Delivery.findAll({
      where: {
        courier_id: id,
        end_date: {
          [Op.between]: [startOfYear(today), today],
        },
      },
      limit: 10,
      offset: (page - 1) * 10,
    });

    return res.json(deliveriesFinished);
  }

  async update(req, res) {
    const { id: courierId, delivery: deliveryId } = req.params;

    const courier = await Courier.findByPk(courierId);

    if (!courier) {
      return res.status(400).json({ error: 'Courier doest not exists' });
    }

    const delivery = await Delivery.findOne({
      where: {
        courier_id: courierId,
        id: deliveryId,
        start_date: {
          [Op.lt]: new Date(),
        },
        end_date: null,
      },
    });

    if (!delivery) {
      return res.status(400).json({
        error: 'This delivery doest not belong to you or already ended',
      });
    }

    const { signature_id: signatureId } = req.body;

    const signature = await Signature.findByPk(signatureId);

    if (!signature) {
      return res.status(400).json({ error: 'This signature doest not exists' });
    }

    const { id, end_date: endDate } = await delivery.update({
      end_date: new Date(),
      signature_id: signatureId,
    });

    return res.json({
      id,
      endDate,
      signatureId,
    });
  }
}

export default new DeliveryFinishedController();
