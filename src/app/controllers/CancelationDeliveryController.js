import Delivery from '../models/Delivery';

class CancelationDeliveryController {
  async update(req, res) {
    const id = req.params.delivery;

    const delivery = await Delivery.findByPk(id);

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery not found' });
    }

    await delivery.update({ canceled_at: new Date() });

    return res.json({ success: 'Delivery canceled successfully' });
  }
}

export default new CancelationDeliveryController();
