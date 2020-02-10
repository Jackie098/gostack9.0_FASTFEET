import Delivery from '../models/Delivery';

class CourierCheckController {
  async index(req, res) {
    const { id } = req.params;

    const { page } = req.query;

    // courier's orders
    const deliveries = await Delivery.findAll({
      where: { courier_id: id, canceled_at: null, end_date: null },
      limit: 5,
      offset: (page - 1) * 5,
    });

    return res.json(deliveries);
  }
}

export default new CourierCheckController();
