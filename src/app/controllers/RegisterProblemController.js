import * as Yup from 'yup';
import DeliveryProblem from '../models/DeliveryProblem';
import Delivery from '../models/Delivery';
import Courier from '../models/Courier';

/* Para o entregador setar problemas para uma determinada entrega */

class RegisterProblemController {
  async store(req, res) {
    const schema = Yup.object().shape({
      delivery_id: Yup.number()
        .integer()
        .required(),
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const courier = await Courier.findByPk(req.params.id);

    if (!courier) {
      return res.status(400).json({ error: 'Courier does not exists' });
    }

    const id = req.body.delivery_id;
    const delivery = await Delivery.findByPk(id);

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery does not exists' });
    }

    if (delivery.courier_id !== courier.id) {
      return res
        .status(400)
        .json({ error: 'This delivery does not belongs to you' });
    }

    const problem = await DeliveryProblem.create(req.body);

    return res.json(problem);
  }
}

export default new RegisterProblemController();
