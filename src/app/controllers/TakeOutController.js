import { Op } from 'sequelize';
import {
  startOfDay,
  endOfDay,
  isBefore,
  isAfter,
  startOfHour,
  setHours,
} from 'date-fns';
import Delivery from '../models/Delivery';
import Courier from '../models/Courier';

/**
 * Class to manage the product that are being take out by the couriers
 */
class TakeOutController {
  async update(req, res) {
    const { id: courierId, delivery: deliveryId } = req.params;

    const courier = await Courier.findByPk(courierId);

    if (!courier) {
      return res.status(400).json({ error: 'Courier doest not exists' });
    }

    /**
     * Search for a delivery that is from the courier who is searching
     */
    const delivery = await Delivery.findOne({
      where: { courier_id: courierId, id: deliveryId, start_date: null },
    });

    if (!delivery) {
      return res.status(400).json({
        error: 'This delivery doest not belong to you or already take out',
      });
    }

    const today = new Date();

    const deliveriesToday = await Delivery.findAll({
      where: {
        start_date: {
          [Op.between]: [startOfDay(today), endOfDay(today)],
        },
      },
    });

    if (deliveriesToday.length > 4) {
      return res
        .status(400)
        .json({ error: 'You already took out all deliveries today' });
    }

    const startHour = startOfHour(setHours(today, 8));
    const endHour = startOfHour(setHours(today, 18));

    if (!(isAfter(startHour, today) && isBefore(endHour, today))) {
      return res
        .status(400)
        .json({ error: 'Hour out of range, do not possible take out order' });
    }

    await delivery.update({
      start_date: today,
    });

    return res.json(delivery);
  }
}

export default new TakeOutController();
