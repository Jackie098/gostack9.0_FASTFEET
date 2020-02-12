import Delivery from '../models/Delivery';
import DeliveryProblem from '../models/DeliveryProblem';
import Courier from '../models/Courier';

class DeliveriesProblemController {
  async index(req, res) {
    const { page } = req.query;

    const deliveriesProblem = await DeliveryProblem.findAll({
      attributes: ['id', 'description'],
      include: [
        {
          model: Delivery,
          as: 'delivery',
          attributes: ['id', 'product'],
          include: [
            {
              model: Courier,
              as: 'courier',
              attributes: ['id', 'name', 'email'],
            },
          ],
        },
      ],
      limit: 20,
      offset: (page - 1) * 20,
    });

    return res.json(deliveriesProblem);
  }
}

export default new DeliveriesProblemController();
