import { Op } from 'sequelize';
import { startOfYear } from 'date-fns';
import Delivery from '../models/Delivery';

class DeliveryFinishedController {
  async index(req, res) {
    const { id } = req.params;
    const { page } = req.query;

    const newDate = new Date();

    const deliveriesFinished = await Delivery.findAll({
      where: {
        courier_id: id,
        end_date: {
          [Op.between]: [startOfYear(newDate), newDate],
        },
      },
      limit: 10,
      offset: (page - 1) * 10,
    });

    return res.json(deliveriesFinished);
  }
}

export default new DeliveryFinishedController();
