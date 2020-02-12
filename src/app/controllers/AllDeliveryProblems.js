import Delivery from '../models/Delivery';
import DeliveryProblem from '../models/DeliveryProblem';
import Courier from '../models/Courier';

class AllDeliveryProblems {
  async index(req, res) {
    const deliveries = await DeliveryProblem.findAll({
      where: { delivery_id: req.params.id },
      include: [
        {
          model: Delivery,
          as: 'delivery',
          attributes: ['product'],
          include: [
            {
              model: Courier,
              as: 'courier',
              attributes: ['name', 'email'],
            },
          ],
        },
      ],
    });

    return res.json(deliveries);
  }
}

export default new AllDeliveryProblems();
